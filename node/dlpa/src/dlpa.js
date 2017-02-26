//
// dlpa.js
//
// Copyright (c) 2017 Junpei Kawamoto
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const grpc = require("grpc");
const path = require("path");
const readline = require("readline");
const spawn = require("child_process").spawn;

const dlpanode = grpc.load(
    path.join(__dirname, "dlpanode/dlpanode.proto")).dlpanode;

const MAG = 10 ** 5;

// flatten returns a list which flatten the given matrix.
function flatten(matrix) {
    const res = [];

    // If the given matrix is not a matrix but a scalar.
    if (!Array.isArray(matrix)) {
        matrix = [
            [matrix]
        ];
    }

    matrix.forEach((row) => {
        // If the given matrix is a vector.
        if (!Array.isArray(row)) {
            row = [row];
        }

        row.forEach((elem) => {
            res.push(elem.real);
            res.push(elem.imag);
        });
    });
    return res;
}


// matrix returns a matrix of which values are given ones.
function matrix(rows, columns, values) {
    // console.log(values);
    const res = [];
    let row = [];
    let real;
    values.forEach((v, i) => {
        if (i % 2 == 0) {
            real = v;
        } else {
            row.push({
                real: real,
                imag: v
            });
            if ((i + 1) / 2 % columns == 0) {
                res.push(row);
                row = [];
            }
        }
    });
    return res;
}



module.exports = (RED) => {

    //
    // DLPA Client Node.
    //
    function Client(config) {
        RED.nodes.createNode(this, config);

        const port = String(Math.floor(Math.random() * (40000 - 30000 + 1)) + 30000);

        // Start a DLPA-Node server.
        // Options:
        //   --listen LISTEN    Listening port.
        //   --host HOST        Address of the DLPA server to be connected.
        //   --port PORT        Port number of the DLPA server to be connected.
        //   --id CLIENT_ID     Client ID
        //   --epsilon EPSILON  Epsilon used in the Laplace distribution to add noises.
        const proc = spawn("python3", [
            "-m", "dlpanode.server",
            "--listen", port,
            "--host", config.host,
            "--port", config.port,
            "--id", config.client_id,
            "--epsilon", config.epsilon
        ], {
            "cwd": __dirname,
            stdio: ["pipe", process.stdout, "pipe"]
        });
        let exited = false;
        proc.on("exit", (code, signal) => {
            this.log(`DLPA-Node server is closed: ${signal}`);
            exited = true;
        })
        const logger = readline.createInterface({
            input: proc.stderr,
        });
        logger.on("line", (line) => {
            this.log(line)
        })

        const client = new dlpanode.DLPAClient(
            `localhost:${port}`, grpc.credentials.createInsecure());

        this.on("input", (msg) => {

            // Send a message to the server.
            client.encryptNoisySum({
                values: flatten(msg.payload).map(v => Math.round((v + MAG) * MAG))
            }, (err, response) => {
                if (err) {
                    this.error(err);
                }
            });

        });

        // Stop the server.
        this.on("close", (done) => {
            if (exited) {
                done();
                return;
            }

            // Wait the server is closed.
            proc.on("exit", () => {
                done();
            });

            // Send a signal.
            this.log("DLPA-Node server is closing");
            proc.stdin.close();
            proc.stdout.close();
            logger.close();
            proc.kill();

        });

    }

    RED.nodes.registerType("dlpa-client", Client);

    //
    // DLPA Server Node.
    //
    function Server(config) {
        RED.nodes.createNode(this, config);

        // Start a DLPA server.
        // Options:
        //   --port PORT           Listening port number.
        //   --clients CLIENTS     The number of clicents.
        //   --max-workers MAX_WORKERS
        //                         The maximum number of workiers (default: 10).
        const proc = spawn("python3", [
            "-m", "dlpa.server",
            "--port", config.port,
            "--clients", config.nclient,
            "--key-length", "128",
            "--span", config.span ? config.span || "300"
        ], {
            cwd: __dirname,
        });
        let exited = false;
        proc.on("exit", (code, signal) => {
            this.log(`DLPA server is closed: ${signal}`);
            exited = true;
        })
        const logger = readline.createInterface({
            input: proc.stderr
        });
        logger.on("line", (line) => {
            this.log(line);
        })

        // Wait results which should be outputted into stderr; and then
        // post a message based on each output.
        const rl = readline.createInterface({
            input: proc.stdout
        });
        rl.on("line", (line) => {
            const payload = JSON.parse(line);
            this.send({
                "topic": config.topic,
                "payload": matrix(
                    parseInt(config.rows, 10),
                    parseInt(config.columns, 10),
                    payload.value.map(v => (v / MAG) - MAG))
            });
        });

        // Stop the server.
        this.on("close", (done) => {
            if (exited) {
                done();
                return;
            }

            // Wait the server is closed.
            proc.on("exit", () => {
                done();
            });

            // Send a signal.
            this.log("DLPA server is closing");
            proc.stdin.close();
            rl.close();
            logger.close();
            proc.kill();

        });

    }

    RED.nodes.registerType("dlpa-server", Server);

}

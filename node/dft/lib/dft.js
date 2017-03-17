//
// dft.js
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
const execFileSync = require("child_process").execFileSync;
const path = require("path");

module.exports = (RED) => {

    function DFT(config) {
        RED.nodes.createNode(this, config);

        this.on("input", (msg) => {
            const data = JSON.stringify(msg.payload);
            const cmd = path.join(__dirname, "dft.py");

            const res = execFileSync(cmd, ["-k", config.k], {
                "input": data
            });

            msg.payload = JSON.parse(res)
            if (config.topic) {
                msg.topic = config.topic;
            }
            this.send(msg);

        });

    }

    RED.nodes.registerType("dft", DFT);

    function IDFT(config) {
        RED.nodes.createNode(this, config);

        this.on("input", (msg) => {
            const data = JSON.stringify(msg.payload);
            const cmd = path.join(__dirname, "idft.py");

            const res = execFileSync(cmd, ["--length", config.length], {
                "input": data
            });
            msg.payload = JSON.parse(res)
            if (config.topic) {
                msg.topic = config.topic;
            }
            this.send(msg);

        });

    }

    RED.nodes.registerType("idft", IDFT);

}

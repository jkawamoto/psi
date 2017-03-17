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
const {
    assert
} = require("chai");
const dft = require("../lib/dft");
const test_data = require("./test.json");

class Handler {
    on(_, cb) {
        this.callback = cb;
    }
    send(msg) {
        this.msg = msg;
    }
}

describe("Discrete Fourier Transformation node", function() {
    this.timeout(60 * 1000);

    // Mock of RED object.
    let RED;
    beforeEach(() => {
        // Create a new mock.
        RED = {
            nodes: {
                // Store a callback function a node registers.
                dft: new Handler(),
                idft: new Handler(),
                // Dummy function.
                createNode() {},
                // Run initializer to capture an event callback.
                registerType(name, initializer) {
                    if (name === "dft") {
                        initializer.call(this.dft, {
                            topic: "overwritten topic",
                            k: -1
                        });
                    } else {
                        initializer.call(this.idft, {
                            topic: "overwritten topic",
                            k: -1,
                            length: 3
                        });
                    }
                }
            },
            invoke_dft(msg) {
                this.nodes.dft.callback(msg);
                return this.nodes.dft.msg;
            },
            invoke_idft(msg) {
                this.nodes.idft.callback(msg);
                return this.nodes.idft.msg;
            }
        };
        dft(RED);
    });

    it("Overwrites topics in messages if given config has another one", () => {
        const dft_res = RED.invoke_dft({
            topic: "original topic",
            payload: test_data
        });
        assert.equal(dft_res.topic, "overwritten topic");

        const idft_res = RED.invoke_idft({
            topic: "original topic",
            payload: dft_res.payload
        });
        assert.equal(idft_res.topic, "overwritten topic");

    });

    it("Provides DFT and IDFT for given payload", () => {
        const dft_res = RED.invoke_dft({
            payload: test_data
        });
        const idft_res = RED.invoke_idft({
            payload: dft_res.payload
        });
        idft_res.payload.forEach((cur, i) => {
            cur.forEach((v, j) => {
                assert.approximately(v, test_data[i][j], 0.000001);
            });
        });
    });

});

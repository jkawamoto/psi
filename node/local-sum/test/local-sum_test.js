//
// local-sum_test.js
//
// Copyright (c) 2016-2017 Junpei Kawamoto
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
const localSum = require("../lib/local-sum");

describe("local-sum", function() {

    it("Returns a summation of a given numbers", () => {

        // Create a mock.
        const RED = {
            nodes: {
                // Store a callback function a node registers.
                handler: {
                    on(_event, callback) {
                        this.callback = callback;
                    },
                    send(msg) {
                        this.msg = msg;
                    }
                },
                // Dummy function.
                createNode() {},
                // Run initializer to capture an event callback.
                registerType(name, initializer) {
                    initializer.call(this.handler, {});
                }
            }
        };

        // Register the node.
        localSum(RED);

        const data = [1, 2, 3, 4, 5];
        RED.nodes.handler.callback({
            payload: data
        });

        assert.equal(
            RED.nodes.handler.msg.payload,
            data.reduce((prev, cur) => {
                return prev + cur;
            }),
            "Check the value the node sent.");
    });

});

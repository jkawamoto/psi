//
// fluentd-parser_test.js
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
const fluentdParser = require("../lib/fluentd-parser");

describe("Fluentd-parser node", function() {

    // Mock of RED object.
    let RED;
    beforeEach(() => {
        // Create a new mock.
        RED = {
            nodes: {
                // Store a callback function a node registers.
                handler: {
                    on(_event, callback) {
                        this.callback = callback;
                    },
                    send(msg) {
                        this.msg = msg;
                    },
                    warn(msg) {
                        this.warn = msg;
                    }
                },
                // Dummy function.
                createNode() {},
                // Run initializer to capture an event callback.
                registerType(name, initializer) {
                    initializer.call(this.handler, {});
                }
            },
            invoke(msg) {
                this.nodes.handler.callback(msg);
                return this.nodes.handler.msg;
            }
        };
        fluentdParser(RED);
    });

    it("Parses a container name and sets it to the topic", () => {
        const name = "some_container_name";
        const msg = {
            payload: {
                container_name: `/${name}`
            }
        };
        const res = RED.invoke(msg);
        assert.equal(res.topic, name);
    });

    it("Keeps topic if there is no container name given", () => {
        const topic = "test-topic";
        const res = RED.invoke({
            topic: topic,
            payload: {}
        });
        assert.equal(res.topic, topic);
    });

    it("Parses payload.log as a JSON object if can", () => {
        const log = {
            time: 123456,
            msg: "abcdefg"
        }
        const msg = {
            payload: {
                log: JSON.stringify(log)
            }
        }
        const res = RED.invoke(msg);
        assert.equal(res.payload.time, log.time);
        assert.equal(res.payload.msg, log.msg);
    });

    it("Overwrites payload with payload.log if cannot parse as a JSON object", () => {
        const msg = {
            payload: {
                log: "a string"
            }
        }
        const res = RED.invoke(msg);
        assert.equal(res.payload, "a string");
        assert.isString(RED.nodes.handler.warn);
    });

});

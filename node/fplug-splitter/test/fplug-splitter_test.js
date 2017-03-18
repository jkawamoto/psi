//
// fplug-log-splitter_test.js
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
const fplugSplitter = require("../lib/fplug-splitter");

describe("Fplug-splitter node", function() {

    it("Returns a message having four attributes", () => {

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

        const msg = {
            topic: "test-topic",
            payload: {
                time: 12345,
                illuminance: 10,
                temperature: 20,
                power: 30,
                humidity: 40
            }
        };
        fplugSplitter(RED);
        RED.nodes.handler.callback(msg);
        assert.equal(RED.nodes.handler.msg.length, 4);

        const illuminance = RED.nodes.handler.msg[0];
        assert.equal(illuminance.topic, `${msg.topic}-illuminance`);
        assert.equal(illuminance.payload.time, msg.payload.time);
        assert.equal(illuminance.payload.value, msg.payload.illuminance);

        const temperature = RED.nodes.handler.msg[1];
        assert.equal(temperature.topic, `${msg.topic}-temperature`);
        assert.equal(temperature.payload.time, msg.payload.time);
        assert.equal(temperature.payload.value, msg.payload.temperature);

        const power = RED.nodes.handler.msg[2];
        assert.equal(power.topic, `${msg.topic}-power`);
        assert.equal(power.payload.time, msg.payload.time);
        assert.equal(power.payload.value, msg.payload.power);

        const humidity = RED.nodes.handler.msg[3];
        assert.equal(humidity.topic, `${msg.topic}-humidity`);
        assert.equal(humidity.payload.time, msg.payload.time);
        assert.equal(humidity.payload.value, msg.payload.humidity);

    });

});

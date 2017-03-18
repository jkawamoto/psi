//
// fplug-log-splitter.js
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
function create_message(msg, attr) {
    return {
        topic: `${msg.topic}-${attr}`,
        payload: {
            time: msg.payload.time,
            value: msg.payload[attr]
        }
    };
}

module.exports = (RED) => {

    RED.nodes.registerType("fplug-splitter", function(config) {

        RED.nodes.createNode(this, config);
        this.on("input", (msg) => {
            this.send([
                create_message(msg, "illuminance"),
                create_message(msg, "temperature"),
                create_message(msg, "power"),
                create_message(msg, "humidity")
            ]);
        });

    });

};

//
// fluentd-parser.js
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
module.exports = (RED) => {

    RED.nodes.registerType("fluentd-parser", function(config) {

        RED.nodes.createNode(this, config);

        this.on("input", (msg) => {
            // Set topic from container name.
            if (msg.payload.container_name) {
                msg.topic = msg.payload.container_name.substring(1);
            }

            // Parse log property as a JSON object.
            let log;
            try {
                log = JSON.parse(msg.payload.log);
                for (key in log) {
                    if (log[key] === null) {
                        log[key] = 0;
                    }
                }
            } catch (e) {
                this.warn(e.message, msg);
                log = msg.payload.log;
            }
            msg.payload = log;
            this.send(msg);
        });

    });

}

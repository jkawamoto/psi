//
// guard.js
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

    // Check at least *k* topics has at least one message.
    //
    // Args:
    //   topics: Dictionary of which key is a topic and value is a list of
    //     messages.
    //   k: Condition parameter.
    //
    // Returns:
    //   true if at least *k* topics has at least one message.
    function is_ready(topics, k) {
        let count = 0;
        for (var t in topics) {
            if (topics[t].length > 0) {
                count += 1;
            }
        }
        return count >= k;
    };

    function Guard(config) {
        RED.nodes.createNode(this, config);

        this.on("input", (msg) => {
            const context = this.context();
            const topics = context.get("topics") || {};
            const new_topic = config.topic;
            const ntopic = parseInt(config.ntopic);

            if (!(msg.topic in topics)) {
                topics[msg.topic] = [];
            }
            topics[msg.topic].push(msg);

            if (is_ready(topics, ntopic)) {
                let time = 0;
                const res = [];
                const keys = []
                for (var k in topics) {
                    const m = topics[k].shift();
                    time = (m.time != null) && m.time > time ? m.time : time;
                    res.push(m.payload);
                    keys.push(k);
                }
                this.send({
                    topic: new_topic,
                    time: parseInt(time),
                    payload: res,
                    topics: keys
                });
            }

            context.set("topics", topics)
        });
    }

    RED.nodes.registerType("guard", Guard);

};

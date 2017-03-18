//
// rgen.js
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
const CronJob = require("cron").CronJob;

module.exports = (RED) => {

    function Rgen(config) {
        RED.nodes.createNode(this, config);
        const job = new CronJob({
            cronTime: "*/10 * * * * *",
            onTick: () => {
                const data = new Date();
                this.send({
                    "topic": config.topic,
                    "payload": Math.sin(data.getTime() + Math.random()) + parseFloat(config.shift),
                    "time": data.getTime()
                })
            },
            start: false
        });

        job.start();

        const context = this.context();
        context.set("job", job);

        this.on("close", (done) => {
            const job = context.get("job")
            if (job) {
                job.stop()
            }
            done();
        });

    }

    RED.nodes.registerType("rgen", Rgen);

}

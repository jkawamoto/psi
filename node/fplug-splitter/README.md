FPlug Log splitter
===================

A NodeRED node of splitting FPlug log made by [fplug-logger](https://github.com/jkawamoto/fplug-logger).

It assumes the payload of an input message consists of

```json
{
  "time": "UNIX time when the log received.",
  "illuminance": "Integer value of logged illuminance",
  "temperature": "Integer value of logged temperature",
  "power": "Integer value of logged power",
  "humidity": "Integer value of logged humidity"
}
```

It outputs four messages;

 1. illuminance
 2. temperature
 3. power
 4. humidity.

Each payload consists of

```json
{
  "time": "UNIX time when the log received.",
  "value": "Observed value",
}
```

and the topic of the message will be set as same as original topic with type postfix,
such as `-illuminance`, `-temperature`, `-power`, or `-humidity`.

Install
---------

Run the following command in the root directory of your Node-RED install.

```
$ npm install node-red-contrib-fplug-splitter
```

License
========
This software is released under the GNU General Public License version 3, see [LICENSE](LICENSE).

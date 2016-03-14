Fluentd parser
=================

[![npm version](https://badge.fury.io/js/node-red-contrib-fluentd-parser.svg)](https://badge.fury.io/js/node-red-contrib-fluentd-parser) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)

A Node-RED node to parse logs posted from [Fluentd](http://www.fluentd.org/).

A payload of a message posted from Fluentd consists of log property.
This node replaces payload property as the log property
so that other nodes easily access to the log data.

If the log property is a JSON string, this node decodes it to an object.

If the message is originally from a docker container,
the payload of the message has container_name property.
This node sets the container_name as the topic of the message.

Install
---------

Run the following command in the root directory of your Node-RED install.

```
$ npm install node-red-contrib-fluentd-parser
```

License
========
This software is released under the GNU General Public License version 3, see [LICENSE](LICENSE).

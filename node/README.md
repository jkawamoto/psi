Node-RED nodes for Psi project
================================

It contains the following Node-RED nodes;

* [fluentd-parser](./fluentd-parser/README.md): parsing messages from [Fluentd](http://www.fluentd.org/)
* [fplug-splitter](./fplug-splitter/README.md): splitting messages from [fplug-logger](https://github.com/jkawamoto/fplug-logger) into four messages so that each message has only one sensor value.
* [guard](./guard/README.md): waiting to send message until it receives messages from all topics.
* [local-sum](./local-sum/README.md): aggregating topics and computing summation of those values.

All nodes provided here are available in npm.
To install them, see each `README.md`.

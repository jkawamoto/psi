# Node-RED nodes for Psi project
This directory contains the following Node-RED nodes:

* [fluentd-parser](./fluentd-parser/README.md):
  parsing messages from [Fluentd](http://www.fluentd.org/),
* [fplug-splitter](./fplug-splitter/README.md):
  splitting messages from
  [fplug-logger](https://github.com/jkawamoto/fplug-logger) into four messages
  so that each message has only one sensor value,
* [guard](./guard/README.md): waiting to send message until it receives messages
  from all topics,
* [local-sum](./local-sum/README.md): aggregating topics and computing summation
  of those values,
* [rgen](./rgen/README.md): generating a random value every 10 second to test
  other nodes.

Most of the above nodes are available in [npm](https://www.npmjs.com/).
To install them, see each `README.md`.

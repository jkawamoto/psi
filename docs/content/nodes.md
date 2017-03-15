---
title: "Node-RED nodes"
menu: main
weight: 20
date: 2017-03-14
lastmod: 2017-03-14
description: Crawling comments from Youtube.
---
## Summary
This software includes seven Node-RED nodes; a Node-RED node provides some of functions such as receiving data from a data source, modifying data, and
sending data to other servers.

The following is a brief description of Node-RED nodes this software provides:

* [dft](https://github.com/jkawamoto/psi/blob/master/node/dft/README.md):
  providing top-k Discrete Fourier Transformation,
* [dlpa](https://github.com/jkawamoto/psi/blob/master/node/dlpa/README.md): providing Distributed Laplace Perturbation Algorithm
  (DLPA) which is one of the main algorithm of PASTE.
* [fluentd-parser](https://github.com/jkawamoto/psi/blob/master/node/fluentd-parser/README.md):
  parsing messages from [Fluentd](http://www.fluentd.org/),
* [fplug-splitter](https://github.com/jkawamoto/psi/blob/master/node/fplug-splitter/README.md):
  splitting messages from
  [fplug-logger](https://github.com/jkawamoto/fplug-logger) into four messages
  so that each message has only one sensor value,
* [guard](https://github.com/jkawamoto/psi/blob/master/node/guard/README.md):
  waiting to send message until it receives messages from all topics,
* [local-sum](https://github.com/jkawamoto/psi/blob/master/node/local-sum/README.md):
  aggregating topics and computing summation of those values,
* [rgen](https://github.com/jkawamoto/psi/blob/master/node/rgen/README.md):
  generating a random value every 10 second to test other nodes.

Most of the above nodes are available in [npm](https://www.npmjs.com/).
To install them, see each `README.md`.

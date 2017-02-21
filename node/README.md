# Node-RED nodes for PSI project
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)

This directory contains the following Node-RED nodes
for the Privacy-Preserving Stream Integration project:


* [dft](./dft/README.md): providing top-k Discrete Fourier Transformation,
* [dlpa](./dlpa/README.md): providing Distributed Laplace Perturbation Algorithm
  (DLPA) which is one of the main algorithm of PASTE.
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

##Node-RED
[<img src="http://nodered.org/brand/media/node-red-icon-2.png" width=100/>](https://nodered.org/)

Node-RED is a visual tool for wiring the Internet of Things.
Visit their [web site](https://nodered.org/) for more information.

## Publications
The DLPA has been introduced by
[Vibhor Rastogi](https://www.linkedin.com/in/vibhor-rastogi-6b680152)
and [Suman Nath](https://www.microsoft.com/en-us/research/people/sumann/)
in "[Differentially Private Aggregation of Distributed Time-Series with
Transformation and Encryption](http://dl.acm.org/citation.cfm?id=1807247),"
published in [SIGMOD 2010](http://www.sigmod2010.org/index.shtml).


## License
All packages in this directory are released under The GNU General Public License
Version 3, see [COPYING](https://github.com/jkawamoto/psi/blob/master/LICENSE)
for more detail.

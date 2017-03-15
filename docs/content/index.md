---
title: "Privacy-Preserving Stream Integration"
type: homepage
date: 2017-03-14
lastmod: 2017-03-14
description: Crawling comments from Youtube.
---
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)

This software is a set of Node-RED nodes which provides a privacy preserving
stream integration algorithm.

## Quick Start
### Build and Run by Node.js
Prepare [Node.js](https://nodejs.org/), [Python 3](https://www.python.org/), and
[pip](https://pip.pypa.io/en/stable/); then install dependencies and build:

```sh
# Install packages used to build.
$ npm install --only=dev

# Build related packages.
$ npm run build

# Install dependencies.
$ npm install --only=prod
```

after that, you can run Node-RED including privacy preserving algorithms:

```sh
$ npm start
```

Open http://127.0.0.1:1880/ with your web browser to access Node-RED's flow
editor.

### Run in a docker container
A [Docker](https://www.docker.com/) image, `jkawamoto/psi-node-red`, is
published in [Docker Hub](https://hub.docker.com/), to run Node-RED in a
container.

To start a Node-RED service listening port 1880, run

```sh
$ docker run -d --name node-red -p 1880:1880 jkawamoto/psi-node-red
```

After Node-RED starts, open http://127.0.0.1:1880/ with your web browser to
access Node-RED's flow editor.

You can also build the image, `jkawamoto/psi-node-red`, by your self:

```sh
$ docker build -t psi-node-red -f dockerfile/node-red/Dockerfile .
```

## Publications
The algorithm this software provides is based on two papers:

* [Vibhor Rastogi](https://www.linkedin.com/in/vibhor-rastogi-6b680152)
and [Suman Nath](https://www.microsoft.com/en-us/research/people/sumann/)
in "[Differentially Private Aggregation of Distributed Time-Series with
Transformation and Encryption](http://dl.acm.org/citation.cfm?id=1807247),"
published in [SIGMOD 2010](http://www.sigmod2010.org/index.shtml),
* [Junpei Kawamoto](https://www.jkawamoto.info), "[An Implementation of Privacy Preserving Stream Integration System](http://ieeexplore.ieee.org/document/7427088/)," published in [ICOIN 2016](http://2016.icoin.org/main/).

Please consider to site those papers if you will publish articles using this
application.

## License
This software is released under the GNU General Public License version 3,
see [LICENSE](https://github.com/jkawamoto/psi/blob/master/LICENSE).

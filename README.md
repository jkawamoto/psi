# &#x03C8;: Privacy-Preserving Stream Integration
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)

This project implements a privacy-preserving stream integration algorithm on [Node-RED](http://nodered.org/).

## Quick Run
Prepare [Node.js](https://nodejs.org/), [Python 3](https://www.python.org/), and
[pip](https://pip.pypa.io/en/stable/); then install dependencies:

```
# Install packages used to build.
$ npm install --only=dev

# Build related packages.
$ npm run build

# Install dependencies.
$ npm install --only=prod
```

after that, you can run Node-RED including privacy preserving algorithms:

```
$ npm start
```

## Directories
  * [compose](./compose/README.md): configurations for docker-compose
  * [dockerfile](./dockerfile/README.md): dockerfiles for Node-RED images.
  * [node](./node/README.md): Node-RED nodes.


## Submodules
  * [AmbassadorS](https://github.com/jkawamoto/ambassadors)


## Docker Images for Raspberry Pi
  * [Node-RED](https://hub.docker.com/r/jkawamoto/rpi-node-red/)
  * [AmbassadorS](https://hub.docker.com/r/jkawamoto/rpi-ambassadors/)

## License
This software is released under the GNU General Public License version 3,
see [LICENSE](LICENSE).

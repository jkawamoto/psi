# &#x03C8;: Privacy-Preserving Stream Integration
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)
[![CircleCI](https://circleci.com/gh/jkawamoto/psi/tree/master.svg?style=svg)](https://circleci.com/gh/jkawamoto/psi/tree/master)
[![Dockerhub](https://img.shields.io/badge/dockerhub-jkawamoto%2Fpsi--node--red-blue.svg)](https://hub.docker.com/r/jkawamoto/psi-node-red/)
[![MicroBadger](https://images.microbadger.com/badges/image/jkawamoto/psi-node-red.svg)](https://microbadger.com/images/jkawamoto/psi-node-red)

This project implements a privacy-preserving stream integration algorithm on [Node-RED](http://nodered.org/).

## Quick Run
Prepare [Node.js](https://nodejs.org/), [Python 3](https://www.python.org/), and
[pip](https://pip.pypa.io/en/stable/); then install dependencies:

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

and then access http://127.0.0.1:1880/ from your web browser.

## Run in a docker container
This project also supports [Docker](https://www.docker.com/) to run Node-RED
application in a container.
You can pull a docker images, `jkawamoto/psi-node-red`, from
[Docker Hub](https://hub.docker.com/).

To start a Node-RED service listening port 1880, run

```sh
$ docker run -d --name node-red -p 1880:1880 jkawamoto/psi-node-red
```

You can also build the image, `jkawamoto/psi-node-red`, by your self:

```sh
$ docker build -t psi-node-red -f dockerfile/node-red/Dockerfile .
```

## Directories
  * [compose](./compose/README.md): configurations for docker-compose
  * [dockerfile](./dockerfile/README.md): dockerfiles for Node-RED images.
  * [node](./node/README.md): Node-RED nodes.

## License
This software is released under the GNU General Public License version 3,
see [LICENSE](LICENSE).

---
title: "Privacy-Preserving Stream Integration"
type: homepage
menu:
  main:
    Name: Top
weight: 1
date: 2017-03-14
lastmod: 2017-03-14
description: >-
  This software is a set of Node-RED nodes which provides a privacy preserving
  stream integration algorithm.
---
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)
[![CircleCI](https://circleci.com/gh/jkawamoto/psi/tree/master.svg?style=svg)](https://circleci.com/gh/jkawamoto/psi/tree/master)
[![wercker status](https://app.wercker.com/status/962f3c76a5c374e4195650731a3e52d1/s/master "wercker status")](https://app.wercker.com/project/byKey/962f3c76a5c374e4195650731a3e52d1)
[![Release](https://img.shields.io/badge/release-0.6.0-brightgreen.svg)](https://github.com/jkawamoto/psi/releases/tag/v0.6.0)

## Introduction
This software is a set of Node-RED nodes which provides a privacy preserving
stream integration algorithm.
There are several sensors in several places and you want to integrate data from
such sensors in a cloud server; but you, at the same time, need to consider
privacy of those sensor data.

For example, you put sensors in each room of customers' houses and want to get
power usage of each room in order to analyze usage patterns and provide a
useful service such as consulting to reduce electric bill.
However, collecting power usage can reveal customers' private life style;
you thereby have to treat that information privately.

This software provides a solution for that situation.
It assumes two integration steps: at first integrating sensor data in a trusted
network before sending to a cloud server, then integrating sensor data in the
cloud server.

The following figure shows an example of this situation: there are two trusted
networks, each of them has seven sensors and one integrator, and a cloud server
receives data from those two integrators.

<img src="img/usecase.png"/>

In this software, those integrators and the cloud server run a Node-RED server.
In each integrator, the Node-RED server has nodes receiving data from sensors,
applying privacy protection to those data, and sending them to the cloud server.
In the cloud server, the Node-RED server has nodes receiving data from
integrators and merging data.

See [Node-RED nodes](./nodes/) page for information about each node.


## About Node-RED
Node-RED is a visual tool for wiring the Internet of Things.
You can design data flow using its graphical flow editor, and deploy your
application handling data from several sources.

<img src="img/flow-editor.png"/>

Visit its [web site](https://nodered.org/) to know usage of the flow editor
and the way to deploy your application on Node-RED.

## Quick Start
There are two ways to start a Node-RED server which includes Node-RED nodes
provided by this software: compiling source code on your computer and run,
and using a docker container.

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

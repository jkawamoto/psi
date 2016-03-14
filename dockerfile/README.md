Dockerfiles
==============

Dockerfiles of customized Node-RED which contain necessary packages.

Build Images
--------------

```
$ docker build -t jkawamoto/node-red node-red
```

For Raspberry Pi, use `rpi-node-red/Dockerfile` to create a customized Node-Red.

```
$ docker build -t jkawamoto/rpi-node-red2 pi-node-red
```

The image `jkawamoto/rpi-node-red` is a basic Node-RED image for Raspberry Pi and it is available in [DockerHub](https://hub.docker.com/r/jkawamoto/rpi-node-red/). 


Run
----
This Node-RED requires to link a container running MongoDB and it's name must be `mongo`.
```sh
$ docker run -d --name node-red -p 1880:1880 --link mongo:mongo jkawamoto/node-red
```

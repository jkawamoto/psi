Dockerfiles
==============

Dockerfiles of customized Node-RED which contain necessary packages.

Build Images
--------------

```
$ docker build -t jkawamoto/node-red node-red
```

For Raspberry Pi, use `rpi-node-red/Dockerfile` to create a basic Node-RED for Raspberry Pi and `rpi-node-red/Dockerfile.ctm` to create a customized Node-Red.

```
$ docker build -t jkawamoto/rpi-node-red rpi-node-red
$ docker build -t jkawamoto/rpi-node-red2 -f rpi-node-red/Dockerfile.ctm rpi-node-red
```

The image jkawamoto/rpi/node-red is a basic Node-RED image for Raspberry Pi. It is also available in DockerHub. So, you can just pull it by `docker pull jkawamoto/rpi-node-red` and skip the first line.


Run
----
This Node-RED requires to link a container running MongoDB and it's name must be `mongo`.
```sh
$ docker run -d --name node-red -p 1880:1880 --link mongo:mongo jkawamoto/node-red
```

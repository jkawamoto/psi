# Dockerfiles for PSI Node-RED service
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)
[![Dockerhub](https://img.shields.io/badge/dockerhub-jkawamoto%2Fpsi--node--red-blue.svg)](https://hub.docker.com/r/jkawamoto/psi-node-red/)
[![MicroBadger](https://images.microbadger.com/badges/image/jkawamoto/psi-node-red.svg)](https://microbadger.com/images/jkawamoto/psi-node-red)

Dockerfiles of a customized Node-RED service which contains nodes provided by
this project.


## Pull Image
Build image, `jkawamoto/psi-node-red`, is provided in
[Docker Hub](https://hub.docker.com/), and you can pull it;

```
$ docker pull jkawamoto/psi-node-red
```


## Build Image
To build a docker image, `psi-node-red`, run the following command from top of
this repository (not from this directory):
```
$ docker build -t jkawamoto/psi-node-red -f dockerfile/node-red/Dockerfile .
```


## Run
This Node-RED image exposes port 1880 so that you can access it via web
browsers.
It also stores data in `/data` and you can mount any directory to keep those
data outside of containers.

The following command attaches port 1880 of the local computer to the
container's port 1880, and mounts `./data` to the container's `/data`:

```
$ docker run -d --name node-red -p 1880:1880 -v $(pwd)/data:/data psi-node-red
```

## License
This software is released under The GNU General Public License Version 3,
see [COPYING](https://github.com/jkawamoto/psi/blob/master/LICENSE)
for more detail.

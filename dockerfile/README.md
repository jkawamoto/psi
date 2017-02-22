# Dockerfiles for PSI Node-RED service
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)

Dockerfiles of a customized Node-RED service which contains nodes provided by
this project.

## Build Image
To build a docker image, `psi-node-red`, run the following command from top of
this repository (not from this directory):
```
$ docker build -t psi-node-red -f dockerfile/node-red/Dockerfile .
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

# Docker compose
[![GPLv3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/copyleft/gpl.html)

Configuration files for Docker compose. There are two components, local and integrator.

  - `local` is for local integrators.
  - `integrator` is for remote integrators.

The idea of local/remote integrators are introduced in the following paper:
[Junpei Kawamoto](https://www.jkawamoto.info/),
“[An Implementation of Privacy Preserving Stream Integration System](http://ieeexplore.ieee.org/document/7427088/)”,
In Proc. of [the 30th International Conference on Information Networking (ICOIN 2016)](http://2016.icoin.org/main/),
pp.57-62, Malaysia, Jan. 13-15, 2016.

## Local integrator
Local integrators are expected to run on Raspberry Pi. To run local integrators, a docker image `jkawamoto/rpi-node-red2` is required. To build the image, see [dockerfile](../dockerfile/README.md) for more information.

The local integrators will connect a remote integrator using [AmbassadorS](https://hub.docker.com/r/jkawamoto/rpi-ambassadors/). You need to edit its configuration; `ambassadors.env`. In ambassadors.env, there are two variables; `HOST` and `PORT` which are the host name and port number of the remote integrator.

To run a local integrator:
```
$ docker-compose -f local/docker-compose.yml -p local_integrator up
```

## Integrator
Integrators require a docker image `jkawamoto/node-red`. To build is, see [dockerfile](../dockerfile/README.md) for more information. You need public key information so that local integrators can connect the integrator via ssh. You need to list up public keys in `authorized_keys` and its format is as same as authorized_keys in sshd.

To run an integrator:
```
$ docker-compose -f integrator/docker-compose.yml -p integrator up
```

## License
This software is released under The GNU General Public License Version 3,
see [COPYING](https://github.com/jkawamoto/psi/blob/master/LICENSE)
for more detail.

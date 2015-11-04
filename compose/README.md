Docker compose
================
Configuration files for Docker compose. There are two components; local and integrator.

  - `local` is for local integrators.
  - `integrator` is for remote integrators.

Local integrator
-----------------  
Local integrators are expected to run on Raspberry Pi. To run local integrators, a docker image `jkawamoto/rpi-node-red2` is required. To build the image, see [dockerfile](../dockerfile/README.md) for more information.

The local integrators will connect a remote integrator using [AmbassadorS](https://hub.docker.com/r/jkawamoto/rpi-ambassadors/). You need to edit its configuration; `ambassadors.env`. In ambassadors.env, there are two variables; `HOST` and `PORT` which are the host name and port number of the remote integrator.

To run a local integrator:
```
$ docker-compose -f local/docker-compose.yml -p local_integrator up
```

Integrator
------------
Integrators require a docker image `jkawamoto/node-red`. To build is, see [dockerfile](../dockerfile/README.md) for more information. You need public key information so that local integrators can connect the integrator via ssh. You need to list up public keys in `authorized_keys` and its format is as same as authorized_keys in sshd.

To run an integrator:
```
$ docker-compose -f integrator/docker-compose.yml -p integrator up
```

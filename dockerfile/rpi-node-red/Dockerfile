#
# Dockerfile
#
# Copyright (c) 2015 Junpei Kawamoto
#
# This software is released under the MIT License.
#
# http://opensource.org/licenses/mit-license.php
#
#----------------------------------------------------------
# to run node-red as a container on Raspberry Pi.
#
FROM resin/rpi-raspbian:wheezy-2015-10-07
MAINTAINER Junpei Kawamoto <kawamoto.junpei@gmail.com>

# Install node.js.
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash - && \
    apt-get install -y build-essential python-dev nodejs && \
    apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/

# Install node-ref
RUN npm install -g --unsafe-perm node-red

# Expose port
EXPOSE 1880

# Startup configuration.
CMD ["node-red-pi", "--max-old-space-size=128"]

#
# Dockerfile.ctm
#
# Copyright (c) 2015-2016 Junpei Kawamoto
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
FROM jkawamoto/rpi-node-red
MAINTAINER Junpei Kawamoto <kawamoto.junpei@gmail.com>

# Install python package.
RUN apt-get update && apt-get install -y python-numpy && \
    apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/

# Install node packages
RUN npm install -g node-red-contrib-batcher node-red-contrib-fluentd-parser \
                   node-red-contrib-fplug-splitter

# Change the working directory.
WORKDIR /root

# Add scripts.
ADD python .

# Expose port
EXPOSE 1880

ADD local-sum/lib /usr/lib/node_modules/node-red/nodes

# Startup configuration.
CMD ["node-red-pi", "--max-old-space-size=128"]

#
# Dockerfile
#
# Copyright (c) 2015 Junpei Kawamoto
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

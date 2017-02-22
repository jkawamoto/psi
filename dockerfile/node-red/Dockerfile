#
# Dockerfile
#
# Copyright (c) 2015-2017 Junpei Kawamoto
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
FROM node:wheezy
MAINTAINER Junpei Kawamoto <kawamoto.junpei@gmail.com>

ENV TERM vt100
ENV DEBIAN_FRONTEND noninteractive
ENV PORT 1880
ENV PYTHON_VERSION 3.5.2

WORKDIR /root

ARG APT_PROXY
RUN if [ -n "$APT_PROXY" ]; then \
      echo "Set apt proxy: $APT_PROXY"; \
      echo "Acquire::http { Proxy \"$APT_PROXY\"; };" >> /etc/apt/apt.conf.d/01proxy; \
    fi

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
RUN PATH="/root/.pyenv/bin:$PATH" && \
    eval "$(pyenv init -)" && \
    eval "$(pyenv virtualenv-init -)" && \
    pyenv install -s -v $PYTHON_VERSION && \
    pyenv local $PYTHON_VERSION && \
    pip install --upgrade pip

COPY . .
RUN PATH="/root/.pyenv/bin:$PATH" && \
    eval "$(pyenv init -)" && \
    eval "$(pyenv virtualenv-init -)" && \
    npm install --only=dev && npm run build && npm install --only=prod

ENTRYPOINT ["./dockerfile/node-red/entrypoint.sh"]

#!/usr/bin/env python
#
# server.py
#
# Copyright (c) 2017 Junpei Kawamoto
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
#
"""Run dlpa server and dlpanode server.
"""
import argparse
import logging
import random
import sys
import time

from dlpa import server as dlpa_server
from dlpanode import server as dlpanode_server

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


def main():
    """The main function.
    """
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--port", default=30051, type=int,
        help="Listening port (default: 30051).")

    args = parser.parse_args()

    port = random.randint(40000, 50000)
    s = dlpa_server(port=port, nclient=1)
    s2 = dlpanode_server(
        listen=args.port, host="localhost", port=port, client_id=0, epsilon=0)
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        s.stop(0)
        s2.stop(0)


if __name__ == "__main__":
    main()

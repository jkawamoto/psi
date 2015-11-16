#! /usr/bin/env python
#
# dft.py
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
import argparse
import json
import numpy as np
import sys
import urllib
from numpy import fft

ILL = "illuminance"
TEMP = "temperature"
POW = "power"
HUM = "humidity"


def vec(item):
    """ Vec-function.

    Construct a vector from an item object.

    Args:
      item: An event item.

    Returns:
      a feature vector of sensor data.
    """
    return np.array([item[ILL], item[TEMP], item[POW], item[HUM]])


def enc(v):
    res = {}
    for i, e in enumerate(v):
        res["_{0}".format(i)] = dict(real=float(np.real(e)), imag=float(np.imag(e)))
    return res


# TODO: Maybe outputting times is needed.
def dft(input, output, k, args):
    # Read inputs.
    if args:
        data = json.loads(urllib.unquote(args))
    else:
        data = json.load(input)

    # Make vectors.
    m = np.array([vec(elem) for elem in data])

    # Transform
    fm = fft.rfftn(m)

    # Output
    json.dump([enc(v) for v in fm[:k]], output)
    output.write("\n")


def main():
    """ The main function.
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default=sys.stdin, type=argparse.FileType("r"))
    parser.add_argument("--output", default=sys.stdout, type=argparse.FileType("w"))
    parser.add_argument("--k", default=20, type=int)
    parser.add_argument("args", nargs="?")

    dft(**vars(parser.parse_args()))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(1)

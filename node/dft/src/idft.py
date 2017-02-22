#! /usr/bin/env python3
#
# idft.py
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
"""Inverse Discrete Fourier Transformation with padding to a given length.
"""
from __future__ import print_function
import argparse
import json
import numpy as np
import sys
from numpy import fft


def decode(v):
    """Decode a row vector consisting of complex values.
    """
    return [e["real"] + e["imag"] * 1j for e in v]


def idft(infile, output, length):
    """Apply IDFT a given matrix encoded in JSON and write results in also JSON.

    Args:
      infile: Readable object consisting of the target matrix.
      output: Writable object to output the result of IDFT.
      length: Parameter.
    """
    # Read inputs.
    data = json.load(infile)

    # Make a matrix.
    raw = [decode(v) for v in data]
    if length < 0:
        length = len(raw)
    fm = np.array(
        raw + [[0 for _ in range(len(raw[0]))] for _ in range(length - len(raw))])

    # Transform
    m = fft.irfftn(fm)

    # Output
    json.dump([v.tolist() for v in m], output)
    output.write("\n")


def main():
    """The main function.
    """
    parser = argparse.ArgumentParser(
        description="Discrete Fourier Transformation and Take first-k dimentions.")
    parser.add_argument(
        "--input", default=sys.stdin, type=argparse.FileType("r"), dest="infile",
        help="Input file. (default: stdin)")
    parser.add_argument(
        "--output", default=sys.stdout, type=argparse.FileType("w"),
        help="Output file. (default: stdout)")
    parser.add_argument(
        "--length", default=-1, type=int,
        help="Size of dimentions to be outputted.")

    try:
        idft(**vars(parser.parse_args()))
    except KeyboardInterrupt:
        sys.exit(1)


if __name__ == "__main__":
    main()

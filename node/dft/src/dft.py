#! /usr/bin/env python
#
# dft.py
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
"""Discrete Fourier Transformation and take first-k dimentions.
"""
from __future__ import print_function
import argparse
import json
import numpy as np
import sys
from numpy import fft


def enc(v):
    """Encode a row vector consisting of complex values.
    """
    return [{"real": float(np.real(e)), "imag": float(np.imag(e))} for e in v]


def dft(infile, output, k):
    """Apply DFT a given matrix encoded in JSON and write results in also JSON.

    Args:
      infile: Readable object consisting of the target matrix.
      output: Writable object to output the result of DFT.
      k: Parameter.
    """
    # Read inputs.
    data = json.load(infile)

    # Make vectors.
    m = np.array(data)

    # Transform
    fm = fft.rfftn(m)

    # Output
    if k == -1:
        k = len(fm)
    json.dump([enc(v) for v in fm[:k]], output)
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
        "-k", default=-1, type=int,
        help="Size of dimentions to be taken. If set -1, use full size matrix.")

    try:
        dft(**vars(parser.parse_args()))
    except KeyboardInterrupt:
        sys.exit(1)


if __name__ == "__main__":
    main()

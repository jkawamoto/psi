#
# dft_test.py
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
"""Unit test for dft module.
"""
# pylint: disable=import-error,invalid-name
import json
from io import StringIO
from os import path
import sys
import unittest

sys.path.append("./lib/")
import dft  # pylint: disable=wrong-import-position


class TestEnc(unittest.TestCase):
    """Test case for enc function.
    """

    def test(self):
        """Test with an imaginary number.
        """
        data = [1 + 1j, 2 + 2j, 123, 313j]
        res = dft.enc(data)
        for d, r in zip(data, res):
            self.assertEqual(r["real"], d.real)
            self.assertEqual(r["imag"], d.imag)


class TestDFT(unittest.TestCase):
    """Test case for dft function.
    """

    def test(self):
        """Test with `test.json`.
        """
        k = 2
        buf = StringIO()
        with open(path.join(path.dirname(__file__), "test.json")) as fp:
            dft.dft(fp, buf, k)

        res = json.loads(buf.getvalue())
        self.assertEqual(len(res), k)

        max_col = max([len(row) for row in res])
        min_col = min([len(row) for row in res])
        self.assertEqual(max_col, min_col)
        self.assertEqual(max_col, 2)

    def test_without_k(self):
        """Test with `test.json` and without taking top k.
        """
        buf = StringIO()
        with open(path.join(path.dirname(__file__), "test.json")) as fp:
            dft.dft(fp, buf, -1)

        res = json.loads(buf.getvalue())
        self.assertEqual(len(res), 3)

        max_col = max([len(row) for row in res])
        min_col = min([len(row) for row in res])
        self.assertEqual(max_col, min_col)
        self.assertEqual(max_col, 2)


if __name__ == "__main__":
    unittest.main()

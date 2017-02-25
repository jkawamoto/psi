#
# idft_test.py
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
"""Unit test for idft module.
"""
# pylint: disable=import-error
import json
from StringIO import StringIO
from os import path
import sys
import unittest

sys.path.append("./src/")
import dft
import idft


class TestDecode(unittest.TestCase):
    """Test case for decode function.
    """

    def test(self):
        """Test encodeing and decoding some imaginary numbers.
        """
        data = [1 + 1j, 2 + 2j, 123, 313j]
        res = idft.decode(dft.enc(data))
        for d, r in zip(data, res):
            self.assertEqual(d, r)


class TestIDFT(unittest.TestCase):
    """Test case for idft function.
    """

    def test(self):
        """Test with `test.json`.
        """
        buf = StringIO()
        with open(path.join(path.dirname(__file__), "test.json")) as fp:
            dft.dft(fp, buf, -1)
            fp.seek(0)
            data = json.load(fp)
        buf.seek(0)

        res = StringIO()
        idft.idft(buf, res, -1)

        for row1, row2 in zip(json.loads(res.getvalue()), data):
            for col1, col2 in zip(row1, row2):
                self.assertAlmostEqual(col1, col2)

    def test_with_k(self):
        """Test with `test.json` with k.
        """
        buf = StringIO()
        with open(path.join(path.dirname(__file__), "test.json")) as fp:
            dft.dft(fp, buf, 2)
        buf.seek(0)

        buf2 = StringIO()
        idft.idft(buf, buf2, 3)

        res = json.loads(buf2.getvalue())
        self.assertEqual(len(res), 3)

        max_col = max([len(row) for row in res])
        min_col = min([len(row) for row in res])
        self.assertEqual(max_col, min_col)
        self.assertEqual(max_col, 2)


if __name__ == "__main__":
    unittest.main()

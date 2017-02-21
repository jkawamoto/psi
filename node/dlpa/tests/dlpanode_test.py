#
# dlpanode_test.py
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
"""Unit test for DLPA node client.
"""
# pylint:disable=import-error,invalid-name,wrong-import-position
import random
import sys
import unittest

import grpc

sys.path.append("./src/")
from dlpa import DLPAServicer
from dlpa import server as dlpa_server
from dlpanode import DLPAClientServicer
from dlpanode import server as dlpanode_server
from dlpanode import dlpanode_pb2


class TestDlpanodeClient(unittest.TestCase):
    """Test case for DLPA node client.
    """

    def setUp(self):
        """Prepare servers.
        """
        self.servicer = DLPAServicer(nclient=1)
        self.port = random.randint(50000, 59999)
        self.server = dlpa_server(self.port, servicer=self.servicer)

        self.node_servicer = DLPAClientServicer(
            host="localhost", port=self.port, client_id=0, epsilon=0)

        self.listen = random.randint(40000, 49999)
        self.node = dlpanode_server(
            listen=self.listen, servicer=self.node_servicer)

    def tearDown(self):
        """Stop the servers.
        """
        self.server.stop(None)
        self.node.stop(None)

    def test_keys(self):
        """Test the node server obtaines correct keys.
        """
        self.assertEqual(
            self.node_servicer.ck.Lambda_u, self.servicer.cks[0].Lambda_u)
        self.assertEqual(self.node_servicer.ck.a, self.servicer.cks[0].a)
        self.assertEqual(self.node_servicer.ck.b, self.servicer.cks[0].b)

    def test_encrypt_noise_sum(self):
        """Connect the DLPA node server and run Encrypt-Noise-Sum.
        """
        channel = grpc.insecure_channel(
            "localhost:{port}".format(port=self.listen))
        stub = dlpanode_pb2.DLPAClientStub(channel)

        vec = [1, 2, 3, 4, 5]
        stub.EncryptNoisySum(dlpanode_pb2.Matrix(values=vec))
        res = list(self.servicer.encrypt_noisy_sum.results.values())[0]
        for v, c in zip(vec, res):
            self.assertEqual(v, c)


if __name__ == "__main__":
    unittest.main()

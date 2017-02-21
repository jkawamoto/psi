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
"""gRPC server working with a Node-RED node and a DLPA server.

This server receives messages from a Node-RED over tcp connections, and send
them to a DLPA server.
"""
# pylint: disable=import-error
import argparse
from concurrent import futures
import logging
import signal
import sys
import time

import grpc
import numpy as np

from dlpa import DLPAClient
from dlpanode import dlpanode_pb2
from dlpanode import dlpanode_pb2_grpc

LOGGER = logging.getLogger("dlpanode-server")

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class DLPAClientServicer(dlpanode_pb2_grpc.DLPAClientServicer):
    """Implements DLPAClientServicer defined in the proto file.

    Args:
      host: Address of a DLPA server to connect.
      port: Port number of the DLPA server to connect.
      client_id: Client ID.
      epsilon: Parameter to generate laplace noises.
    """

    def __init__(self, host, port, client_id, epsilon):
        self.client = DLPAClient(host, port)
        self.client_id = client_id
        self.epsilon = epsilon
        self.ck = self.client.get_key(self.client_id)
        LOGGER.debug("Receives keys: %s", str(self.ck))

    def EncryptNoisySum(self, request, context):
        """Run Encrypt-Noisy-Sum protocol.
        """
        LOGGER.debug("EncryptNoisySum:%s", str(request.values))
        values = np.array(request.values)
        _ = context
        self.client.encrypt_noisy_sum(
            self.ck, self.client_id, values, self.epsilon)
        return dlpanode_pb2.NoResponse()


def server(listen=30051, max_workers=1, servicer=None, retry=10, **kwargs):
    """Create a new server listening a given port.

    This function starts the created server; but caller is responsible for stop
    it.

    Args:
      listen: Listening port of this server.
      host: Address of the DLPA server to be connected.
      port: Port number of the DLPA server to be connected.
      client_id: DLPA client ID given by the server.
      epsilon: Epsilon used in the Laplace distribution to add noises.

    Returns:
      Server instance; call stop(duration) to close the server.
    """
    if not servicer:
        LOGGER.info("Creating DLPAClientServicer.")
        for _ in range(retry):
            try:
                servicer = DLPAClientServicer(**kwargs)
            except RuntimeError:
                LOGGER.warn("Cannot connect; waiting to retry.")
                time.sleep(10)
            else:
                break
        else:
            raise RuntimeError("Couldn't connect to a server.")
        LOGGER.info("DLPAClientServicer is created.")

    s = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))
    dlpanode_pb2_grpc.add_DLPAClientServicer_to_server(servicer, s)
    s.add_insecure_port("[::]:{0}".format(listen))

    LOGGER.info("Starting a server listening port %d", listen)
    s.start()
    return s


def main():
    """The main function.
    """
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--listen", required=True, type=int, help="Listening port.")
    parser.add_argument(
        "--host", required=True,
        help="Address of the DLPA server to be connected.")
    parser.add_argument(
        "--port", required=True, type=int,
        help="Port number of the DLPA server to be connected.")
    parser.add_argument(
        "--id", required=True, type=int, dest="client_id",
        help="Client ID")
    parser.add_argument(
        "--epsilon", required=True, type=float,
        help="Epsilon used in the Laplace distribution to add noises.")

    s = server(**vars(parser.parse_args()))

    def signal_handler():
        """Catch a signal and stop the server.
        """
        LOGGER.info("Stopping the server.")
        s.stop(0)
        logging.shutdown()

    signal.signal(signal.SIGTERM, signal_handler)

    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        LOGGER.info("Canceled.")
    except Exception as e:  # pylint: disable=broad-except
        LOGGER.exception("Untracked exception occurred: %s", e.message)
    finally:
        LOGGER.info("Stopping the server.")
        s.stop(0)
        logging.shutdown()


if __name__ == "__main__":
    main()

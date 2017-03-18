#
# __init__.py
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
"""Client service of the distributed Laplace Perturbation Algorithm (DLPA).

This service is a gRPC service and provides only EncryptNoisySum method.

This package provides
:class:`DLPAClientServicer <dlpanode.server.DLPAClientServicer>` class
and :meth:`server <dlpanode.server.server>` function.

dlpanode.server module also works as a executable script.
Run

.. code-block:: shell-session

    $ python -m dlpnode.server -h

for more information about the script.
"""
# pylint: disable=import-error
from dlpanode.server import DLPAClientServicer
from dlpanode.server import server

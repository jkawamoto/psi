Distributed Laplace Perturbation Algorithm
==========================================

|GPLv3|

A Node-RED node which provides Distributed Laplace Perturbation
Algorithm (DLPA) for Psi Project.

The DLPA has been introduced by `Vibhor
Rastogi <https://www.linkedin.com/in/vibhor-rastogi-6b680152>`__ and
`Suman Nath <https://www.microsoft.com/en-us/research/people/sumann/>`__
in "`Differentially Private Aggregation of Distributed Time-Series with
Transformation and
Encryption <http://dl.acm.org/citation.cfm?id=1807247>`__," published in
`SIGMOD 2010 <http://www.sigmod2010.org/index.shtml>`__.

requirements
------------

This node uses python scripts and those scripts require python packages
listed in ``requirements.txt``.

To install those required packages, run

::

    $ npm run deps

Note that, before running the above command, you need to install python3
and pip command.

License
-------

This software is released under The GNU General Public License Version
3, see `COPYING <COPYING>`__ for more detail.

The functions, powmod, invert, and getprimeover, defined in
``src/dlpa/util.py`` are made by Data61 \| CSIRO and released under the
GPLv3. The original source code is
`here <https://github.com/n1analytics/python-paillier/blob/master/phe/util.py>`__.

.. |GPLv3| image:: https://img.shields.io/badge/license-GPLv3-blue.svg
   :target: https://www.gnu.org/copyleft/gpl.html

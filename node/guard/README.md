Guarded suspension
===================

[![npm version](https://badge.fury.io/js/node-red-contrib-guarded-suspension.svg)](https://badge.fury.io/js/node-red-contrib-guarded-suspension) [![license](https://img.shields.io/badge/license-GPLv3-blue.svg)](LICENSE)

A Node-RED node which waits to send message until it receives messages from
all topics. If several topics are mixed in your flow and you want tuples which
consists of messages from each topic. This nodes provides such function.

Install
---------

Run the following command in the root directory of your Node-RED install.

```
$ npm install node-red-contrib-guarded-suspension
```

License
========
This software is released under the GNU General Public License version 3, see [LICENSE](LICENSE).

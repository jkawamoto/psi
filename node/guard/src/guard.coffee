#
# guard.coffee
#
# Copyright (c) 2016 Junpei Kawamoto
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
module.exports = (RED) ->

  is_ready = (topics, k) ->
    # Check at least *k* topics has at least one message.
    #
    # Args:
    #   topics: Dictionary of which key is a topic and value is a list of messages.
    #   k: Condition parameter.
    #
    # Returns:
    #   true if at least *k* topics has at least one message.
    count = 0
    for _, queue of topics
      if queue.length > 0
        count += 1
    if count >= k then true else false

  RED.nodes.registerType "guard", (config) ->

    RED.nodes.createNode @, config
    @topics = {}
    @new_topic = config.topic
    @ntopic = parseInt config.ntopic

    @on "input", (msg) =>
      # Handle a message.
      #
      # Args:
      #   msg: new message.
      if msg.topic not of @topics
        @topics[msg.topic] = []
      @topics[msg.topic].push msg

      if is_ready @topics, @ntopic
        time = 0
        res = []
        for _, queue of @topics
          m = queue.shift()
          time = if m.time? and m.time > time then m.time else time
          res.push m.payload

        @send
          topic: @new_topic
          time: parseInt(time)
          payload: res

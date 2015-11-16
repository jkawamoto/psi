#
# Merge sequences.
#
# This function restructures objects returned from collector.
# Each object outputted from collector has a list
# of which each item represents a sequence.
# The object of this function is making a list of which each item represents
# a time.
#
# For example, inputted list is like
# [
#   {
#     "name": "sequence1",
#     "log": [
#       {"time": 1, "log": 123},
#       {"time": 2, "log": 321},
#       ...
#     ]
#   },
#   {
#     "name": "sequence2",
#     "log": [
#       {"time": 1, "log": 456},
#       {"time": 2, "log": 789},
#       ...
#     ]
#   },
#     ...
# ]
# and outptted of this function wiil be like
# [
#   {
#     "time": 1,
#     "log": [
#       {"name": "sequence1", "log": 123},
#       {"name": "sequence2", "log": 456},
#       ...
#     ]
#   },
#   {
#     "time": 2,
#     "log": [
#       {"name": "sequence1", "log": 321},
#       {"name": "sequence2", "log": 789},
#       ...
#     ]
#   },
#     ...
# ]
#
# Args:
#   msg.payload: Outputted object from collector.
#
# Returns:
#   An object having a list of which key is time.
#
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see <http://www.gnu.org/licenses/>.
res = null
for _, seq of msg.payload
  if res is null
    res = seq.map (item) ->
      item.log
  else
    res = seq.map (item, i) ->
      for key of res[i]
        res[i][key] += item.log[key]
      return res
msg.payload = res
return msg

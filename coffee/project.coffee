#
# project.coffee
#
# Copyright (c) 2015 Junpei Kawamoto
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
#
# Project objects to return only "log" attributes.
#
# Args:
#   msg.payload: An object which has log attribute.
#
# Returns:
#   Message object which is same as log attribute of input.
#
msg.payload = msg.payload.map (item) ->
  item.log
return msg

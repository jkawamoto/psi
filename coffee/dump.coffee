#
# dump.coffee
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
# Make a query for MongoDB.
#
# Args:
#   msg.payload.name: Name of container records belong to.
#
# Returns:
#   A query object for MongoDB.
msg.payload =
  container_name: "/#{msg.payload.name}"
msg.projection =
  _id: false
  log: true
msg.limit = 2880
return msg

#
# encode.coffee
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
# URL encode payload attribute.
#
# Args:
#   msg.payload.name: Name of container records belong to.
#
# Returns:
#   A message object of which payload is encoded.
#
msg.payload = encodeURI JSON.stringify(msg.payload)
return msg

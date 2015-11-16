#
# Parsing logs.
#
# msg.payload.log is JSON but it is treated as text by default.
# This function parses those texts and puts JSON objects to each msg.
#
# Args:
#   msg.payload: String JSON object.
#
# Returns:
#   An object made by the input string or null if msg.payload is wrong format.
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
try
  log = JSON.parse msg.payload.log
  for key, value of log
    if value is null
      log[key] = 0
  msg.payload.log = log
  return msg
catch
  return null

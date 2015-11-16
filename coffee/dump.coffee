#
# Make a query for MongoDB.
#
# Args:
#   msg.payload.name: Name of container records belong to.
#
msg.payload =
  container_name: "/#{msg.payload.name}"
msg.projection =
  _id: false
  log: true
msg.limit = 2880
return msg

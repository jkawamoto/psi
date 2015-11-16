#
# Make a query for MongoDB.
#
# Args:
#   msg.payload.name: Name of container records belong to.
#
msg.payload = encodeURI JSON.stringify(msg.payload)
return msg

#
# Return only "log" attributes.
#
msg.payload = msg.payload.map (item) ->
  item.log
return msg

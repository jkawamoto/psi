#
# Merge sequences.
#
# Args:
#   msg.payload: List of records.
#
# Returns:
#   An object having children associated with sequences.
#
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

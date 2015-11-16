#
# Parsing logs.
#
# msg.payload.log is JSON but it is treated as text by default.
# This function parses those texts and puts JSON objects to each msg.
#
try
  log = JSON.parse msg.payload.log
  for key, value of log
    if value is null
      log[key] = 0
  msg.payload.log = log
  return msg
catch
  return null

g = require "gulp"
coffee = require "gulp-coffee"
del = require "del"

conf =
  src: 'src'
  dest: 'dest'

String::startsWith ?= (s) -> @[...s.length] is s
String::endsWith   ?= (s) -> s is '' or @[-s.length..] is s

g.task 'clean', ->
  del [
      "#{conf.dest}/**/*"
  ]

g.task 'coffee', ['clean'], ->
  p = g.src "#{conf.src}/*.coffee"
  .pipe coffee
    bare: true
  .pipe g.dest "#{conf.dest}/"

g.task 'build', ['coffee']

g.task 'default', ['build']

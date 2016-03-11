#
# gulpfile.coffee
#
# Copyright (c) 2016 Junpei Kawamoto
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
gulp = require "gulp"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
uglify = require "gulp-uglify"
del = require "del"

conf =
  src: "src"
  dest: "lib"
  prod: false


# Clean destination.
gulp.task "clean", ->
  del [
      "#{conf.dest}/**/*"
  ]


# Compile coffee scripts.
gulp.task "coffee", ["clean"], ->
  p = gulp.src "#{conf.src}/*.coffee"
    .pipe coffee
      bare: true
  if conf.prod
    p = p.pipe uglify()
  p.pipe gulp.dest "#{conf.dest}/"


# Compile JADE templates.
gulp.task "jade", ["clean"], ->
  p = gulp.src "#{conf.src}/*.jade"
    .pipe jade pretty: not conf.prod
    .pipe gulp.dest "#{conf.dest}/"


gulp.task "prod", ->
  conf.prod = true


gulp.task "build", ["coffee", "jade"]


gulp.task "default", ["build"]

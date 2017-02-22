//
// gulpfile.js
//
// Copyright (c) 2017 Junpei Kawamoto
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const gulp = require("gulp");
const gutil = require("gulp-util");
const execFileSync = require("child_process").execFileSync;
const glob = require("glob");
const path = require("path");


gulp.task("default", ["update"]);

// Install packages for sub projects.
gulp.task("install", (done) => {

    glob("./node/*/package.json", (err, files) => {

        files.forEach((file) => {
            gutil.log("Install dependencies in", gutil.colors.magenta(file));
            const dirname = path.dirname(file);
            execFileSync("npm", ["-prefix", dirname, "install", dirname], {
                stdio: "inherit"
            });
        });
        done(err);

    });

});

// Build sub projects.
gulp.task("build", ["install"], (done) => {

    glob("./node/*/package.json", (err, files) => {

        files.forEach((file) => {
            const dirname = path.dirname(file);
            gutil.log("Build package", gutil.colors.magenta(dirname));
            execFileSync("npm", ["run", "build"], {
                cwd: dirname,
                stdio: "inherit"
            });
        });
        done(err);

    });

});

// Run sub projects' tests.
gulp.task("test", (done) => {

    glob("./node/*/package.json", (err, files) => {

        files.forEach((file) => {
            const dirname = path.dirname(file);
            gutil.log("Build package", gutil.colors.magenta(dirname));
            execFileSync("npm", ["test"], {
                cwd: dirname,
                stdio: "inherit"
            });
        });
        done(err);

    });

});

// Uninstall task uninstalls developping packages.
gulp.task("update", ["build"], (done) => {

    const re = /npm_package_dependencies_node_red_contrib_psi_.*/
    const pkgs = ["npm_package_dependencies_node_red_contrib_guarded_suspension"];
    for (env in process.env) {
        if (re.test(env)) {
            pkgs.push(env);
        }
    }

    const names = pkgs.map(v => {
        return v.substr("npm_package_dependencies_".length)
            .replace(/_/g, "-");
    });

    gutil.log("Executing: npm uninstall", gutil.colors.yellow(names.join(" ")));
    execFileSync("npm", ["uninstall"].concat(names), {
        stdio: "inherit"
    });

    gutil.log("Executing: npm install", gutil.colors.yellow(names.join(" ")));
    execFileSync("npm", ["install"].concat(names), {
        stdio: "inherit"
    });

    done();

});

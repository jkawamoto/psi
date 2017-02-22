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
const exec = require("gulp-exec");
const cp = require("child_process");
const gutil = require("gulp-util");

gulp.task("default", ["update"]);

// Install packages for sub projects.
gulp.task("install", () => {
    return gulp.src("./node/*/package.json", {
            base: "."
        })
        .pipe(exec("npm --silent -prefix ./<%= file.relative.slice(0, -12) %> install ./<%= file.relative.slice(0, -12) %>"))
        .pipe(exec.reporter());
});

// Build sub projects.
gulp.task("build", ["install"], () => {
    return gulp.src("./node/*/package.json", {
            base: "."
        })
        .pipe(exec("cd ./<%= file.relative.slice(0, -12)%> && npm run build"))
        .pipe(exec.reporter());
});

// Run sub projects' tests.
gulp.task("test", () => {
    return gulp.src("./node/*/package.json", {
            base: "."
        })
        .pipe(exec("cd ./<%= file.relative.slice(0, -12)%> && npm test"))
        .pipe(exec.reporter());
});

// Uninstall task uninstalls developping packages.
gulp.task("update", ["build"], () => {

    const re = /npm_package_dependencies_node_red_contrib_psi_.*/
    const pkgs = ["npm_package_dependencies_node_red_contrib_guarded_suspension"];
    for (env in process.env) {
        if (re.test(env)) {
            pkgs.push(env);
        }
    }

    return new Promise((resolve, reject) => {

        const names = pkgs.map(v => {
            return v.substr("npm_package_dependencies_".length)
                .replace(/_/g, "-")
        });

        gutil.log("Executing: npm uninstall", gutil.colors.yellow(names.join(" ")));
        cp.exec("npm uninstall " + names.join(" "), (err, stdout, stderr) => {
            gutil.log(stdout);
            if (!stderr) {
                gutil.log(gutil.colors.red(stderr));
            }
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });

    }).then(() => {

        const names = pkgs.map(v => {
            return v.substr("npm_package_dependencies_".length)
                .replace(/_/g, "-") + "@" + process.env[v];
        });
        gutil.log("Executing: npm install", gutil.colors.yellow(names.join(" ")));
        cp.exec("npm install " + names.join(" "), (err, stdout, stderr) => {
            gutil.log(stdout);
            if (!stderr) {
                gutil.log(gutil.colors.red(stderr));
            }
            if (err) {
                return Promise.reject(err);
            }
        });

    });

})

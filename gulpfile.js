const gulp = require("gulp");
const tslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const tsify = require("tsify");
const browserify = require("browserify");
const source = require('vinyl-source-stream');

gulp.task('clean:transpiled', function () {
  return del([
    'out/**/*',
  ]);
});

gulp.task("transpile", ['clean:transpiled'], function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("out"));
});

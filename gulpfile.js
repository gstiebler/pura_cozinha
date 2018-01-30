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

gulp.task('test:nc', [], function () {
  process.env.NODE_ENV = 'TEST';
  const mochaOptions = {
    timeout: 50000,
    // grep: ''
  }
  const consumerWebAppTestFiles = 'out/ConsumerWebApp/src/tests/**/*.spec.js';
  const srcFiles = [
    'out/server/src/test/lib/TestUtils.js',
    consumerWebAppTestFiles
  ];
  return gulp.src(srcFiles, { read: false })
    // .pipe(print())
    .pipe(mocha(mochaOptions))
    .on('error', function (error) {
      console.error(error);
    })
    .on('end', function () {
      console.log('Tests finished.');
    });
});

gulp.task('test', ['test:nc', 'transpile']);

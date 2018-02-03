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
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('clean:transpiled', function () {
  return del([
    'out/**/*',
  ]);
});

gulp.task("transpile", gulp.series('clean:transpiled', function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("out"));
}));

gulp.task('test:nc', function () {
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

gulp.task('test', gulp.series('transpile', 'test:nc'));

gulp.task("bundle:consumer:nc", function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['out/ConsumerWebApp/src/app.js'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest("./ConsumerWebApp/dist"));
});

gulp.task("bundle:consumer", gulp.series('transpile', "bundle:consumer:nc"));

gulp.task("bundle:consumer:prod", gulp.series('transpile', function () {
  return browserify({
    basedir: '.',
    debug: false,
    entries: ['out/ConsumerWebApp/src/app.js'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest("./ConsumerWebApp/dist"));
}));

gulp.task('start:server', function () {
  return require('./out/server/src/startServer').start();
});

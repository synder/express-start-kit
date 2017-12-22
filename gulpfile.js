const gulp = require('gulp');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');


gulp.task('unit', function (done) {
  gulp.src('./src/**/*_test.js')
    .pipe(babel())
    .pipe(mocha())
    .on('end', done)
    .on('error', function (err) {
      err ? console.error(err.stack) : undefined;
      process.exit(0);
    });
});


gulp.task('build', function (done) {
  gulp.src(['./src/**/*.js', '!./src/**/*_test.js'])
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});
'use strict';

var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('watch-test', function() {

  gulp.watch('lib/*.js', ['test']);

});

gulp.task('test', function() {

  return gulp.src('lib/*spec.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));

});

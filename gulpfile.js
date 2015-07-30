'use strict';

var gulp = require('gulp'),
  mocha = require('mocha'),
  exec = require('child_process').exec,
  tslint = require('gulp-tslint');

gulp.task('lint', function(){
  return gulp.src('lib/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('watch-lint', function() {
  gulp.watch('lib/*.ts', ['lint']);
});

gulp.task('watch-test', function() {
  gulp.watch('lib/*.js', ['test']);
});

gulp.task('test', function (cb) {

  var tests = '\'lib/*.js\'';

  exec('NODE_ENV=test node ./node_modules/istanbul-harmony/lib/cli.js cover node_modules/mocha/bin/_mocha ' +
    '-x \'*spec.js\' --root lib/ --dir test/coverage  -- -R spec --recursive ' + tests, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

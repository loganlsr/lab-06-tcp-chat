'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('lint', function(){
  return gulp.src(['**/*.js', '!node_modules/**']);
});

gulp.task('test', function(){
  gulp.src('./test/*-test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('dev', function(){
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint', 'test']);
});

gulp.task('default', ['test']);

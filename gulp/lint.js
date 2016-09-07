var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('lint',  shell.task(['tslint src/**/*.ts']));
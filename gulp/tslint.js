var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('tslint',  shell.task(['tslint src/**/*.ts']));


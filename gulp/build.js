var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('purge_previous_build',  shell.task(['rm -r ./dist/* &>/dev/null']));
gulp.task('transpile', shell.task(['tsc']));
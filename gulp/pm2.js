var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('pm2',  shell.task(['pm2 --no-daemon start pm2.yml']));
gulp.task('pm2_up',  ['knex_up', 'pm2']);
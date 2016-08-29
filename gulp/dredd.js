var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('dredd',  shell.task(['dredd swagger.yml http://localhost:${APPLICATION_PORT} --server "node dist/index.js"']));
gulp.task('dredd_up',  ['knex_up', 'pm2']);
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('dredd',  shell.task(['dredd swagger.yml http://localhost:' + process.env.SERVICE_PORT + ' --level "silly" --server "node dist/index.js"']));
gulp.task('dredd_up',  ['knex_up', 'dredd']);
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('knex_migrate',  shell.task(['knex migrate:latest --knexfile dist/knexfile.js']));
gulp.task('knex_seed',  shell.task(['knex seed:run --knexfile dist/knexfile.js']));
gulp.task('knex_up',  ['knex_migrate', 'knex_seed']);
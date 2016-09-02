var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('migrate',  shell.task(['knex migrate:latest --knexfile dist/knexfile.js']));
gulp.task('seed', ['migrate'], shell.task(['knex seed:run --knexfile dist/knexfile.js']));
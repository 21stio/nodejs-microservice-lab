var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('nodemon_development',  shell.task(['nodemon --legacy-watch --watch ./dist --watch ./node_modules --watch ./swagger.yml --watch ./swagger-definitions.yml --debug=' + process.env.APPLICATION_DEBUG_PORT + ' ./dist/index.js']));
 
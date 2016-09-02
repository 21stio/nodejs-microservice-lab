var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('dredd',  shell.task(['dredd swagger.yml http://localhost:' + process.env.SERVICE_PORT + ' --server "node dist/index.js"']));
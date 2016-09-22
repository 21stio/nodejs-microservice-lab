var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('test_integration',  shell.task(['mocha ./dist/tests/integration/**/*']));
gulp.task('test_http_interface',  shell.task(['dredd swagger.yml http://localhost:' + process.env.SERVICE_PORT + ' --server "node dist/index.js"  --server-wait 5']));
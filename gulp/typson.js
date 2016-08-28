var gulp = require('gulp');
var data = require('gulp-data');
var typson = require('typson');
var fs = require('fs');
var yaml = require('yamljs');
var concat = require('gulp-concat');

gulp.task('typson', function () {
    gulp.src('./src/app/Contracts.ts')
        .pipe(data(function (file) {
            return typson.schema(file.path)
                .done(function (schema) {
                    schema = schema.definitions

                    for (var definition in schema) {
                        delete schema[definition].id
                    }

                    fs.writeFileSync('./swagger-definitions.yml', yaml.stringify(schema, 10, 2));
                });
        }));
});
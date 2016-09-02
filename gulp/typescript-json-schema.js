var gulp = require('gulp');
var fs = require('fs');
var yaml = require('yamljs');
var exec = require('child_process').exec;


gulp.task('typescript-json-schema', function () {
    var command = "node ./gulp/run-typescript-json-schema";

    exec(command, function (err, stdout, stderr) {
        schema = JSON.parse(stdout);

        schema = schema.definitions;
        delete schema["IRender"];

        function removeMeta(obj) {
            for(prop in obj) {
                if (['additionalItems', 'minItems'].indexOf(prop) !== -1)
                    delete obj[prop];
                else if (typeof obj[prop] === 'object')
                    removeMeta(obj[prop]);
            }
        }

        removeMeta(schema);

        fs.writeFileSync('./swagger-definitions.yml', yaml.stringify(schema, 10, 2).replace(/#\/definitions/g, '#'));
    });
});



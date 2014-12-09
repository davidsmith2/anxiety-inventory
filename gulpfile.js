var gulp = require('gulp');
var connect = require('gulp-connect');
var server = require('gulp-express');

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 8888
    });
});

gulp.task('server', function () {
    server.run({
        file: 'server/app.js'
    });
});

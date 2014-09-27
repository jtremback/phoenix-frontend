var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpLess = require('gulp-less');
var gulpJade = require('gulp-jade');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  return browserify('./scripts/script.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('less', function () {
  return gulp.src('./styles/style.less')
    .pipe(gulpLess({ paths: ['./styles'] }))
    .pipe(gulpAutoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulpRename('style.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('jade', function () {
  return gulp.src('./templates/index.jade')
    .pipe(gulpJade())
    .pipe(gulpRename('index.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', [ 'browserify', 'less', 'jade' ]);

//// WATCH
gulp.task('watch', [ 'default' ], function () {
  gulp.watch('./styles/*', ['less']);
  gulp.watch('./scripts/*', ['browserify']);
  gulp.watch('./templates/*', ['jade']);
});
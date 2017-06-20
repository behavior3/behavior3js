var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var yuidoc = require('gulp-yuidoc');
// var jsdoc  = require('gulp-jsdoc');
var zip    = require('gulp-zip');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var info   = require('./package.json');

var NAME = 'behavior3-'+info.version;

/**
 * Apply jshint to the source and print results on terminal.
 */
gulp.task('_jshint', function() {
  return gulp.src(['src/b3.js', 'src/**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('_build', function() {
  return browserify('./src/index.js', {standalone: 'b3'})
          .transform(babelify, {
            presets: ['es2015']
          })
          .transform('uglifyify')
          .bundle()
          .pipe(source('bundled-app.js'))
          .pipe(buffer())
          .pipe(rename(NAME+'.js'))
          .pipe(gulp.dest('./libs'));
});

/**
 * Generate YUIDOCS
 */
gulp.task('_docs', function() {
  var OPTS = {
    'themedir': 'docs/theme',
    'helpers': ['docs/theme/helpers.js'],
  }
  return gulp.src(['src/b3.js', 'src/**/*.js'])
             .pipe(yuidoc(OPTS, OPTS))
             .pipe(gulp.dest('./docs/'+NAME))
             .pipe(zip(NAME+'.docs.zip'))
             .pipe(gulp.dest('./docs/'))
});

//
gulp.task('dev', function() {
  gulp.watch('src/**/*.js', ['_jshint']);
})
gulp.task('build', ['_build', '_docs']);

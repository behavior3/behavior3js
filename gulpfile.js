var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var yuidoc = require('gulp-yuidoc');
var zip    = require('gulp-zip');
var info   = require('./package.json');

var NAME = 'behavior3-'+info.version;

/**
 * Apply jshint to the source and print results on terminal.
 */
gulp.task('_jshint', function() {
  return gulp.src('src/**/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Concatenate and uglify source.
 */
gulp.task('_minify', function() {
  return gulp.src(['src/b3.js', 'src/**/*.js'])
             .pipe(concat(NAME+'.js'))
             .pipe(gulp.dest('./libs'))
             .pipe(uglify())
             .pipe(rename(NAME+'.min.js'))
             .pipe(gulp.dest('./libs'))
});

/**
 * Generate YUIDOCS
 */
gulp.task('_docs', function() {
  return gulp.src(['src/**/*.js'])
             .pipe(yuidoc())
             .pipe(gulp.dest('./docs/'+NAME))
             .pipe(zip(NAME+'.docs.zip'))
             .pipe(gulp.dest('./docs/'))
});


//
gulp.task('dev', function() {
  gulp.watch('src/**/*.js', ['_jshint']);
})
gulp.task('build', ['_minify', '_docs']);
gulp.task('deploy', function() {})
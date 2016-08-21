var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      '*.html',
      'css/**/*.css',
      'js/**/*.js'
   ];

   browserSync.init(files, {
/*    server option for static sites/apps, proxy for Flask apps */
      server: {
         baseDir: './'
      }
/*
      proxy: "localhost:5000"
*/
   });
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 3 version', 'android >= 3', { cascade: true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['css', 'js'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('src/styles/*.less', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'browser-sync', 'watch');
});

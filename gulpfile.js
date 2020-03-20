let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

// Компиляция scss
gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});
// Подгружаем html в лайв сервер
gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}));
});
// Подгружаем js в лайв сервер
gulp.task('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({
      stream: true
    }));
});
// Работа с js
gulp.task('js', function() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});
// Запуск лайв серввера
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});
// автозапуск компиляции
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  // gulp.watch('app/*.html', gulp.parallel('html')); следим за html
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'));

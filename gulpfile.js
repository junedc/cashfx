const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');
const inject = require('gulp-inject');
let concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
var cleanCSS = require('gulp-clean-css');


gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('reload'));
    gulp.watch('src/**/*.{html,js,css}', gulp.series('reload'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('css', function () {
    gulp.src('src/app/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('fonts', function () {
    gulp.src('src/app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});



gulp.task('js', function () {
    gulp.src('src/app/js/**/*')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('jquery', function () {
    gulp.src('src/app/js_jquery/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
});



gulp.task('images', function () {
    gulp.src('src/app/images/**/*')
        .pipe(gulp.dest('dist/images'));
});


gulp.task('html', function () {
    gulp.src('src/app/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', gulp.parallel('css', 'js', 'jquery', 'html', 'fonts', 'images', 'serve', 'watch'));


gulp.task('jsx', function () {
    gulp.src(['/src/app/js/**/!(jquery.min.js)'])   //except jquery
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('jsss', function () {
    gulp.src([
        '/src/app/js/**/bootstrap.min.js',
        '/src/app/js/**/aos.js',
        '/src/app/js/**/owl.carousel.min.js',
        '/src/app/js/**/rellax.min.js',
        '/src/app/js/**/smoothscroll.js',
        '/src/app/js/**/custom.js',
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js_only', gulp.parallel('jsss', 'serve', 'watch'));


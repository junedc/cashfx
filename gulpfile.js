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

// gulp.task('inject', function () {
//     let target = gulp.src('./src/index.html');
//     let sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
//
//     return target.pipe(inject(sources))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('css', function () {
    gulp.src('src/app/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('fileinclude', function () {
    gulp.src('src/app/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', gulp.parallel('css','fileinclude', 'serve', 'watch'));

// gulp.task('useref', function () {
//     return gulp.src('src/*.html')
//         .pipe(useref())
//         .pipe(gulpif('*.css', csso()))
//         .pipe(gulp.dest('dist'))
// })

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const pug = require('gulp-pug');

gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))//compressed
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

// gulp.task('html', function() {
//     return gulp.src('app/*.html')
//         .pipe(browserSync.reload({steram: true}))
// })

// gulp.task('js', function() {
//     return gulp.src(['node_modules/slick-carousel/slick/slick.js',
//     'node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({stream: true}))
// });

gulp.task('pug', function() {
    return gulp.src('app/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('app/html'))
        .pipe(browserSync.reload({stream: true}))

})


gulp.task('script', function() {
    return gulp.src('app/*.js')
        .pipe(browserSync.reload({steram: true}))
})

gulp.task('watch', function() {
    // gulp.watch('app/*.html', gulp.parallel('html')); Слежение будет не за файдами html, а за файлами pug
    gulp.watch('app/pug/*pug', gulp.parallel('pug'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('browser-sync', function() {
    browserSync.init({server: { baseDir: 'app/html'}})
});

gulp.task('default', gulp.parallel(
    'pug',
    'scss', 
    // 'js', 
    'browser-sync', 
    'watch'
));
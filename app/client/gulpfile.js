'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
const uglifyJs = require('gulp-uglify');
const { series } = require('gulp');

gulp.task('babel', (done) => {
    gulp.src('./src/scripts/pages/*')
        .pipe(
            babel({
                presets: ['@babel/preset-env']
            })
        )
        .pipe(uglifyJs())
        .pipe(gulp.dest('../konradgnat/static_files/js/pages/'));
    done();
});

gulp.task('css', function (done) {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../konradgnat/static_files/css/'));
    gulp.src('./src/styles/vendors/*').pipe(
        gulp.dest('../konradgnat/static_files/css/')
    );
    gulp.src('./src/styles/pages/*.css')
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../konradgnat/static_files/css/pages'));
    done();
});

gulp.task('imagemin', function (done) {
    gulp.src(['./src/images/**/*'])
        // .pipe(
        //     imagemin([
        //         pngquant({
        //             speed: 1,
        //             quality: [0.7, 0.8]
        //         }),
        //         mozjpeg(
        //             {
        //                 quality: 90
        //             },
        //             {
        //                 verbose: true
        //             }
        //         )
        //     ])
        // )
        .pipe(gulp.dest('../konradgnat/static_files/images/'));

    // gulp.src(['./src/images/*'])
    //     .pipe(webp())
    //     .pipe(gulp.dest('../konradgnat/static_files/images/webp/'));
    done();
});

gulp.task(
    'default',
    series('css', 'babel', function (done) {
        gulp.watch(
            ['src/styles/**/*.scss', 'src/styles/pages/*'],
            series('css')
        );
        gulp.watch(
            ['./src/scripts/**/*.js', './src/scripts/pages/*'],
            series('babel')
        );
        done();
    })
);

gulp.task(
    'build',
    series('css', 'imagemin', 'babel', function (done) {
        done();
    })
);

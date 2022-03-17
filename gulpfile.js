const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat'); // Slå ihop filer
const terser = require('gulp-terser').default; // Komprimera JS
const cleanCSS = require('gulp-clean-css'); // Komprimera CSS
const htmlmin = require('gulp-htmlmin'); // Komprimera HTML
const imagemin = require('gulp-imagemin'); // Komprimera bilder
const sourcemaps = require('gulp-sourcemaps'); // Kartlägger kod
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// sökvägar
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/style/*.scss",
    jsPath: "src/js/*.js",
    imgPath: "src/images/*"
}

// HTML-task, kopierar filer
function htmlTask() {
    return src(files.htmlPath)
    .pipe(browserSync.stream())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('pub'))
}

// JS-task, konkatenera filer
function jsTask() {
    return src(files.jsPath)
    .pipe(browserSync.stream())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/js'))
}

// Sass-task, förvandlar till css, konkatenerar ihop till main.css och komprimerar
function sassTask() {
    return src(files.sassPath)
    .pipe(browserSync.stream())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('pub/style'))
}

// img-task, komprimerar bilder
function imgTask() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pub/images'))
}

// watch
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath], parallel(htmlTask, jsTask, sassTask, imgTask));
}

exports.default = series(
    parallel(htmlTask, jsTask, sassTask, imgTask),
    watchTask
);
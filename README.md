# Projekt DT173G
Detta är frontdelen för mitt projekt i kursen Webbutveckling 3, denna är automatiserad genom GULP och konsumerar webbtjänsten som finns i repot projektrest_dt173g.
Genom att automatisera denna del så utför datorn en del av arbetet som annars hade behövts läggas tid på under utvecklingen, som till exempel att komprimera bilder.

Projektet innehåller följande paket:
* gulp-concat
* gulp-terser
* gulp-clean-css
* gulp-htmlmin
* gulp-imagemin
* gulp-sourcemaps
* gulp-autoprefixer
* gulp-sass
* browser-sync

Dessa paket valdes för att de använts under tidigare moment och fungerar bra för uppgiften.

Projektet innehåller följande funktioner/metoder
```
// sökvägar
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/style/*.scss",
    jsPath: "src/js/*.js",
    imgPath: "src/images/*"
}
```
```
// HTML-task, kopierar filer
function htmlTask() {
    return src(files.htmlPath)
    .pipe(browserSync.stream())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('pub'))
}
```
```
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
```
```
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
```
```
// img-task, komprimerar bilder
function imgTask() {
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('pub/images'))
}
```
```
// watch
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath], parallel(htmlTask, jsTask, sassTask, imgTask));
}
```
```
exports.default = series(
    parallel(htmlTask, jsTask, sassTask, imgTask),
    watchTask
);
```

## För att använda detta repo skriver du följande i din terminal
### För att klona repo
1. `https://github.com/jespernorris/projektfront_dt173g.git`
### Installera paket från package.json
2. `npm install`
### Starta den automatiserade processen
3. `gulp`


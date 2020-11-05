
const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCss = require("gulp-clean-css")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create()


sass.compiler = require('node-sass')

gulp.task("sass", function() {
    //we want to run "sass css/app.scss app.css --watch"
    return gulp.src("src/css/app.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sass())
    .pipe(
        cleanCss({
            compatibility: 'ie8'
        })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())

})

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
    return gulp.src("src/img/*")
        .pipe(imagemin([
            imageminPngquant({qualtiy: [0.6, 0.6]})
        ]))
        .pipe(gulp.dest("dist/img"))
})

gulp.task("scripts", function () {
    return gulp.src("src/scripts/*.js")
        .pipe(
            webpack({
                mode: 'production',
                devtool: 'source-map',
                output: {
                    filename: "app.js"
                }
            })
        )
        .pipe(gulp.dest("dist/scripts"))
})




gulp.task("watch", function(){

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })


    gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
    gulp.watch("src/css/app.scss", ["sass"])
    gulp.watch("src/fonts/*", ["fonts"])
    gulp.watch("src/img/*", ["images"])
    gulp.watch("src/scripts/*.js", ["scripts"])
})

gulp.task('default', ["html", "sass", "fonts", "images", "scripts", "watch"])


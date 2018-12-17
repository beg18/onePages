var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    less = require('gulp-less'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    gcmq = require('gulp-group-css-media-queries');


var path = {
    build: { // Куда складывать готовые файлы после сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/i/',
        fonts: 'build/css/fonts/'
    },
    src: { // Откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/+(style|styles-percentage|styles-ie).less',
        img: 'src/i/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    watch: { // За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        img: 'src/i/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    clean: './build'
};



gulp.task('maps:build', function(){
   gulp.src(path.src.css)
       .pipe(rigger())
       .pipe(sourcemaps.init())
       .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.build.css));
});


gulp.task('gcmd:build', function(){
   gulp.src(path.src.css)
       .pipe(rigger())
  .pipe(gulp.dest(path.build.css));
});


gulp.task('html:build', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(gulp.dest(path.build.html)); // Переместим их в папку build
});


gulp.task('js:build', function () {
    gulp.src(path.src.js) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(uglify()) // Сожмем js
        .pipe(gulp.dest(path.build.js)); // Переместим готовый файл в build
});


gulp.task('css:build', function () {
    gulp.src(path.src.css) // Выберем наш style.less
        .pipe(less()) // Скомпилируем
        .pipe(prefixer()) // Добавим вендорные префиксы
        .pipe(cssnano({zindex: false})) // Сожмем
        .pipe(gulp.dest(path.build.css)); // Переместим в build
});


gulp.task('image:build', function () {
    gulp.src(path.src.img) // Выберем наши картинки
        .pipe(imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); // Переместим в build
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) // Переместим шрифты в build
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'maps:build',
    'gcmd:build',
    'image:build'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('maps:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('gcmd:build');
    });
});


gulp.task('default', [ 'build', 'watch']);

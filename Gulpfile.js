const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserify = require('browserify');
const babel = require('babelify');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const importCSS = require('postcss-import');

const browserSync = require('browser-sync');

const path = require('path');


gulp.task('javascript', () => {
    const bundler = browserify('./index.js', {debug: true})
        .transform(babel, {
            presets: ['es2015']
        });
    
    return bundler.bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end')
        })
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'));
});
function css() {
    var processors = [
        importCSS(),
        autoprefixer()
    ];
    
    return gulp.src("index.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest('./build'));
}
gulp.task('css', css);
gulp.task('synccss', () => {
    return css().pipe(browserSync.stream());
})

gulp.task('browserSync-js', ['javascript'], () => {
    browserSync.reload();
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8082
    });
    gulp.watch("./index.js", ['browserSync-js']);
    gulp.watch("./lib/*.js", ['browserSync-js']);
    gulp.watch("./index.css", ['synccss']);
    gulp.watch("./style/*.css", ['synccss']);
    gulp.watch("./index.html", browserSync.reload)
})
const gulp = require('gulp');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserify = require('browserify');
const babel = require('babelify');

const sourcemaps = require("gulp-sourcemaps");

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const importCSS = require('postcss-import');

const svgstore = require("gulp-svgstore");
const inject = require("gulp-inject")

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
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'));
});
function css() {
    var processors = [
        importCSS(),
        autoprefixer()
    ];
    
    return gulp.src("index.css")
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .on('error', function(err) {
          console.error(err);
          this.emit('end');
        })
        .pipe(gulp.dest('./build'));
}
gulp.task('css', css);
gulp.task('synccss', () => {
    return css().pipe(browserSync.stream());
})

gulp.task('browserSync-js', ['javascript'], () => {
    browserSync.reload();
});

gulp.task('svgstore', () => {
    var svgs = gulp.src("./assets/*.svg")
        .pipe(svgstore({inlineSvg: true}));
        
    return gulp.src("./index.html")
        .pipe(inject(svgs, {transform: (filePath, file) => {
            return file.contents.toString();
        }}))
        .pipe(gulp.dest("./build/"));
});

gulp.task('assets', () => {
    gulp.src("./assets/*")
        .pipe(gulp.dest("./build/assets/"));
})

gulp.task('reinject-svg', ['svgstore'], browserSync.reload)

gulp.task('default', ['svgstore', 'javascript', 'css', 'assets']);

gulp.task('serve', ['default'], () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        ghostMode: false,
        port: 8082
    });
    gulp.watch("./index.js", ['browserSync-js']);
    gulp.watch("./lib/*.js", ['browserSync-js']);
    gulp.watch("./index.css", ['synccss']);
    gulp.watch("./style/*.css", ['synccss']);
    gulp.watch("./index.html", ['reinject-svg']);
    gulp.watch("./assets/*", ['assets']);
})
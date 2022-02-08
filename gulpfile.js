const gulp =  require("gulp")
const ejs = require("gulp-ejs")
const rename = require("gulp-rename")
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

var dir = {
    assets: {
        // jquery   : './node_modules/jquery/dist',
        bootstrap: './node_modules/bootstrap-honoka/dist/js'
    },
    src: {
        ejs  : './src/ejs',
        scss : './src/scss',
        js   : './src/js',
        img  : './src/img'
    },
    dist: {
        html : './dist',
        css  : './dist/css',
        js   : './dist/js',
        img  : './dist/img'
    }
};

gulp.task("ejs", async function() {
    gulp.src(
        [dir.src.ejs + "/**/*.ejs", "!" + dir.src.ejs + "/**/_*.ejs"] 
    )
        .pipe(ejs(require('./src/data.json')))
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest(dir.dist.html))
});

gulp.task("sass", async function() {
	return gulp.src([dir.src.scss + "/**/*.scss"])
    .pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest(dir.dist.css))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
	return gulp.src([dir.src.js + "/**/*.js"])
		.pipe(gulp.dest(dir.dist.js)); 
});

function watch() {
    browserSync.init({
        server: {
            baseDir: dir.dist.html,
            index: "/index.html"
        }
    });

	gulp.watch(dir.src.ejs + "/**/*.ejs").on('change', 
        gulp.series( "ejs", browserSync.reload));

    gulp.watch(dir.src.scss + "/**/*.scss").on('change', 
        gulp.series( "sass", browserSync.reload));

    gulp.watch(dir.src.js + "/**/*.js").on('change', 
        gulp.series( "js", browserSync.reload));

	// gulp.watch(dir.src.img + "/**/*.+(jpg|jpeg|png|gif|svg)",["imagemin"]);
}

exports.default = watch;

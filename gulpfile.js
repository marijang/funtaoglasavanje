var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    watch  = require('gulp-watch'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    clean = require('gulp-clean')
    cssmininfy=require('gulp-clean-css');



var paths = {
    scss: './scss/*.scss',
    js:   ['./js/*.js'],
    libjs: [
             './bower_components/jquery/dist/jquery.js'
           ],
    fonts: ['./fonts/**','./scss/fonts/**'],
    img: ['./img/**','./scss/img/**','img/**'],
    html: ['./html/*.*','./*.html'],
};


gulp.task('js:minify', function() {
  var appjs = paths.js;
  var libjs = paths.libjs;
  console.log(libjs);
   gulp.src('dist/js/app.all.js').pipe(clean());
   gulp.src(libjs.concat(appjs))
    .pipe(concat('app.all.js'))
    .pipe(minify({
        ext:{
            src:'app-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['app.all.js', '-min.js']
    }))
  //  
    .pipe(gulp.dest('dist/js'))
    
    //.pipe(gulp.dest('dist/js'))
    .pipe(notify("JS Minified!"));
});

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString());
  this.emit('end');
}

gulp.task('css', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['css'].concat()
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify("CSS Compiled!"));
        ;
});

gulp.task('css:minify', ['css'], function() {
  return gulp.src('dist/css/*.css')
    .pipe(cssmininfy({compatibility: 'ie8'}))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify("CSS Minified!"));;
});

gulp.task('copy:fonts',function(){
	//gulp.src('dist/fonts/**')
	//    .pipe(clean());
	gulp.src(paths.fonts)
	    .pipe(gulp.dest('dist/fonts'))
	    .pipe(notify("Fonts copied!"));
});

gulp.task('copy:img',function(){
	//gulp.src('dist/img/*.*')
	//    .pipe(clean());
	gulp.src(paths.img).pipe(gulp.dest('dist/img')).pipe(notify("Image Copied!"));;
});

gulp.task('copy:html',function(){
	//gulp.src('dist/*.html')
	//    .pipe(clean());
	gulp.src(paths.html).pipe(gulp.dest('dist')).pipe(notify("Html Copied!"));;
});

gulp.task('watch',function(){
	gulp.watch(paths.img,['copy:img']);
	gulp.watch(paths.fonts,['copy:font']);
	gulp.watch(paths.html,['copy:html']);
    gulp.watch(paths.scss,['css:minify']);
    gulp.watch(paths.js,['js:minify']);
});
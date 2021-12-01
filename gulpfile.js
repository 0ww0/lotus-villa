/* File: gulpfile.js */

// Use localhost:3000

'use strict';
// modules
var gulp  		    = require('gulp'),
    gutil 		    = require('gulp-util'),
    sass  		    = require('gulp-sass'),
    pug   		    = require('gulp-pug'),
    browserSync   	= require('browser-sync').create(),
    reload        	= browserSync.reload,
    newer 		  	= require('gulp-newer'),
    image         = require('gulp-image'),
    imagemin       = require('gulp-imagemin'),
    cache         	= require('gulp-cache'),
    autoprefixer  	= require('gulp-autoprefixer'),
    plumber       	= require('gulp-plumber'),
    prettify      	= require('gulp-html-prettify'),
    pump          	= require('pump'),
    concat 		  	= require('gulp-concat'),
  	deporder 	  	= require('gulp-deporder'),
  	stripdebug    	= require('gulp-strip-debug'),
  	uglify 		  	= require('gulp-uglify'),
  	del 			= require('del'),
    filelog   = require('gulp-filelog'),

  	portDestination = '8080',

  	folder = {
    	src: 'src/assets/',
    	srcDest: 'src/',
    	build: 'build/assets/',
    	buildDest: 'build/'

  	};

 console.log('Running Task...');

// Images Task Runner 
// Minify images
gulp.task('images', function(){
	var out = folder.build + 'images/';
    gulp.src(folder.src + 'images/**/*.+(png|jpg|gif|svg)')
      .pipe(filelog('Preparing'))
      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: false}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
              ]
          })
      ]))
      .pipe(newer(out))
      .pipe(filelog('Optimized'))
      .pipe(gulp.dest(out));
});

// Html Task Runner
// Template - Jade/Pug
gulp.task('template',function(){
	gulp.src(['src/**/*.+(pug|html)', '!src/templates/**/*.+(pug|html)'])
		.pipe(pug({ defaults: { cache: false }, basedir: 'build/' } ))
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
		.pipe(gulp.dest('build/'))
		.on("end", reload);
});

// Js Task Runner
// if use concat to combine all the js into one file
// Learn More about deporder
// 
gulp.task('script',function(){
	gulp.src(folder.src + 'js/**/*.js')
		.pipe(deporder())
		.pipe(stripdebug())
    .pipe(uglify())
		//.pipe(concat('global.js'))
		.pipe(gulp.dest(folder.build + 'js/'))
		.pipe(browserSync.stream());
});


gulp.task('sass', function(){
	gulp.src(folder.src + 'scss/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(browserSync.reload({ stream: true }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest(folder.build + 'css/'))
		.pipe(browserSync.stream());
});


gulp.task('fonts', function(){
    gulp.src(folder.src + 'fonts/**/*.+(eot|svg|ttf|woff|woff2)')
      .pipe(gulp.dest(folder.build + 'fonts/'));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'build/'
		},
		port: portDestination,
	});
});


var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};


gulp.task('clear', function(done){
    return cache.clearAll(done);
});

gulp.task('clean:build',function(){
  console.log('Deleting build folder.....');
  return del([
    folder.buildDest
  ]);
});

gulp.task('build',['sass','template','images','script','fonts'], function() {
  	console.log('Building asset....');
});

gulp.task('serve',['browserSync'], function() {
    console.log('Running Localhost:' + portDestination);
    gulp.watch(folder.src + 'scss/**/*.scss',['sass']);
    gulp.watch('src/**/*.+(pug|html)',['template']);
    gulp.watch(folder.src+ 'images/**/*.+(png|jpg|gif|svg)',['images']);
    gulp.watch(folder.src + 'js/**/*.js',['script']);
});

gulp.task('default',function(){
  console.log('Do use: ( gulp serve ) to get the server running');
});


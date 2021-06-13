var gulp       = require( 'gulp' );
var gutil      = require( 'gulp-util' );
var compass    = require( 'gulp-compass' );
var uglify     = require( 'gulp-uglify' );
var rtlcss     = require( 'gulp-rtlcss' );
var rename     = require( 'gulp-rename' );
var minifycss  = require( 'gulp-minify-css' );
var concat     = require( 'gulp-concat' );


// output
var outputDIR = 'assets/';

// sass src
var sassSRC = './sass/style.scss';


// compass/sass task
gulp.task( 'compass', function(){
	gulp.src( sassSRC )
	.pipe( compass({
		sass    : 'sass',
		image   : 'img',
		style   : 'expanded',
		sourcemap: true,
		css     : outputDIR + 'css',
		require : ['susy', 'breakpoint']
	}))
	.pipe(gulp.dest( outputDIR + 'css' ))

	.pipe(rename({ suffix: '.min' })) // Append "-rtl" to the filename. 
	.pipe(minifycss())
	.pipe(gulp.dest( outputDIR + 'css' ))

	.on( 'error', gutil.log )
});

gulp.task( 'compass-rtl', function(){
	gulp.src( sassSRC )
	.pipe( compass({
		sass    : 'sass',
		image   : 'img',
		style   : 'expanded',
		sourcemap: true,
		css     : outputDIR + 'css',
		require : ['susy', 'breakpoint']
	}))

	.pipe(rtlcss()) // Convert to RTL. 
	.pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename. 
	.pipe(gulp.dest( outputDIR + 'css' ))

	.pipe(rename({ suffix: '.min' })) // Append "-rtl" to the filename. 
	.pipe(minifycss())
	.pipe(gulp.dest( outputDIR + 'css' ))

	.on( 'error', gutil.log )
	
});


gulp.task( 'js', function(){
	gulp.src( 'assets/js/script.js' )
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify()) 
	.pipe(gulp.dest(outputDIR + "js"))

});



gulp.task('watch', function () {
	gulp.watch( 'assets/js/script.js', ['js'] );
	gulp.watch( './sass/**/*.scss', ['compass', 'compass-rtl'] )
});



gulp.task('default', [ 'js', 'compass', 'compass-rtl', 'watch']);
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp
		.src([
			'node_modules/bootstrap/scss/bootstrap.scss',
			'public/scss/*.scss',
		])
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /public/js folder
gulp.task('js', function () {
	return gulp
		.src([
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/tether/dist/js/tether.min.js',
		])
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
	browserSync.init({
		server: './public',
	});

	gulp.watch(
		['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'],
		['sass']
	);
	gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);

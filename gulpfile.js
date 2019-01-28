//Require dependencies

//Utilities
const gulp = require('gulp');
const gutil = require('gulp-util');
const log = require('fancy-log');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sassdocs = require('sassdoc');
const del = require('del');

//CSS dependencies
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('gulp-cssnano');

//JS dependencies
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

//Image dependencies
const image = require('gulp-image');

// Assets paths.
const paths = {
	css: './css/*.css',
	images: './assets/images/*',
	scss: './scss/**/*.scss',
  scripts: ['./js/*.js', '!./js/*.min.js', '!./js/customizer.js']
};

/**
 * Handle errors and alert the user.
 *
 * https://www.npmjs.com/package/gulp-notify
 * https://www.npmjs.com/package/gulp-util
 */
function handleErrors() {
	const args = Array.prototype.slice.call(arguments);
	notify
		.onError({
			title: 'Task Failed [<%= error.message %>',
			message: 'See console.',
			sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
		})
		.apply(this, args);

	gutil.beep(); // Beep 'sosumi' again.

	// Prevent the 'watch' task from stopping.
	this.emit('end');
}
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([paths.css]);
}

/**
 * Compile Sass.
 *
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/gulp-autoprefixer
 * https://www.npmjs.com/package/css-mqpacker
 * https://www.npmjs.com/package/gulp-cssnano
 */

function styles() {
	log('Generate CSS files ' + new Date().toString());
	return (
		gulp
			.src(paths.scss)
			// Deal with errors.
			.pipe(plumber({ errorHandler: handleErrors }))
			// Wrap tasks in a sourcemap.
			.pipe(sourcemaps.init())
			.pipe(
				sass({
					errLogToConsole: true,
					outputStyle: 'expanded'
				})
			)
			.pipe(autoprefixer('last 3 version', 'ie11'))
			.pipe(
				postcss([
					mqpacker({
						sort: true
					})
				])
			)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./css'))
	);
}

/**
 * Minify and optimize style.css.
 *
 * https://www.npmjs.com/package/gulp-cssnano
 */
function minify() {
	log('Minify CSS files ' + new Date().toString());
	return gulp
		.src(paths.css)
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(
			cssnano({
				safe: true // Use safe optimizations.
			})
		)
		.pipe(
			rename({
				suffix: '.min'
			})
		)
		.pipe(gulp.dest('./css'));
}

function scripts() {
	log('Compile Scripts ' + new Date().toString());
	return gulp
		.src(paths.scripts, { sourcemaps: true })
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('./js'));
}

/**
 * Optimize images.
 *
 * https://www.npmjs.com/package/gulp-image
 */
function images() {
	log('Compress images ' + new Date().toString());
	return gulp
		.src(paths.images)
		.pipe(plumber({ errorHandler: handleErrors }))
		.pipe(
			image({
				pngquant: true,
				optipng: false,
				zopflipng: true,
				jpegRecompress: false,
				mozjpeg: true,
				guetzli: false,
				gifsicle: true,
				svgo: true,
				concurrent: 10,
				quiet: false
			})
		)
		.pipe(gulp.dest('./assets/images'));
}

/**
 * Sass docs.
 *
 * http://sassdoc.com/getting-started/
 */
function sassdoc() {
	log('Generate Sassdoc ' + new Date().toString());
	let options = {
		dest: 'docs',
		verbose: true
	};

	return gulp.src(paths.scss).pipe(sassdocs(options));
}

/**
 * Create watch tasks.
 */
function watch() {
	gulp.watch(paths.scss, gulp.series(clean, styles, minify));
	gulp.watch(paths.scripts, scripts);
	gulp.watch(paths.images, images);
}

const build = gulp.series( clean,
	gulp.parallel(styles, scripts, images, sassdoc),
	minify,
	watch
);

/*
 * Declare tasks
 */
exports.clean = clean;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;

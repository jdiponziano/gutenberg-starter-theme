//Require dependencies

//Utilities
const gulp = require('gulp');
const gutil = require('gulp-util');
const log = require('fancy-log');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sassdoc = require('sassdoc');

//CSS dependencies
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('gulp-cssnano');

// Assets paths.
const paths = {
	css: './*.css',
	images: './images/originals/*',
	scss: './scss/**/*.scss',
	concat_scripts: ['./js/lib/*.js', './js/vendor/*.js'],
	scripts: ['./js/*.js', '!./js/*.min.js']
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

/**
 * Compile Sass.
 *
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/gulp-autoprefixer
 * https://www.npmjs.com/package/css-mqpacker
 * https://www.npmjs.com/package/gulp-cssnano
 */

gulp.task(
	'sass',
	gulp.series(function() {
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
				.pipe(
					postcss([
						autoprefixer(),
						mqpacker({
							sort: true
						})
					])
				)
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('./'))
		);
	})
);

/**
 * Minify and optimize style.css.
 *
 * https://www.npmjs.com/package/gulp-cssnano
 */
gulp.task(
	'minify',
	gulp.series(function() {
		log('Minify CSS files ' + new Date().toString());
		return gulp
			.src('./style.css')
			.pipe(plumber({ errorHandler: handleErrors }))
			.pipe(
				cssnano({
					safe: true // Use safe optimizations.
				})
			)
			.pipe(gulp.dest('./'));
	})
);

/**
 * Sass docs.
 *
 * http://sassdoc.com/getting-started/
 */
gulp.task('sassdoc', function() {
	let options = {
		dest: 'docs',
		verbose: true
	};

	return gulp.src('./scss/**/*.scss').pipe(sassdoc(options));
});

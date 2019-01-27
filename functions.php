<?php
/**
 * themename functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package themename
 */

 /**
 * Implement theme color palette
 */
require_once( __DIR__ . '/inc/color-palette.php');

/**
 * Add theme supports and default setttings
 */
require_once( __DIR__ . '/inc/theme-setup.php');

/**
 * All assets for theme
 */
require_once( __DIR__ . '/inc/enqueue-assets.php');

/**
 * Implement the Custom Header feature.
 */
require_once( __DIR__ . '/inc/custom-header.php');

/**
 * Custom template tags for this theme.
 */
require_once( __DIR__ . '/inc/template-tags.php');

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require_once( __DIR__ . '/inc/template-functions.php');

/**
 * Customizer additions.
 */
require_once( __DIR__ . '/inc/customizer.php');

/**
 * Set up block templates
 */
require_once( __DIR__ . '/inc/block-templates.php');

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require_once( __DIR__ . '/inc/jetpack.php');
}

<?php
/**
 * themename functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package themename
 */

 /**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/color-palette.php';

require get_template_directory() . '/inc/theme-setup.php';

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function themename_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'themename_content_width', 640 );
}
add_action( 'after_setup_theme', 'themename_content_width', 0 );

/**
 * Register Google Fonts
 */
function themename_fonts_url() {
	$fonts_url = '';

	/*
	 *Translators: If there are characters in your language that are not
	 * supported by Noto Serif, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$notoserif = esc_html_x( 'on', 'Noto Serif font: on or off', 'themename' );

	if ( 'off' !== $notoserif ) {
		$font_families = array();
		$font_families[] = 'Noto Serif:400,400italic,700,700italic';

		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);

		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
	}

	return $fonts_url;

}

/**
 * Enqueue scripts and styles.
 */
function themename_scripts() {
	wp_enqueue_style( 'themename-base-style', get_stylesheet_uri() );

	wp_enqueue_style( 'themename-blocks-style', get_template_directory_uri() . '/css/blocks.css' );

	wp_enqueue_style( 'themename-fonts', themename_fonts_url() );

	wp_enqueue_script( 'themename-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'themename-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'themename_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

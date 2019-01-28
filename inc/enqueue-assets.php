<?php
/**
 * Assets/Styles for this theme
 *
 * @package themename
 */

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
	wp_enqueue_style( 'themename-base-style', get_template_directory_uri() . '/css/style.min.css' );

	wp_enqueue_style( 'themename-fonts', themename_fonts_url() );

	wp_enqueue_script( 'themename-scripts', get_template_directory_uri() . '/js/theme.min.js', [ 'jquery' ], time(), true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'themename_scripts' );

/**
 * Enqueue block assets
 */
function themename_block_assets() {
	
	wp_enqueue_style(
		'themename-blocks-css',
		get_template_directory_uri() . '/css/blocks.min.css',
		[ 'themename-base-style' ],
        time() // Change for production
  );
  
  // wp_enqueue_script(
	// 	'gbtheming-blocks-js',
	// 	get_stylesheet_directory_uri() . '/js/blocks.js',
	// 	[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components' ],
	// 	time() // Change for production
	// );
}
add_action( 'enqueue_block_assets', 'themename_block_assets' );
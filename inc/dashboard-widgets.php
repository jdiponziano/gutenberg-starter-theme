<?php
/**
 * Add a widget to the dashboard.
 *
 * This function is hooked into the 'wp_dashboard_setup' action below.
 */
function themename_add_dashboard_widgets() {

	wp_add_dashboard_widget(
                 'themename_dashboard_widget',         // Widget slug.
                 'Name Dashboard Widget',         // Title.
                 'themename_dashboard_widget_function' // Display function.
        );	
}
add_action( 'wp_dashboard_setup', 'themename_add_dashboard_widgets' );

/**
 * Create the function to output the contents of our Dashboard Widget.
 */
function themename_dashboard_widget_function() {

	// Display whatever it is you want to show.
	echo "Hello World, I'm a great Dashboard Widget";
}
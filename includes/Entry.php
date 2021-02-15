<?php
namespace JiangkunQiu\WPR;

/**
 * @subpackage Widget
 */
class Entry {

    /**
     * Instance of this class.
     *
     * @since    1.0.0
     *
     * @var      object
     */
    protected static $instance = null;

    /**
     * Return an instance of this class.
     *
     * @since     1.0.0
     *
     * @return    object    A single instance of this class.
     */
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if ( null == self::$instance ) {
            self::$instance = new self;
            self::$instance->do_hooks();
        }

        return self::$instance;
    }


	public function __construct() {
		$plugin = Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
		$this->version = $plugin->get_plugin_version();

	}

    /**
     * Register and enqueue admin-specific style sheet.
     *
     * @since     1.0.0
     */
    public function enqueue_admin_styles() {

    }

    /**
     * Register and enqueue admin-specific javascript
     *
     * @since     1.0.0
     *
     */
    public function enqueue_wp_scripts() {
        // TODO check if the page contains content
        wp_enqueue_script( $this->plugin_slug . '-entry-script', plugins_url( 'assets/js/entry.js', dirname( __FILE__ ) ), array(), $this->version );
    }

	/**
	 * Outputs the content of the widget
	 *
	 */
	public function enqueue_wp_styles( ) {

	}

    /**
     * Handle WP actions and filters.
     *
     * @since 	1.0.0
     */
    private function do_hooks() {
        // Load admin style sheet and JavaScript.
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_wp_styles' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_wp_scripts' ) );

    }

}

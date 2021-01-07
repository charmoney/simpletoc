<?php
/**
 * Plugin Name: SimpleTOC - Table of Contents Block
 * Plugin URI: https://github.com/mtoensing/simpletoc
 * Description: Adds a basic "Table of Contents" Gutenberg block.
 * Version: 3.7
 * Author: MarcDK
 * Author URI: https://marc.tv
 * Text Domain: simpletoc
 * Domain Path: /languages
 * License: GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace SimpleTOC;

defined('ABSPATH') || exit;

/**
  * Initalise frontend and backend and register block
**/
add_action('init', __NAMESPACE__ . '\\init');
add_action('init', __NAMESPACE__ . '\\register_block');

/**
 * Filter to add plugins to the TOC list for Rank Math plugin
 *
 * @param array TOC plugins.
 */
add_filter( 'rank_math/researches/toc_plugins', function( $toc_plugins ) {
    $toc_plugins['simpletoc/plugin.php'] = 'SimpleTOC';
    return $toc_plugins;
});


/* Init SimpleTOC */
function init() {
    wp_register_script(
      'simpletoc-js',
      plugins_url('build/index.js', __FILE__),
      [ 'wp-i18n', 'wp-blocks', 'wp-editor', 'wp-element', 'wp-server-side-render'],
      filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    add_filter('plugin_row_meta', __NAMESPACE__ . '\\simpletoc_plugin_meta', 10, 2);

    wp_register_style(
      'simpletoc-editor',
      plugins_url('editor.css', __FILE__),
      array( 'wp-edit-blocks' ),
      filemtime(plugin_dir_path(__FILE__) . 'editor.css')
    );

    wp_set_script_translations('simpletoc-js', 'simpletoc');
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 */

function register_block() {
    if (! function_exists('register_block_type')) {
        // Gutenberg is not active.
        return;
    }

    register_block_type('simpletoc/toc', [
    'editor_script' => 'simpletoc-js',
    'editor_style' => 'simpletoc-editor',
        'attributes' => array(
        		'no_title' => array(
        			'type' => 'boolean',
              'default' => false,
        		),
            'updated' => array(
              'type' => 'number',
              'default' => 0,
              '_builtIn' => true,
            ),
    ),
    'render_callback' => __NAMESPACE__ . '\\render_callback'
   ]);
}

function render_callback($attributes, $content) {
    //add only if block is used in this post.
    add_filter('render_block', __NAMESPACE__ . '\\filter_block', 10, 2);

    $post = get_post();
    $blocks = parse_blocks($post->post_content);

    if (empty($blocks)) {
      $html = '';
      if($attributes['no_title'] == false) {
        $html = '<h2 class="simpletoc-title">' . __('Table of Contents', 'simpletoc') . '</h2>';
      }
      $html .= '<p class="components-notice is-warning">' . __('No blocks found.', 'simpletoc')  . ' ' . __('Save or update post first.', 'simpletoc') . '</p>';
      return $html;
    }

    $headings = array_values(array_filter($blocks, function ($block) {
      return $block['blockName'] === 'core/heading';
    }));

    if (empty($headings)) {
      $html = '';
      if($attributes['no_title'] == false) {
        $html = '<h2 class="simpletoc-title">' . __('Table of Contents', 'simpletoc') . '</h2>';
      }
      $html .= '<p class="components-notice is-warning">' . __('No headings found.', 'simpletoc') . ' ' . __('Save or update post first.', 'simpletoc') . '</p>';
      return $html;
		}

    $heading_contents = array_column($headings, 'innerHTML');

    foreach ($heading_contents as  $key => & $heading) {
        $heading = trim($heading);
    }

    $output = generateToc($heading_contents,$attributes);

    if(isset($attributes['className'])){
      $className = strip_tags(htmlspecialchars($attributes['className']));
      $pre_html = '<div class="' . $className . '">';
      $post_html = '</div>';
      $output = $pre_html . $output . $post_html;
    }

    return $output;
}

function simpletoc_sanitize_string($string){
  $string_without_accents = remove_accents($string);
  $string_only_letters_numbers_and_whitepace = preg_replace("/[^a-zA-Z0-9\s]/", "", $string_without_accents);
  $sanitized_string = sanitize_title_with_dashes($string_only_letters_numbers_and_whitepace);
  return $sanitized_string;
}

function simpletoc_plugin_meta( $links, $file ) {

  if ( false !== strpos( $file, 'simpletoc' ) ) {
    $links = array_merge( $links, array( '<a href="https://wordpress.org/support/plugin/simpletoc">' . __( 'Support', 'simpletoc' ) . '</a>' ) );
    $links = array_merge( $links, array( '<a href="https://marc.tv/out/donate">' . __( 'Donate', 'simpletoc' ) . '</a>' ) );
    $links = array_merge( $links, array( '<a href="https://wordpress.org/support/plugin/simpletoc/reviews/#new-post">' . __( 'Write a Review', 'simpletoc' ) . '&nbsp;⭐️⭐️⭐️⭐️⭐️</a>' ) );
  }

  return $links;
}



function addAnchorAttribute($html){

    $dom = new \DOMDocument();
    $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

    // Evaluate P tags in HTML. This just shows
    // that you can be more selective on your tags
    $xpath = new \DOMXPath($dom);
    $tags = $xpath->evaluate("//*[self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6]");

    // Loop through all the found tags
    foreach ($tags as $tag) {

        // Set id attribute
        $heading_text = strip_tags($html);
        $anchor= simpletoc_sanitize_string($heading_text);
        $tag->setAttribute("id", $anchor);
    }

    // Save the HTML changes
    $content = utf8_decode($dom->saveHTML($dom->documentElement));

    return $content;
}

function filter_block($block_content, $block) {
    $className = '';

    if ($block['blockName'] !== 'core/heading') {
        return $block_content;
    }

    $block_content = addAnchorAttribute($block_content);

    return $block_content;
}

function generateToc($matches,$attributes) {
    /*  code from https://github.com/shazahm1/Easy-Table-of-Contents */
    $list ='';
    $current_depth      = 7;
    $numbered_items     = array();

    // find the minimum heading to establish our baseline
    //for ( $i = 0; $i < count( $matches ); $i ++ ) {
    foreach ($matches as $i => $match) {
        if ($current_depth > $matches[ $i ][2]) {
            $current_depth = (int) $matches[ $i ][2];
        }
    }

    $numbered_items[ $current_depth ] = 0;

    foreach ($matches as $i => $match) {

        $level = $matches[ $i ][2];
        $count = $i + 1;

        if ($current_depth == (int) $matches[ $i ][2]) {
            $list .= '<li>';
        }

        // start lists
        if ($current_depth != (int) $matches[ $i ][2]) {
            for ($current_depth; $current_depth < (int) $matches[ $i ][2]; $current_depth++) {
                $numbered_items[ $current_depth + 1 ] = 0;
                $list .= '<ul><li>';
            }
        }

        $title = strip_tags($match);
        $link = simpletoc_sanitize_string( $title );
        $list .= '<a href="#' . $link . '">' . $title . '</a>';

        // end lists
        if ($i != count($matches) - 1) {
            if ($current_depth > (int) $matches[ $i + 1 ][2]) {
                for ($current_depth; $current_depth > (int) $matches[ $i + 1 ][2]; $current_depth--) {
                    $list .= '</li></ul>';
                    $numbered_items[ $current_depth ] = 0;
                }
            }

            if ($current_depth == (int) @$matches[ $i + 1 ][2]) {
                $list .= '</li>';
            }
        // last heading
        } else {

          // traverse heading in reverse from bottom to top
          for (end($matches); ($currentKey=key($matches))!==null; prev($matches)){

            // make sure it is not the first heading
            if( $currentKey != 0 ) {
                $current_depth = $matches[ $currentKey ][2];
                $prevdepth = $matches[ $currentKey - 1 ][2];

                // is current heading level higher than previous?
                if( $current_depth > $prevdepth ) {
                  $list .= '</li></ul>';
                }
            }

          }

        }
    }

    $html = '';
    if($attributes['no_title'] == false) {
      $html = '<h2 class="simpletoc-title">' . __('Table of Contents', 'simpletoc') . '</h2>';
    }
    $html .= '<ul class="simpletoc">' . $list . "</li></ul>";
    return $html;
}

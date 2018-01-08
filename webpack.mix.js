const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js( [
    'resources/assets/js/lang/en.js', 
    'resources/assets/js/utils/notifications.js',
    'resources/assets/js/services/server.js',
  ],
  'public/js/admin.js'
  );

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

//Styles theme
mix.styles([
      'resources/assets/template/global/css/bootstrap.css',
      'resources/assets/template/global/css/bootstrap-extend.css',
      'resources/assets/template/global/css/site.css',
      'resources/assets/template/global/vendor/animsition/animsition.css',
      'resources/assets/template/global/vendor/asscrollable/asScrollable.css',
      'resources/assets/template/global/vendor/switchery/switchery.css',
      'resources/assets/template/global/vendor/intro-js/introjs.css',
      'resources/assets/template/global/vendor/slidepanel/slidePanel.css',
      'resources/assets/template/global/vendor/flag-icon-css/flag-icon.css',
      'resources/assets/template/global/fonts/web-icons/web-icons.css',
      'resources/assets/template/global/fonts/brand-icons/brand-icons.css',

      'resources/assets/template/global/vendor/toastr/toastr.css',
      'resources/assets/template/global/vendor/toolbar/jquery.toolbar.css',
      'resources/assets/template/global/css/work.css',
      'resources/assets/template/global/vendor/toolbar/toolbar.css',
      'resources/assets/template/global/vendor/ascolopicker/asColorPicker.css',
      'resources/assets/template/global/vendor/prism/prism.css',
      ], 
      'public/css/theme.css');


//Mix theme scripts
mix.scripts([ 
  'resources/assets/template/global/vendor/breakpoints/breakpoints.js',
   ], 
  'public/js/breakpoints.js');



mix.scripts([ 
  'resources/assets/template/global/vendor/babel-external-helpers/babel-external-helpers.js',
  'resources/assets/template/global/vendor/jquery/jquery.js',
  'resources/assets/template/global/vendor/tether/tether.js',
  'resources/assets/template/global/vendor/bootstrap/bootstrap.js',
  'resources/assets/template/global/vendor/animsition/animsition.js',
  'resources/assets/template/global/vendor/mousewheel/jquery.mousewheel.js',
  'resources/assets/template/global/vendor/asscrollbar/jquery-asScrollbar.js',
  'resources/assets/template/global/vendor/asscrollable/jquery-asScrollable.js',
  //'resources/assets/template/global/vendor/asscrollable/jquery-asScrollable.es.js',
  //'resources/assets/template/global/vendor/ashoverscroll/jquery-asHoverScroll.js',

  'resources/assets/template/global/vendor/switchery/switchery.min.js',
  'resources/assets/template/global/vendor/intro-js/intro.js',
  'resources/assets/template/global/vendor/screenfull/screenfull.js',
  'resources/assets/template/global/vendor/slidepanel/jquery-slidePanel.js',
  'resources/assets/template/global/vendor/toastr/toastr.js',
  'resources/assets/template/global/vendor/toolbar/jquery.toolbar.js',
  'resources/assets/template/global/vendor/prism/prism.js',
  //'resources/assets/template/global/vendor/ascolor/jjquery-asColor.min.js', 
  //'resources/assets/template/global/vendor/asgradient/jquery-asGradient.min.js', 
  //'resources/assets/template/global/vendor/ascolopicker/jquery-asColorPicker.js', 

   ], 
  'public/js/theme.js');

	mix.scripts([
			'resources/assets/template/global/js/State.js',
		  'resources/assets/template/global/js/Component.js',
		  'resources/assets/template/global/js/Plugin.js',
		  'resources/assets/template/global/js/Base.js',
		  'resources/assets/template/global/js/Config.js',


		  'resources/assets/template/global/js/Section/Menubar.js',
		  'resources/assets/template/global/js/Section/Sidebar.js',
		  'resources/assets/template/global/js/Section/PageAside.js',
		  'resources/assets/template/global/js/Plugin/menu.js',



		  'resources/assets/template/global/js/Site.js',

		  'resources/assets/template/global/js/Plugin/asscrollable.js',
		  'resources/assets/template/global/js/Plugin/slidepanel.js',
		  'resources/assets/template/global/js/Plugin/toolbar.js' ,
      //'resources/assets/template/global/js/Plugin/ascolorpicker.js',
		],
		'public/js/core.js'
	);






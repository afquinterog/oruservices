<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
  <meta name="description" content="MkitDigital">
  <meta name="author" content="MkitDigital">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name') }}</title>

  <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
  <link rel="shortcut icon" href="assets/images/favicon.ico">

  <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
  <!--[if lt IE 9]>
    <script src="../../../global/vendor/html5shiv/html5shiv.min.js"></script>
    <![endif]-->
  <!--[if lt IE 10]>
    <script src="../../../global/vendor/media-match/media.match.min.js"></script>
    <script src="../../../global/vendor/respond/respond.min.js"></script>
    <![endif]-->
  <!-- Scripts -->

  <link rel="stylesheet" href="/css/theme.css">

  <script src="/js/breakpoints.js"></script>
  <script>
  Breakpoints();
  </script>

  <!-- Init Scripts -->
  <script>
      window.Laravel = <?php echo json_encode([
          'csrfToken' => csrf_token(),
      ]); ?>
  </script>
  <!-- End Init Scripts -->

</head>
<body class="animsition site-navbar-small " >


  <div id="vue-app" style="height: 100%"> 



    <!--[if lt IE 8]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->

    @component('partials.topmenu') 

    @endcomponent
     
    @component('partials.appmenu')

    @endcomponent



    <!-- Page -->
      <div class="page" >
        @yield('content')
      </div>
    <!-- End Page -->


    @component('partials.footer')
    @endcomponent



  </div>


  <script src="/js/theme.js"></script>
  <script src="/js/core.js"></script>

  <script src="/js/admin.js"></script>
  <script src="/js/app.js"></script>

  <script>
  //Config.set('assets', '/assets');
  </script>

  <script>
  (function(document, window, $) {
    'use strict';
    var Site = window.Site;
    $(document).ready(function() {
      Site.run();
    });
  })(document, window, jQuery);
  </script>
</body>
</html>
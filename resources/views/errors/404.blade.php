@extends('layouts.error')


@section('content')


<!-- Page -->
  <div class="page vertical-align text-xs-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle">
      <header>
        <h1 class="animation-slide-top">404</h1>
        <p>Page Not Found !</p>
      </header>
      <p class="error-advise">WE CAN'T FIND THE PAGE YOU ARE TRYING TO REACH</p>
      <a class="btn btn-primary btn-round" href="/">GO TO HOME PAGE</a>
      <footer class="page-copyright">
        <p>MkitServerApp</p>
        <p>© 2017.</p>
       {{--  <div class="social">
          <a href="javascript:void(0)">
            <i class="icon bd-twitter" aria-hidden="true"></i>
          </a>
          <a href="javascript:void(0)">
            <i class="icon bd-facebook" aria-hidden="true"></i>
          </a>
          <a href="javascript:void(0)">
            <i class="icon bd-dribbble" aria-hidden="true"></i>
          </a>
        </div> --}}
      </footer>
    </div>
  </div>
  <!-- End Page -->

  @endsection
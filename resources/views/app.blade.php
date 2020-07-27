<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Mạng xã hội Video | SClip</title>
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="{{ asset('font-awesome/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/sclip.css') }}" rel="stylesheet" id="SCLIP_THEME">
</head>
<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="__root__" class="sclip_root"></div>

    <script src="{{ asset('js/app.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <!-- <script src="{{ asset('js/bootstrap.min.js') }}"></script> -->
    <script src="{{ asset('js/sclip.js') }}"></script>
    <script>
        $(document).ready(function(){
            $(window).bind('scroll', function(e) {
                e.preventDefault();
                var navHeight = $(window).height() - 70;
                if ($(window).scrollTop() > 60) {
                    $('#header').addClass('--sclip--header-fixed');
                    $("#header li").each(function() {
                        $(this).css('transform', 'translateX(0px)')
                    });
                    $('._base_layout_aside_sticky').css({'position': 'fixed', 'top': '100px'});
                }
                else {
                    $('#header').removeClass('--sclip--header-fixed');
                    $("#header li").each(function() {
                        $(this).removeAttr('style')
                    });
                    $('._base_layout_aside_sticky').removeAttr('style')
                }
            });

            function addCss(path) {
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", path);
                fileref.setAttribute("id", "SCLIP_THEME");
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        });
    </script>
</body>
</html>

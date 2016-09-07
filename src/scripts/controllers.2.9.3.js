/*
http://www.quirksmode.org/js/cookies.html
Note to self: angularize this later.
*/

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function isElementVisible(element){

var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}

var app = angular.module('app', []);

app.controller('AppCtrl', ['$scope', '$http', '$sce',
  function ($scope, $http, $sce) {

  angular.element(document).ready(function () {
    $.fn.isOnScreen = function(x, y){
      if(x == null || typeof x == 'undefined') x = 1;
      if(y == null || typeof y == 'undefined') y = 1;
      var win = $(window);
      var viewport = {
          top : win.scrollTop(),
          left : win.scrollLeft()
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
      var height = this.outerHeight();
      var width = this.outerWidth();
      if(!width || !height){
          return false;
      }
      var bounds = this.offset();
      bounds.right = bounds.left + width;
      bounds.bottom = bounds.top + height;
      var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

      if(!visible){
          return false;
      }
      var deltas = {
          top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
          bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
          left : Math.min(1, ( bounds.right - viewport.left ) / width),
          right : Math.min(1, ( viewport.right - bounds.left ) / width)
      };
      return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
    };

    var $styleLabel = $('a[goto="style"] > span.label'),
        $networksLabel = $('a[goto="networks"] > span.label'),
        $infoLabel = $('a[goto="info"] > span.label'),
        $previewLabel = $('a[goto="preview"] > span.label'),
        $codeLabel = $('a[goto="code"] > span.label'),
        $styleSection = $('section#style'),
        $networksSection = $('section#networks'),
        $infoSection = $('section#info'),
        $previewSection = $('section#preview'),
        $codeSection = $('section#code'),
        $introSection = $('section#intro'),
        $aboutSection = $('section#about'),
        $backToTop = $('a.back-to-top');

      $(window).scroll(function() {
        //$('.highlighted').removeClass('highlighted');

        if (document.body.scrollTop > (screen.height/2)){
          $backToTop.addClass('back-to-top-visible');
          $backToTop.removeClass('back-to-top-hidden');
        }
        else{
          $backToTop.removeClass('back-to-top-visible');
          $backToTop.addClass('back-to-top-hidden');          
        }

        if ($styleSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          $styleLabel.addClass('highlighted');
          if (history.replaceState) {
            history.replaceState(null, null, '#style');
          }
        }

        if ($networksSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          $networksLabel.addClass('highlighted');          
          if (history.replaceState) {
            history.replaceState(null, null, '#networks');
          }
        }

        if ($infoSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          $infoLabel.addClass('highlighted');          
          if (history.replaceState) {
            history.replaceState(null, null, '#info');
          }
        }

        if ($previewSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          $previewLabel.addClass('highlighted');          
          if (history.replaceState) {
            history.replaceState(null, null, '#preview');
          }
        }

        if ($codeSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          $codeLabel.addClass('highlighted');          
          if (history.replaceState) {
            history.replaceState(null, null, '#code');
          }
        }

        if ($introSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          if (history.replaceState) {
            history.replaceState(null, null, '#intro');
          }
        }

        if ($aboutSection.isOnScreen(0.5, 0.5)){
          $('.highlighted').removeClass('highlighted');
          if (history.replaceState) {
            history.replaceState(null, null, '#about');
          }
        }
      });

      $('.shifted').each(function(index){
        var $this = $(this);
        setTimeout(function(){
          $this.removeClass("shifted").addClass('unshifted');
        }, index * 50);
      });

      $('.shifted-icons').each(function(index){
        var $this = $(this);
        setTimeout(function(){
          $this.removeClass("shifted-icons").addClass('unshifted');
        }, index * 75);
      });


      if (document.body.scrollTop < 100){
        setTimeout(function(){
          $('.shifted-reverse').each(function(index){
            var $this = $(this);
            setTimeout(function(){
              $this.removeClass("shifted-reverse").addClass('unshifted');
            }, index * 25);       
          });        
        }, 700);
      }
      else{
        $('.shifted-reverse').each(function(index){
          var $this = $(this);
          $this.removeClass("shifted-reverse").attr('opacity', 1);

        });
      }
    });

    $scope.nightmode = false;

    var nightmodeCookie = readCookie('nightmode');
    if (window.location.hash == '#nightmode' || nightmodeCookie == 'on'){
      createCookie('nightmode', 'on', 365);
      $scope.nightmode = !$scope.nightmode;
      if(!$scope.$$phase) {
        $scope.$apply();
      }
      $("*").addClass("night");
    }

    $scope.style = 'color';
    $scope.format = 'png';
    $scope.icon_path = 'flat-web-icon-set/color';
    $scope.magic_icon = 'fa fa-magic';

    $scope.mode = 'nojs';

    $scope.facebook = false;
    $scope.twitter = false;
    $scope.google_plus = false;
    $scope.tumblr = false;
    $scope.pinterest = false;
    $scope.pocket = false;
    $scope.reddit = false;
    $scope.linkedin = false;
    $scope.wordpress = false;
    $scope.pinboard = false;
    $scope.email = false;

    $scope.allnetworks = false;

    $scope.url = '';
    $scope.title = '';
    $scope.description = '';
    $scope.twitter_handle = '';
    $scope.preview_image_url = '';
    $scope.preview_image_thumbnail = '/images/1px.png';

    $scope.show_jsmode_instructions = false;
    $scope.show_phpmode_instructions = false;

    $scope.html = '';
    $scope.preview_html = '';
    $scope.original_css = 'ul.share-buttons{\n  list-style: none;\n  padding: 0;\n}\n\nul.share-buttons li{\n  display: inline;\n}\n\nul.share-buttons .sr-only {\n  position: absolute;\n  clip: rect(1px 1px 1px 1px);\n  clip: rect(1px, 1px, 1px, 1px);\n  padding: 0;\n  border: 0;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n}';
    $scope.css = $scope.original_css;

    $scope.show_download = true;
    $scope.download_url = "color.zip";

    $scope.$watchCollection('[style, mode, facebook, twitter, google_plus, tumblr, pinterest, pocket, reddit, linkedin, wordpress, pinboard, email, url, title, description, twitter_handle, preview_image_url]', function(newValues, oldValues){

    if ($scope.preview_image_url.length > 5){
      $scope.preview_image_thumbnail = $scope.preview_image_url;
    }
    else{
      $scope.preview_image_thumbnail = '/images/1px.png';
    }

    if ($scope.url.length > 0 && $scope.url.indexOf('http://') == -1 && $scope.url.indexOf('https://') == -1){
      $scope.url = "http://" + $scope.url;
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    }

    switch ($scope.mode){
      case 'nojs':
        $scope.show_jsmode_instructions = false;
        $scope.show_phpmode_instructions = false;
      break;
      case 'js':
        $scope.show_jsmode_instructions = true;
        $scope.show_phpmode_instructions = false;
      break;
      case 'php':
        $scope.show_jsmode_instructions = false;
        $scope.show_phpmode_instructions = true;
      break;
    }
    $scope.apply;

    if ($scope.twitter_handle != ''){
      if ($scope.twitter_handle.charAt(0) == '@'){
        $scope.twitter_handle = $scope.twitter_handle.substr(1);
        $scope.apply;
      }
      $scope.html += '&via='+ $scope.twitter_handle;
    }

    switch($scope.style){
      case "color":
        $scope.icon_path = "flat_web_icon_set/color";
        $scope.preview_code = '';
      break;
      case "black":
        $scope.icon_path = "flat_web_icon_set/black";
        $scope.preview_code = '';
      break;
      case "inverted":    
        $scope.icon_path = "flat_web_icon_set/inverted";
        $scope.preview_code = '';
      break;
      case "simple_icons":
        $scope.icon_path = "simple_icons";
        $scope.preview_code = '';
      break;
      case "simple_icons_black":
        $scope.icon_path = "simple_icons_black";
        $scope.preview_code = '';
      break;
      case "font_awesome":
        $scope.icon_path = "font_awesome";
        $scope.preview_code = '';
      break;
      case "social_flat_rounded_rects_svg":
        $scope.icon_path = "social_flat_rounded_rects_svg";
        $scope.preview_code = '';
      break;
      case "none":
        $scope.icon_path = "none";
        $scope.preview_code = '';
      break;
    }

    switch ($scope.style){
      case "font_awesome":
        $scope.show_download = false;
        $scope.show_fa_instructions = true;
        $scope.show_nostyle_instructions = false;
      break;
      case "none":
        $scope.show_download = false;
        $scope.show_fa_instructions = false;
        $scope.show_nostyle_instructions = true;
      break;
      default:
        $scope.show_download = true;
        $scope.show_fa_instructions = false;
        $scope.show_nostyle_instructions = false;
      break;
    }

    if ($scope.style == "font_awesome" || $scope.style == "none"){
      $scope.show_download = false;
    }
    else{
      $scope.show_download = true;      
    }

    var format = 'png';
    switch ($scope.style){
      case 'social_flat_rounded_rects_svg':
        $scope.format = 'svg';
        $scope.css = $scope.original_css + '\n\nul.share-buttons img{\n  width: 32px;\n}';

      break;
      default:
        $scope.format = 'png';
        $scope.css = $scope.original_css;
      break;
    }

    $scope.html = '<ul class="share-buttons">\n';

    if (!$scope.facebook){
      $scope.show_fb_instructions = false;
    }
    else{
      $scope.show_fb_instructions = true;
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" target="_blank" title="Share on Facebook"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on Facebook</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" target="_blank" title="Share on Facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on Facebook</span></a></li>\n';
            break;
            case 'php':
              $scope.html += '  echo \'<li><a href=\"https://www.facebook.com/sharer/sharer.php?u=http\' . (isset($_SERVER[\"HTTPS\"]) ? \'s\' : \'\') . \'://\' . $_SERVER[\"HTTP_HOST\"] . \'/\' . $_SERVER[\"REQUEST_URI\"] . \'&t=' +  encodeURIComponent($scope.title.trim()) +'\" target=\"_blank\" title=\"Share on Facebook\"><i class=\"fa fa-facebook-square fa-2x\"></i></a></li>\';\n';
            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" target="_blank" title="Share on Facebook">Facebook</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" target="_blank" title="Share on Facebook" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' + encodeURIComponent(document.URL)); return false;">Facebook</a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" title="Share on Facebook" target="_blank"><img alt="Share on Facebook" src="images/' + $scope.icon_path + '/Facebook.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' +  encodeURIComponent($scope.title.trim()) +'" title="Share on Facebook" target="_blank" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' + encodeURIComponent(document.URL)); return false;"><img alt="Share on Facebook" src="images/' + $scope.icon_path + '/Facebook.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
      }
    }

    if ($scope.twitter){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());
              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }
              $scope.html += '" target="_blank" title="Tweet"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i><span class="sr-only">Tweet</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());
              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }
              $scope.html += '" target="_blank" title="Tweet" onclick="window.open(\'https://twitter.com/intent/tweet?text=\' + encodeURIComponent(document.title) + \':%20\' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i><span class="sr-only">Tweet</span></a></li>\n';
            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());
              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }
              $scope.html += '" target="_blank" title="Tweet">Twitter</a></li>\n';        
            break;
            case 'js':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());
              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }
              $scope.html += '" target="_blank" title="Tweet" onclick="window.open(\'https://twitter.com/intent/tweet?text=\' + encodeURIComponent(document.title) + \':%20\'  + encodeURIComponent(document.URL)); return false;">Twitter</a></li>\n';       
            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());

              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }

              $scope.html += '" target="_blank" title="Tweet"><img alt="Tweet" src="images/' + $scope.icon_path + '/Twitter.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://twitter.com/intent/tweet?source=' + encodeURIComponent($scope.url.trim()) + '&text='+ encodeURIComponent($scope.title.trim()) + ':%20' + encodeURIComponent($scope.url.trim());

              if ($scope.twitter_handle != ''){
                $scope.html += '&via='+ $scope.twitter_handle;
              }

              $scope.html += '" target="_blank" title="Tweet" onclick="window.open(\'https://twitter.com/intent/tweet?text=\' + encodeURIComponent(document.title) + \':%20\'  + encodeURIComponent(document.URL)); return false;"><img alt="Tweet" src="images/' + $scope.icon_path + '/Twitter.' + $scope.format + '"></a></li>\n';
            break;
          }
        break;
      }
    }

    if ($scope.google_plus){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+"><i class="fa fa-google-plus-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on Google+</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+" onclick="window.open(\'https://plus.google.com/share?url=\' + encodeURIComponent(document.URL)); return false;"><i class="fa fa-google-plus-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on Google+</span></a></li>\n';
            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+">Google+</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+" onclick="window.open(\'https://plus.google.com/share?url=\' + encodeURIComponent(document.URL)); return false;">Google+</a></li>\n';
            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+"><img alt="Share on Google+" src="images/' + $scope.icon_path + '/Google+.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://plus.google.com/share?url=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on Google+" onclick="window.open(\'https://plus.google.com/share?url=\' + encodeURIComponent(document.URL)); return false;"><img alt="Share on Google+" src="images/' + $scope.icon_path + '/Google+.' + $scope.format + '"></a></li>\n';
            break;
          }
        break;
      }
    }

    if ($scope.tumblr){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr"><i class="fa fa-tumblr-square fa-2x" aria-hidden="true"></i><span class="sr-only">Post to Tumblr</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr" onclick="window.open(\'http://www.tumblr.com/share?v=3&u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;"><i class="fa fa-tumblr-square fa-2x" aria-hidden="true"></i><span class="sr-only">Post to Tumblr</span></a></li>\n';
            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr">Tumblr</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr" onclick="window.open(\'http://www.tumblr.com/share?v=3&u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;">Tumblr</a></li>\n';
            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr"><img alt="Post to Tumblr" src="images/' + $scope.icon_path + '/Tumblr.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=" target="_blank" title="Post to Tumblr" onclick="window.open(\'http://www.tumblr.com/share?v=3&u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;"><img alt="Post to Tumblr" src="images/' + $scope.icon_path + '/Tumblr.' + $scope.format + '"></a></li>\n';
            break;
          }
        break;
      }
    }

    if ($scope.pinterest){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());

              if ($scope.preview_image_url != ''){
                $scope.html += '&media=' + $scope.preview_image_url;
              }

              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it"><i class="fa fa-pinterest-square fa-2x" aria-hidden="true"></i><span class="sr-only">Pin it</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());
              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it" onclick="window.open(\'http://pinterest.com/pin/create/button/?url=\' + encodeURIComponent(document.URL) + \'&description=\' +  encodeURIComponent(document.title)); return false;"><i class="fa fa-pinterest-square fa-2x" aria-hidden="true"></i><span class="sr-only">Pin it</span></a></li>\n';
            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());

              if ($scope.preview_image_url != ''){
                $scope.html += '&media=' + $scope.preview_image_url;
              }

              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it">Pinterest</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());
              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it" onclick="window.open(\'http://pinterest.com/pin/create/button/?url=\' + encodeURIComponent(document.URL) + \'&description=\' +  encodeURIComponent(document.title)); return false;">Pinterest</a></li>\n';
            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());
              if ($scope.preview_image_url != ''){
                $scope.html += '&media=' + $scope.preview_image_url;
              }
              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it"><img alt="Pin it" src="images/' + $scope.icon_path + '/Pinterest.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://pinterest.com/pin/create/button/?url=' + encodeURIComponent($scope.url.trim());
              $scope.html += '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Pin it" onclick="window.open(\'http://pinterest.com/pin/create/button/?url=\' + encodeURIComponent(document.URL) + \'&description=\' +  encodeURIComponent(document.title)); return false;"><img alt="Pin it" src="images/' + $scope.icon_path + '/Pinterest.' + $scope.format + '"></a></li>\n';
            break;
          }
        break;
      }
    }

    if ($scope.pocket){
      switch($scope.style){
        case "font_awesome":
        /* NOT YET SUPPORTED

          switch ($scope.mode){
            case 'nojs':
            break;
            case 'js':

            break;
//            case 'php':
//            break;
          }

          $scope.html += '  <li><a href="https://getpocket.com/save?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Add to Pocket"><i class="fa fa-pocket-square fa-2x" aria-hidden="true"></i><span class="sr-only">Add to Pocket</span></a></li>\n';
        */
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://getpocket.com/save?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Add to Pocket">Pocket</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://getpocket.com/save?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Add to Pocket" onclick="window.open(\'https://getpocket.com/save?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;">Pocket</a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://getpocket.com/save?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Add to Pocket"><img alt="Add to Pocket" src="images/' + $scope.icon_path + '/Pocket.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://getpocket.com/save?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Add to Pocket" onclick="window.open(\'https://getpocket.com/save?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><img alt="Add to Pocket" src="images/' + $scope.icon_path + '/Pocket.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
      }
    }

    if ($scope.reddit){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit"><i class="fa fa-reddit-square fa-2x" aria-hidden="true"></i><span class="sr-only">Submit to Reddit</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit" onclick="window.open(\'http://www.reddit.com/submit?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><i class="fa fa-reddit-square fa-2x" aria-hidden="true"></i><span class="sr-only">Submit to Reddit</span></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit">Reddit</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit" onclick="window.open(\'http://www.reddit.com/submit?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;">Reddit</a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit"><img alt="Submit to Reddit" src="images/' + $scope.icon_path + '/Reddit.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.reddit.com/submit?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '" target="_blank" title="Submit to Reddit" onclick="window.open(\'http://www.reddit.com/submit?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><img alt="Submit to Reddit" src="images/' + $scope.icon_path + '/Reddit.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
      }
    }

    if ($scope.linkedin){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on LinkedIn</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn" onclick="window.open(\'http://www.linkedin.com/shareArticle?mini=true&url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><i class="fa fa-linkedin-square fa-2x" aria-hidden="true"></i><span class="sr-only">Share on LinkedIn</span></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn">LinkedIn</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn" onclick="window.open(\'http://www.linkedin.com/shareArticle?mini=true&url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;">LinkedIn</a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn"><img alt="Share on LinkedIn" src="images/' + $scope.icon_path + '/LinkedIn.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&summary=' + encodeURIComponent($scope.description.trim()) + '&source=' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Share on LinkedIn" onclick="window.open(\'http://www.linkedin.com/shareArticle?mini=true&url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><img alt="Share on LinkedIn" src="images/' + $scope.icon_path + '/LinkedIn.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
      }
    }

    if ($scope.wordpress){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());

              if ($scope.preview_image_url != ''){
                $scope.html += '&i=' + $scope.preview_image_url;
              }

              $scope.html += '" target="_blank" title="Publish on WordPress"><i class="fa fa-wordpress fa-2x" aria-hidden="true"></i><span class="sr-only">Publish on WordPress</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());
              $scope.html += '" target="_blank" title="Publish on WordPress" onclick="window.open(\'http://wordpress.com/press-this.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;"><i class="fa fa-wordpress fa-2x" aria-hidden="true"></i><span class="sr-only">Publish on WordPress</span></a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());

              if ($scope.preview_image_url != ''){
                $scope.html += '&i=' + $scope.preview_image_url;
              }

              $scope.html += '" target="_blank" title="Publish on WordPress">WordPress</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());
              $scope.html += '" target="_blank" title="Publish on WordPress" onclick="window.open(\'http://wordpress.com/press-this.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;">WordPress</a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());

              if ($scope.preview_image_url != ''){
                $scope.html += '&i=' + $scope.preview_image_url;
              }

              $scope.html += '" target="_blank" title="Publish on WordPress"><img alt="Publish on WordPress" src="images/' + $scope.icon_path + '/Wordpress.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="http://wordpress.com/press-this.php?u=' + encodeURIComponent($scope.url.trim()) + '&t=' + encodeURIComponent($scope.title.trim()) + '&s=' + encodeURIComponent($scope.description.trim());
              $scope.html += '" target="_blank" title="Publish on WordPress" onclick="window.open(\'http://wordpress.com/press-this.php?u=\' + encodeURIComponent(document.URL) + \'&t=\' +  encodeURIComponent(document.title)); return false;"><img alt="Publish on WordPress" src="images/' + $scope.icon_path + '/Wordpress.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
      }
    }

    if ($scope.pinboard){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              /* NOT SUPPORTED
                $scope.html += '  <li><a href="https://pinboard.in/popup_login/?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Save to Pinboard"><i class="fa fa-pinboard-square fa-2x" aria-hidden="true"></i><span class="sr-only">Save to Pinboard</span></a></li>\n';
              */
            break;
            case 'js':

            break;
//            case 'php':
//            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://pinboard.in/popup_login/?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Save to Pinboard">Pinboard</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://pinboard.in/popup_login/?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Save to Pinboard" onclick="window.open(\'https://pinboard.in/popup_login/?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;">Pinboard</a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="https://pinboard.in/popup_login/?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Save to Pinboard"><img alt="Save to Pinboard" src="images/' + $scope.icon_path + '/Pinboard.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="https://pinboard.in/popup_login/?url=' + encodeURIComponent($scope.url.trim()) + '&title=' + encodeURIComponent($scope.title.trim()) + '&description=' + encodeURIComponent($scope.description.trim()) + '" target="_blank" title="Save to Pinboard" onclick="window.open(\'https://pinboard.in/popup_login/?url=\' + encodeURIComponent(document.URL) + \'&title=\' +  encodeURIComponent(document.title)); return false;"><img alt="Save to Pinboard" src="images/' + $scope.icon_path + '/Pinboard.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }       
        break;
      }
    }

    if ($scope.email){
      switch($scope.style){
        case "font_awesome":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email"><i class="fa fa-envelope-square fa-2x" aria-hidden="true"></i><span class="sr-only">Send email</span></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email" onclick="window.open(\'mailto:?subject=\' + encodeURIComponent(document.title) + \'&body=\' +  encodeURIComponent(document.URL)); return false;"><i class="fa fa-envelope-square fa-2x" aria-hidden="true"></i><span class="sr-only">Send email</span></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        case "none":
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email">Send email</a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email" onclick="window.open(\'mailto:?subject=\' + encodeURIComponent(document.title) + \'&body=\' +  encodeURIComponent(document.URL)); return false;">Send email</a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
        default:
          switch ($scope.mode){
            case 'nojs':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email"><img alt="Send email" src="images/' + $scope.icon_path + '/Email.' + $scope.format + '"></a></li>\n';
            break;
            case 'js':
              $scope.html += '  <li><a href="mailto:?subject=' + encodeURIComponent($scope.title.trim()) + '&body=' + encodeURIComponent($scope.description.trim()) + ':%20' + encodeURIComponent($scope.url.trim()) + '" target="_blank" title="Send email" onclick="window.open(\'mailto:?subject=\' + encodeURIComponent(document.title) + \'&body=\' +  encodeURIComponent(document.URL)); return false;"><img alt="Send email" src="images/' + $scope.icon_path + '/Email.' + $scope.format + '"></a></li>\n';
            break;
//            case 'php':
//            break;
          }
        break;
      }
    }

    /*
    encodeURIComponent($scope.url.trim())
    encodeURIComponent($scope.title.trim())
    encodeURIComponent($scope.description.trim())
    $scope.preview_image_url
    */

    $scope.html += '</ul>';
    $scope.apply;

//    var temp = $scope.html.replace(/images/g, 'simple-sharing-buttons-generator/images');
//    $scope.preview_html = $sce.trustAsHtml(temp);
    $scope.preview_html = $sce.trustAsHtml($scope.html);
    $scope.apply;

  });
}]);

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        element.attr('src', attrs.errSrc);
      });
    }
  }
});


app.directive("goto", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $('#' + attrs.goto).offset().top
      }, 700);
      if (history.pushState){
        history.pushState(null, null, '#' + attrs.goto);        
      }
    });
  };
});



app.directive("nightmode", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      e.preventDefault();
      scope.nightmode = !scope.nightmode;
      if(!scope.$$phase) {
        scope.$apply();
      }

      if (scope.nightmode){
        $("*").addClass("night");
        createCookie('nightmode', 'on', 365);
      }
      else{
        $("*").removeClass("night");
        eraseCookie('nightmode');
      }
    });
  };
});

app.directive("sitesummary", ['$http', function($http){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      if (scope.url == ''){
        alert("Please fill in the URL of your page, after that you can fill the site information automatically!");
        return;
      }
      if (scope.url.indexOf('http://') == -1 && scope.url.indexOf('https://') == -1){
        scope.url = "http://" + scope.url;
        if(!scope.$$phase) {
          scope.$apply();
        }
      }

      scope.magic_icon = 'fa fa-spinner fa-spin white';
      if(!scope.$$phase) {
        scope.$apply();
      }

      $http.get('https://fourtonfish.com/sitesummary/?url=' + scope.url).success(function(data){
        scope.magic_icon = 'fa fa-magic';
        if (data.title != 'not found'){
          scope.title = data.title.trim();
        }
        else{
          scope.title = '';         
        }
        if (data.description != 'not found'){
          scope.description = data.description.trim();
        }
        else{
          scope.description = '';         
        }
        if (data.twitter != 'not found'){
          scope.twitter_handle = data.twitter.trim();
        }
        else{
          scope.twitter_handle = '';          
        }
        if (data.image != 'not found'){
          scope.preview_image_url = data.image.trim();
        }
        else{
          scope.preview_image_url = '';         
        }
        if(!scope.$$phase) {
          scope.$apply();
        }
      }).error(function(data){
        alert("Unable to fetch website info.");
        console.log("Error: " + data);
        scope.magic_icon = 'fa fa-magic';
        if(!scope.$$phase) {
          scope.$apply();
        }
      });
    });
  };
}]);

app.directive("gototop", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  };
});

app.directive("updatestyle", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      $('html,body').animate({
        scrollTop: $('#networks').offset().top
      }, 700);      
      switch(attrs.for){
        case ('style_color'):
          scope.download_url = "color.zip";
        break;
        case ('style_black'):
          scope.download_url = "black.zip";
        break;
        case ('style_inverted'):
          scope.download_url = "inverted.zip";
        break;
        case ('style_simple_icons'):
          scope.download_url = "simple_icons.zip";
        break;
        case ('style_simple_icons_black'):
          scope.download_url = "simple_icons_black.zip";
        break;
        case ('font_awesome'):
//          scope.download_url = "fontawesome";
        break;
        case ('style_social_flat_rounded_rects_svg'):
          scope.download_url = "style_social_flat_rounded_rects_svg.zip";
        break;
      }
    scope.$apply();
    });
  };
});

app.directive("selectallnetworks", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      if (scope.allnetworks){
        scope.allnetworks = false;
        scope.facebook = false;
        scope.twitter = false;
        scope.google_plus = false;
        scope.tumblr = false;
        scope.pinterest = false;
        scope.pocket = false;
        scope.reddit = false;
        scope.linkedin = false;
        scope.wordpress = false;
        scope.pinboard = false;
        scope.email = false;
      }
      else{
        scope.allnetworks = true;
        scope.facebook = true;
        scope.twitter = true;
        scope.google_plus = true;
        scope.tumblr = true;
        scope.pinterest = true;
        scope.pocket = true;
        scope.reddit = true;
        scope.linkedin = true;
        scope.wordpress = true;
        scope.pinboard = true;
        scope.email = true;
      }
      scope.$apply();

    });
  };
});

app.directive("help", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      alert(attrs.title);
      return false;
    });
  };
});

app.directive("resetcss", function(){
  return function(scope, element, attrs){
    element.bind("click", function(e){
      var confirmResetCSS = confirm('This is your CSS code. Would you like to reset it?');
      if (confirmResetCSS){
        scope.css = scope.original_css;
        scope.$apply();
      }
    });
  };
});

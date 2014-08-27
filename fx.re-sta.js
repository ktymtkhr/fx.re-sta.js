/**
 * fx.re-sta.js
 * Description: re-sta汎用JS
 * Version: 1.0.2
 * Author: ktymtkhr
 * URI: https://github.com/ktymtkhr/fx.re-sta.js/
 * created: July 11, 2014
 * modified: August 27, 2014
 *
 */

var $j = jQuery.noConflict();

$j(function() {
  //マウスオーバーorタップで画像切替
  if($j('.off-on')[0]){
    if(!is_sp()){
      $j(document).on('mouseenter', '.off-on', function(){
        $j(this).attr('src', $j(this).attr('src').replace('-off', '-on'));
      });
      $j(document).on('mouseleave', '.off-on', function(){
        $j(this).attr('src', $j(this).attr('src').replace('-on', '-off'));
      });
    } else{
      $j(document).on('touchstart', '.off-on', function(){
        $j(this).attr('src', $j(this).attr('src').replace('-off', '-on'));
      });
      $j(document).on('touchend', '.off-on', function(){
        $j(this).attr('src', $j(this).attr('src').replace('-on', '-off'));
      });
    }
    //切替画像プリロード
    for(i=0;i<$j('.off-on').length;i++){
      img_preload($j('.off-on').eq(i).attr('src').replace('-off','-on'));
    }

  }

  //マウスオーバーorタップで半透過
  if($j('.fade')[0]){
    if(!is_sp()){
      $j(document).on('mouseenter', '.fade', function(){
        $j(this).stop(true, true).fadeTo(300,0.85);
      });
      $j(document).on('mouseleave', '.fade', function(){
        $j(this).fadeTo(200,1);
      });
    } else {
      $j(document).on('touchstart', '.fade', function(){
        $j(this).stop(true, true).fadeTo(300,0.85);
      });
      $j(document).on('touchend', '.fade', function(){
        $j(this).fadeTo(200,1);
      });
    }
  }

  //文字数カウンタ
  //<textarea class="cntText" id="this_id"></textarea>
  //<span id="cnt-this_id">0</span>文字
  if($j('.cntText')[0]){
    for(var i=0;i<$j('.cntText').length;i++){
      $j('#cnt-'+$j('.cntText').eq(i).attr('id')).html($j('.cntText').eq(i).val().length);
    }

    $j(document).on('keyup', '.cntText', function(){
      $j('#cnt-'+$j(this).attr('id')).html($j(this).val().length);
    });
  }

  //ページの先頭へスクロール
  if($j('.to-top')[0]){
    $j(document).on('click', '.to-top', function(){
      $j('html,body').animate({ scrollTop: 0 }, 'slow');
      return false;
    });
  }

  //画像プリロード
  function img_preload(){
    for(var i = 0; i < arguments.length; i++){
      $j("<img>").attr("src", arguments[i]);
    }
  }

});

//確認ダイアログ表示(Y/N)
function check(msg){
  if(typeof msg === 'undefined'){msg = 'よろしいですか？';}
  if(window.confirm(msg)){
    return true;
  } else {
    window.alert('キャンセルしました');
    return false;
  }
}

//UA判別
var ua_sp = ['iPhone','Android'];
var ua_pc = ['MSIE','Safari','Firefox','Chrome','opera'];

function is_ua(){ //引数:,
  var nu = navigator.userAgent;
  for(var i = 0; i < arguments.length; i++){
    if(nu.indexOf(arguments[i])>0){return 1;}
  }
  return 0;
}

//スマホ判別
function is_sp(){
  var nu = navigator.userAgent;
  return (nu.indexOf('iPhone')>0||nu.indexOf('Android')>0) ? 1 : 0;
}

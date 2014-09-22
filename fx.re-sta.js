/**
 * fx.re-sta.js
 * Description: re-sta汎用JS
 * Version: 1.0.3
 * Author: ktymtkhr
 * URI: https://github.com/ktymtkhr/fx.re-sta.js/
 * created: July 11, 2014
 * modified: September 22, 2014
 *
 */

var $j = jQuery.noConflict();

$j(function(){
  //マウスオーバーorタップで画像切替
  if($j('.off-on')[0]){
    $j(document).on('mouseenter touchstart', '.off-on', function(){
      $j(this).attr('src', $j(this).attr('src').replace('-off', '-on'));
    });
    $j(document).on('mouseleave touchend', '.off-on', function(){
      $j(this).attr('src', $j(this).attr('src').replace('-on', '-off'));
    });
    //切替画像プリロード
    for(i=0;i<$j('.off-on').length;i++){
      img_preload($j('.off-on').eq(i).attr('src').replace('-off','-on'));
    }
  }

  //マウスオーバーorタップで半透過
  if($j('.fade')[0]){
    $j(document).on('mouseenter touchstart', '.fade', function(){
      $j(this).stop(true, true).fadeTo(300,0.85);
    });
    $j(document).on('mouseleave touchend', '.fade', function(){
      $j(this).fadeTo(200,1);
    });
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

  //入力した文字を任意の型に変換
  //<textarea class="charTrans" charTrans="h_alpha,h_num,h_mark,z_kana"></textarea>
  if($j('.charTrans')[0]){
    $j('.charTrans').change(function(){
      var text = $j(this).val();
      var tr_type = $j(this).attr('charTrans')?$j(this).attr('charTrans'):'h_alpha,h_num,h_mark';
      tr_type = tr_type.split(',');
      var flg = {'alpha':0,'num':0,'mark':0};

      for(var i=0;i<tr_type.length;i++){
        switch(tr_type[i]){
          case 'h_alpha': //全角英字→半角英字
            if(!flg['alpha']){text=text.replace(/[Ａ-Ｚａ-ｚ]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});flg['alpha']=1;  }
            break;
          case 'h_num': //全角数字→半角数字
            if(!flg['num']){text=text.replace(/[０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});flg['num']=1;}
            break;
          case 'h_mark': //全角記号→半角記号
            if(!flg['mark']){text=text.replace(/[－！”＃＄％＆＇（）＝＜＞，．？＿［］｛｝＠＾～￥]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});flg['mark'] = 1;}
            break;

          case 'z_alpha': //半角英字→全角英字
            if(!flg['alpha']){text=text.replace(/[A-Za-z]/g,function(s){return String.fromCharCode(s.charCodeAt(0)+0xFEE0);});flg['alpha']=1;}
            break;
          case 'z_num': //半角数字→全角数字
            if(!flg['num']){text=text.replace(/[0-9]/g,function(s){return String.fromCharCode(s.charCodeAt(0)+0xFEE0);});flg['num']=1;}
            break;
          case 'z_mark': //半角記号→全角記号
            if(!flg['mark']){text=text.replace(/[-!"#$%&'()=<>,.?_\[\]{}@^~¥]/g,function(s){return String.fromCharCode(s.charCodeAt(0)+0xFEE0);});flg['mark']=1;}
            break;
          //case 'h_kana': 全角カナ→半角カナ追加予定
          //case 'z_kana': 半角カナ→全角カナ追加予定
        }
      }
      $j(this).val(text);  
    });
  }


  //指定文字数を入力したら次のターゲットへfocusが移動する
  //<input type="text" class="focus-cnt" focus-cnt="4" focus-target="#i-name" />
  $j(document).on('change keyup', '.focus-cnt', function(){
    if($j(this).attr('focus-cnt')&&$j(this).attr('focus-target')){
      if($j(this).val().length == $j(this).attr('focus-cnt')) $j($j(this).attr('focus-target')).focus();
    }
  });

  //入力が終わったら、次のターゲットへfocusが移動する
  //<input type="text" class="focus-next" focus-target="#i-name" />
  $j(document).on('change', '.focus-next', function(){
    if($j(this).attr('focus-target')) $j($j(this).attr('focus-target')).focus();
  });

  //排他的チェック(挙動がradioボタンと似ているが、違う点は「どちらもOFF」が可能)
  //exclusion=""でグループのclass名を指定
  //<input type="checkbox" name="checkbox1" value="value1" class="exclusion excl" exclusion="excl" />
  //<input type="checkbox" name="checkbox2" value="value2" class="exclusion excl" exclusion="excl" />
  $j(document).on('click', '.exclusion', function(){
    if($j(this).prop('checked')){
      for(var i=0;i<$j('.'+$j(this).attr('exclusion')).length;i++){
        $j('.'+$j(this).attr('exclusion')).eq(i).prop('checked', false);
      }
      $j(this).prop('checked', true);
    }
  });

  //URLチェック
  //<input type="text" name="chk_url" value="http://" id="chk-url" /><span class="chk-url" chk-url="chk-url">URLチェック</span>
  $j('.url-chk').css('cursor','pointer');
  $j(document).on('click', '.url-chk', function(){
    url = $j('#'+$j(this).attr('chk-url')).val();
    window.open(url,"_blank");
    return false;
  });

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
  return (nu.indexOf('iPhone')>0||nu.indexOf('Android')>0||nu.indexOf('Android')>0&&nu.indexOf('Mobile')>0) ? 1 : 0;
}

//タブレット判別
function is_tablet(){
  var nu = navigator.userAgent;
  return !is_sp()&&(nu.indexOf('iPad')>0||nu.indexOf('Android')>0) ? 1 : 0;
}

//PC判別
function is_pc(){return is_sp()||is_tablet()?0:1;}

//生年月日から年齢計算
//<script>document.write(calc_age(19800101));</script>
function calc_age(yyyymmdd){
  var d = new Date();
  var today = d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
  return Math.floor((today-yyyymmdd)/10000);
}
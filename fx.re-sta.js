/**
 * fx.re-sta.js
 * Description: re-sta汎用JS
 * Version: 1.0.4
 * Author: ktymtkhr
 * URI: https://github.com/ktymtkhr/fx.re-sta.js/
 * created: July 11, 2014
 * modified: January 15, 2015
 *
 */

jQuery(function($){
  //マウスオーバーorタップで画像切替
  if($('.off-on')[0]){
    $(document).on('mouseenter touchstart', '.off-on', function(){
      $(this).attr('src', $(this).attr('src').replace('-off', '-on'));
    });
    $(document).on('mouseleave touchend', '.off-on', function(){
      $(this).attr('src', $(this).attr('src').replace('-on', '-off'));
    });
    //切替画像プリロード
    for(i=0;i<$('.off-on').length;i++){
      img_preload($('.off-on').eq(i).attr('src').replace('-off','-on'));
    }
  }

  //マウスオーバーorタップで半透過
  if($('.fade')[0]){
    $(document).on('mouseenter touchstart', '.fade', function(){
      $(this).stop(true, true).fadeTo(300,0.85);
    });
    $(document).on('mouseleave touchend', '.fade', function(){
      $(this).fadeTo(200,1);
    });
  }

  //文字数カウンタ
  //<textarea class="cntText" id="this_id"></textarea>
  //<span id="cnt-this_id">0</span>文字
  if($('.cntText')[0]){
    for(var i=0;i<$('.cntText').length;i++){
      $('#cnt-'+$('.cntText').eq(i).attr('id')).html($('.cntText').eq(i).val().length);
    }
    $(document).on('keyup', '.cntText', function(){
      $('#cnt-'+$(this).attr('id')).html($(this).val().length);
    });
  }

  //ページの先頭へスクロール
  if($('.to-top')[0]){
    $(document).on('click', '.to-top', function(){
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false;
    });
  }

  //レンダリング完了時に該当場所まで移動
  //メールフォームでエラーの箇所に.load2jumpクラスを設定しておくと、
  //ページ読み込み後、エラーの箇所の先頭に自動スクロール
  if($j('.load2jump')[0]){
    $j('html,body').animate({ scrollTop: $j('.load2jump').eq(0).offset().top }, 'slow');
      return false;
  }

  //画像プリロード
  function img_preload(){
    for(var i = 0; i < arguments.length; i++){
      $("<img>").attr("src", arguments[i]);
    }
  }

  //入力した文字を任意の型に変換
  //<textarea class="charTrans" charTrans="h_alpha,h_num,h_mark,z_kana"></textarea>
  if($('.charTrans')[0]){
    $('.charTrans').change(function(){
      var text = $(this).val();
      var tr_type = $(this).attr('charTrans')?$(this).attr('charTrans'):'h_alpha,h_num,h_mark';
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
      $(this).val(text);  
    });
  }


  //指定文字数を入力したら次のターゲットへfocusが移動する
  //<input type="text" class="focus-cnt" focus-cnt="4" focus-target="#i-name" />
  $(document).on('change keyup', '.focus-cnt', function(){
    if($(this).attr('focus-cnt')&&$(this).attr('focus-target')){
      if($(this).val().length == $(this).attr('focus-cnt')) $($(this).attr('focus-target')).focus();
    }
  });

  //入力が終わったら、次のターゲットへfocusが移動する
  //<input type="text" class="focus-next" focus-target="#i-name" />
  $(document).on('change', '.focus-next', function(){
    if($(this).attr('focus-target')) $($(this).attr('focus-target')).focus();
  });

  //排他的チェック(挙動がradioボタンと似ているが、違う点は「どちらもOFF」が可能)
  //exclusion=""でグループのclass名を指定
  //<input type="checkbox" name="checkbox1" value="value1" class="exclusion excl" exclusion="excl" />
  //<input type="checkbox" name="checkbox2" value="value2" class="exclusion excl" exclusion="excl" />
  $(document).on('click', '.exclusion', function(){
    if($(this).prop('checked')){
      for(var i=0;i<$('.'+$(this).attr('exclusion')).length;i++){
        $('.'+$(this).attr('exclusion')).eq(i).prop('checked', false);
      }
      $(this).prop('checked', true);
    }
  });

  //三段階チェックボックス
  if(is_ua('iPhone,iPad')){
    $j('.tri-state').css({
      'display':'block','visibility':'visible','width':'20px','height':'20px','cursor':'pointer',
      'border':'none','background':'url(tri-state/bg-chk-off.png) center center no-repeat',
    });
    $j('.tri-state').attr('readonly',true);
    $j(document).on('click','.tri-state', function(){
      if($j(this).val()>0){ //正→負
        $j(this).css('background', $j(this).css('background').replace('-on.png', '-inde.png')).val($j(this).attr('tri-state')*-1);
      }else if($j(this).val()<0){ //負→0
        $j(this).css('background', $j(this).css('background').replace('-inde.png', '-off.png')).val(0);
      }else{ //0→正
        $j(this).css('background', $j(this).css('background').replace('-off.png', '-on.png')).val($j(this).attr('tri-state'));
      }
    });
    if($j(this).val()>0){ //正
        $j(this).css('background', $j(this).css('background').replace('-off.png', '-on.png'));
      }else if($j(this).val()<0){ //負
        $j(this).css('background', $j(this).css('background').replace('-on.png', '-inde.png'));
      }else{ //0
        $j(this).css('background', $j(this).css('background').replace('-inde.png', '-off.png'));
    }
  }else{
    $j(document).on('click','.tri-state',function(){
      if($j(this).val()>0){ //正→負
        $j(this).prop('indeterminate',true).val($j(this).attr('tri-state')*-1);
      }else if($j(this).val()<0){ //負→0
        $j(this).prop('indeterminate',false).prop('checked',false).val(0);
      }else{ //0→正
        $j(this).prop('checked',true).val($j(this).attr('tri-state'));
      }
    });
    if($j(this).val()>0){ //正
        $j(this).prop('checked',true);
      }else if($j(this).val()<0){ //負
        $j(this).prop('indeterminate',true);
      }else{ //0
        $j(this).prop('indeterminate',false).prop('checked',false);
    }
  }


  //URLチェック
  //<input type="text" name="chk_url" value="http://" id="chk-url" /><span class="chk-url" chk-url="chk-url">URLチェック</span>
  $('.chk-url').css('cursor','pointer');
  $(document).on('click', '.chk-url', function(){
    url = $('#'+$(this).attr('chk-url')).val();
    window.open(url,"_blank");
    return false;
  });


  //チェックボックス/ラジオボタン ラベル装飾
  if($('input:checkbox:checked,input:radio:checked')[0]){
    var checkObj = $('input:checkbox:checked,input:radio:checked');
    for(var i=0; i<checkObj.length;i++){
      if($(checkObj.eq(i).attr('check-label'))[0]){
        $(checkObj.eq(i).attr('check-label')).addClass('checked-label');
      }else{
        $(checkObj.eq(i).attr('check-label')).removeClass('checked-label');
      }
    }
  }
  $(document).on('click', '.check-label', function(){
    if(($(this).is('input:checkbox')||$(this).is('input:radio')) && $($(this).attr('check-label'))[0]){
      if($(this).prop('checked')){
        if($(this).is('input:radio')){
          var radio_group = $('input:radio[name="'+$(this).attr('name')+'"]');
          for(var i=0;i<radio_group.length;i++){
            if($(radio_group.eq(i).attr('check-label')).hasClass('checked-label')){
              $(radio_group.eq(i).attr('check-label')).removeClass('checked-label');
            }
          }
        }
        $($(this).attr('check-label')).addClass('checked-label');
      }else{
        $($(this).attr('check-label')).removeClass('checked-label');
      }
    }
  });

  //テキストをクリック(タップ)で編集可能にする
  //オプション指定で、ターゲットファイルにデータをajax送信する
  //<p><span class="editable-txt" editable-txt="target.php,send_data">ダミーテキスト</span></p>
  if($('.editable-txt')[0]){
    $(document).on('click', '.editable-txt', function(){
      var option = $(this).attr('editable-txt')?$(this).attr('editable-txt'):'';
      if(!$(this).hasClass('editing-txt')){
        $(this).addClass('editing-txt');
        $(this).html('<input type="text" value="'+$(this).text()+'" />');
        $('input',this).focus().blur(function(){
          if($(this).val()==='') inputVal = this.defaultValue;
          $(this).parent().removeClass('editing-txt').text($(this).val());

          if(option){
            option = option.split(',');
            if(option.length<2){
              //エラーメッセージ(パラメータ不足)の表示
              $(this).parent().append('<span class="msg-err">パラメータが足りません</span>');
              return false;
            }
            $.ajax({
              type:'POST',
              url: option[0],
              data: $(this).val()+','+option[1],
              success: function(msg){
                return true;
              }
            });
          }
        });
      }
    });
  }

  //値が空の状態でBackSpaceを押すと、指定のターゲットへfocusが移動する
  //移動した際に全選択状態にするか、オプションで指定可能(0:移動のみ 1:全選択)
  //<input type="text" class="focus-back" focus-back="#i-tel1,1" />
  $(document).on('keyup', '.focus-back', function(e){
    if($(this).attr('focus-back')!=='undefined'){
      var f_b = $(this).attr('focus-back').split(',');
      if(e.keyCode==8&&$(this).val()===''&&$(f_b[0])[0]) $(f_b[0]).focus();
      if(f_b.length>1&&f_b[1]==1) $(f_b[0]).select();
    }
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

//日付・曜日・時間判別(レンダリング時点の判定)(指定条件に全て一致すればTRUEを返す)
//引数は7つ全て必要(使用しない場合は''を指定)
//<script>if(is_time(2014,9,1,17,1,1,1)){document.write('xxx');}</script>
function is_time(yy,mm,dd,hh,mi,ss,day){
  if(arguments.length!=7) return false;
  var flg_time = 1;
  var d = new Date();
  var today = {
    yy:d.getFullYear(),
    mm:(d.getMonth()+1),
    dd:d.getDate(),
    hh:d.getHours(),
    mi:d.getMinutes(),
    ss:d.getSeconds(),
    day:d.getDay() //0:Sun 1:Mon 2:Tue 3:Wed 4:Thu 5:Fri 6:Sat
  };
  var the_time = {
    yy:arguments[0], //yy
    mm:arguments[1], //mm
    dd:arguments[2], //dd
    hh:arguments[3], //hh
    mi:arguments[4], //mi
    ss:arguments[5], //ss
    day:arguments[6] //day
  };

  if(the_time['yy']!=''&&flg_time) flg_time = the_time['yy']==today['yy']?1:0;
  if(the_time['mm']!=''&&flg_time) flg_time = the_time['mm']==today['mm']?1:0;
  if(the_time['dd']!=''&&flg_time) flg_time = the_time['dd']==today['dd']?1:0;
  if(the_time['hh']!=''&&flg_time) flg_time = the_time['hh']==today['hh']?1:0;
  if(the_time['mi']!=''&&flg_time) flg_time = the_time['mi']==today['mi']?1:0;
  if(the_time['ss']!=''&&flg_time) flg_time = the_time['ss']==today['ss']?1:0;
  if(the_time['day']!=''&&flg_time) flg_time = the_time['day']==today['day']?1:0;

  return flg_time?true:false;
}

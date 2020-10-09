window.addEventListener("load", function(e) {
  var el = document.querySelector(".msg_area");
  el.scrollLeft = el.scrollWidth;
});


var selfname = $('#uname').val();
$(document).ready(function () {




  $('.close').click(function () {
    ('.ouser').remove();
  });

  var x;
  var y;
  $('.fstyle').mousemove(function (e) {
    if ($(window).width()>1500) {
      x = -e.pageX +960;
      y = e.pageY -420;
      $('.fstyle').css({'transform':'translate(-50%, -50%) rotateY('+x/800+'deg) rotateX('+y/2000+'deg)'});
    }
  });
  $('.fstyle').mousedown(function (e) {
    if ($(window).width()>1500) {
      $('.fstyle').css({'transform':'translate(-50%, -50%) rotateY('+x/800+'deg) rotateX('+y/2000+'deg) translateZ(-2px)'});
    }
  });
  $('.fstyle').mouseup(function (e) {
    if ($(window).width()>1500) {
      $('.fstyle').css({'transform':'translate(-50%, -50%) rotateY('+x/800+'deg) rotateX('+y/2000+'deg) translateZ(0)'});
    }
  });

  $('#s').click(function () {
    $(".si").css('display','flex');
    $(".fstyle").css('display','none');
    $('#term_conta').css('display','none');
  });
  $('#l').click(function () {
    $(".li").css('display','flex');
    $(".fstyle").css('display','none');
    $('#term_conta').css('display','none');
  });
  $('#gol').click(function () {
    $(".li").css('display','none');
    $(".si").css('display','flex');
  });
  $('#gos').click(function () {
    $(".si").css('display','none');
    $(".li").css('display','flex');
  });
  $(document).on('click', '#sexit', function () {
    $('.gray').remove();
    $(".sorry").remove();
    $('#sexit').remove();
  });
  $(document).on('click', '.gray', function () {
    $('.gray').remove();
    $(".sorry").remove();
    $('#sexit').remove();
  });


    var typing;
    var c;
    var room;
    var i = -1;
    var username;
    var roomname;
    var joinroom;
    var lusr = $('#usrl').val();
    var socket = io();

    socket.on('usr',function (usr) {
      socket.emit("logusr", usr);
      var l = usr;
      return false;
    });

    $("#main").submit(function (event) {
      if ($('#msg').val() != '') {
        event.preventDefault();
        var mes = $('#msg').val();
        var unm1 = $('#uname').val();
        var salam = 'salam';
        socket.emit("msg", {mes, unm1, salam});
        $('#msg').val('');
        $('.type').remove();
        $('#pop').prop("volume", 0.2);
        $('#pop').get(0).play();
        return false;
      }
      else {
        event.preventDefault();
      }
    });
    $(document).on('submit', '#main2', function (event) {
      if ($("#msg2").val() != '') {
        event.preventDefault();
        var pvmsg = $("#msg2").val();
        var unm1 = $('#uname').val();
        var salam = 'salam';
        socket.emit("pvmsg", {pvmsg, unm1, salam});
        $("#msg2").val('');
        $('#pop').prop("volume", 0.2);
        $('#pop').get(0).play();
        return false;
      }
      else {
        event.preventDefault();
      }
    });

    $(".sign_in").submit(function (e) {
      if ($('#pass').val() == $('#passc').val()) {
        e.preventDefault();
        socket.emit("usr", $('#usr').val());
        socket.emit("pass", $('#pass').val());
        $(".chatbody").css('display','block');
        $(".group").css('display','block');
        $(".si").css('display','none');
        $("body").css('background-color', 'white');
        return false;
      }
      else {
        $('.error').html('*!رمز هایی که وارد کردید یکی نیستند*');
        $('.error').css('display','block');
        e.preventDefault();
      }
    });

    //checing if username exists
    $('#usr').keyup(function () {
      $('.error').css('display','none');
      if ($('#usr').val() != '') {
        var usrcheck = $('#usr').val();
        socket.emit('usrcheck', usrcheck);
        socket.on('q', function (q) {
          $('.error').html('*نام کاربری قبلا ثبت شده است');
          $('.error').css('display','block');
          $(".sign_in").submit.preventDefault();
        });
      }
    });

    $(".log_in").submit(function (e) {
      e.preventDefault();
      socket.emit("logusr", $('#usrl').val());
      socket.emit("logpass", $('#passl').val());
      $(".chatbody").css('display','block');
      $(".li").css('display','none');
      $(".group").css('display','block');
      $("body").css('background-image', 'white');
      $('#uname').val($('#usrl').val());
      return false;
    });

    var x = 0;
    socket.on('msg2', function (msg2) {
        i++;
        var eq = msg2.unm1;
        $('#cha1').append("<div class='msg'>"+msg2.mes+"<div class='date' id='l_"+x+"_m'>"+msg2.h+":"+msg2.min+":"+msg2.sec+"</div></div>");
        $('#cha1').scrollTop($('.msg')[i].offsetTop);
        /*setInterval(function(){
          var d = new Date();
          var sec = d.getSeconds();
          var min = d.getMinutes();
          var h = d.getHours();
          //clac time diff
          if (sec > msg2.sec ,min == msg2.min && msg2.h == h) {
            $('#l_'+x+'_m').text("کمتر از یک دقیقه پیش");
            x++;
          }else if (min > msg2.min && msg2.h == h) {
            var mindiff = min - msg2.min;
            $('#l_'+x+'_m').text( mindiff+ 'دقیقه پیش');
            x++;
          }else if ( h > msg2.h) {
            var hdiff = h - msg2.h;
            $('#l_'+x+'_m').text('ساعت پیش'+ hdiff);
            x++;
          }else if ((h - msg2.h) > 24) {
            var daydiff = msg2.h / 24 ;
            $('#l_'+x+'_m').text('روز پیش'+ daydiff);
            x++;
          }
        }, 1000);*/
        if (eq == $('#uname').val()) {
          $('.msg:last-child').css({'background-color':'#ffa9a1','color':'white','left':'50%','border-bottom-right-radius':'0','border-bottom-left-radius':'30px'});
          $('.date').css('left', '35%')
        }
    });
    socket.on('pvmsg', function (pvmsg) {
        i++;
        roomname = pvmsg.roomname;
        var eq2 = pvmsg.usrnm;
        var val = $('#uname').val();
        if (eq2 == val) {
          $('.msg2:last-child').css({'background-color':'#ffa9a1','color':'white','left':'50%','border-bottom-right-radius':'0','border-bottom-left-radius':'30px'});
        }
        $('.'+roomname+'3').append("<div class='msg2'>"+pvmsg.pv+"</div>");
    });




    socket.on('logusr', function (logusr) {
      username = logusr;
      $(".onlineu").append('<li class="ouser" id="'+username+'">!الان آنلاینه '+username+'<div class="close">&times</div></li>');
        $('.navclick').css({'background-color':'#FF6F61','animation':' pic .5s forwards'});
      });

    var height = 0;
    $('.nc_con').click(function (event) {
      if (height == 0) {
        $('.layer').fadeIn(400);
        $('.chatnav').height('700px');
        if ($('.navclick').css({'background-color':'#FF6F61'})) {
          $('.navclick').css({'background-color':'#0f4c81','animation':'none'});
        }
        height = 1;
      }else {
        $('.chatnav').height('0px');
        height = 0;
        $('.layer').fadeOut(400);
      }
    });
    $("#msg").focus(function () {
      if (event.which != 13) {
        var typing = "is typing..."
        socket.emit('typing', typing);
      }
    });
    $("#msg").focusout(function () {
      var untype = 'typeFinished';
      socket.emit('untype', untype);
      $('.type').remove()
    });
    /*socket.on('untype', function (untype) {
      $('.type').remove()
    });
    socket.on('typing', function (typing) {
      $('.chatbox').append('<div class="type">'+typing+'</div>');
    });*/

    socket.on('dis', function (logusr) {
      var a = '#'+logusr;
      $(a).remove();
      $("#onlineu").append('<li class="ouser" id="'+logusr+'">!آفلاین شد '+logusr+'<div class="close">&times</div></li>');
    });

    socket.on('his', function (his) {
      alert(his.room)
      for (var i = 0; i < his.his.length; i++) {
        if ($('.'+his.room+'').length == 0) {
          $('#cha2').append("<div class='msg2 "+his.room+"'>"+his.his[i]+"</div>");
          if (selfname == his.hisname[i]) {
            $('.msg2:last-child').css({'background-color':'#ffa9a1','color':'white','left':'50%','border-bottom-right-radius':'0','border-bottom-left-radius':'30px'});
          }
        }
      }
    });

    var usrnm1;
    var addroomtoggle = 0;
    $('.addroom').click(function () {
      if (addroomtoggle == 0) {
        $('.addroom').css({'width':'130px','border-top-right-radius': '35px','border-bottom-right-radius': '35px'});
        $('.plus').css({'transform':'rotate(45deg) translate(-180%, -50%)','left':'90px'});
        $('.search').css('transform','scale(1000)');
        $('#search').css({'animation':'f 1s forwards','display':' block'});
        $('.s_area').css('display','block');
        addroomtoggle = 1;
      }
      else {
        $('.addroom').css({'width':'70px','height':'70px','border-radius': '50%'});
        $('.plus').css({'transform':'rotate(-0deg) translate(-180%, -60%)','left':'35px'});
        $('.search').css('transform','scale(1)');
        $('#search').css({'animation':'fx 1s forwards','display':'none'});
        $('.s_area').css('display','none');
        addroomtoggle = 0;
      }

    })

    //getting privateroom id to join
    socket.on('room', function (room) {
      if (room == 'offline') {
        $('body').append('<section></section><div class="gray"></div><div class="sorry">شرمنده! شما فعلا نمی تونید برای افرادی که آنلاین نیستند <br> :)پیام خصوصی بفرستید. امیدواریم تو نسخه های بعدی این مشکل حل بشه <div id="sexit">&times</div> </div>')
      }
      else {
        joinroom = room;
        selfname =  $('#uname').val();
        var self = selfname;
        socket.emit('joinroom', {joinroom, self});
        if ($('.'+room+'').length == 0) {
          $('.chatbody').append('<div class="chatbox '+room+'" style="display: none;" id="ch2"><nav class="chatnav '+room+'1" id="chatnav2"><ul class="onlineu '+room+'2" id="onlineu2">  </ul></nav><div class="msg_area '+room+'3" id="cha2"></div></div>');
          console.log(room+ ' chat area created on your client');
        }
      }
    });
    //getting notif
    socket.on('pvnotif', function (usrnm) {
      usrnm1 = usrnm.roomname;
      $('.groups').append('<div class="pvnotif'+usrnm1+' bib" name="'+usrnm1+'" style="margin: auto;position: relative;height: 10%;width: 85%;border-radius: 10px;background-color: #222;color:white;opacity: .5;margin-bottom: 20px;padding: 10px 20px;font-size: 30px;cursor: pointer;">'+usrnm.usrnm+'</div>');
      $(".pvnotif"+usrnm1+"").append('<div class="notif'+ usrnm1+'" style="transition: all .5s;line-height: 40px;text-align: center;position: absolute;height: 30px;width: 30px;left: 90%;top: 50%;transform: translate(-50%, -50%);border-radius: 50%;background-color: #FF6F61;"></div>');
    });
    //getting notif number
    socket.on('num', function (num) {
      $('.notif'+usrnm1+'').html(num);
    });
    $(document).on('click', '.bib', function() {
      $('#main2').remove();
      var getname = $(this).attr('name');
      joinroom = getname;
      self = $('#uname').val();
      socket.emit('joinroom', {joinroom, self});
      $('.chatbox').css('display','none');
      $('.msg').css('display','none');
      $('.'+getname+'').css('display','block');
      $('.'+getname+'').append('<form class="main '+getname+'4" id="main2" action=""><input dir="rtl" class="in '+getname+'5" id="msg2" autocomplete="off" /><button class="in '+room+'5" id="go2">برو</button></form>')
      $('.notif'+getname+'').remove();
    });
    var deln;
    $(document).on('contextmenu', '.bib', function(e) {
      deln = $(this).attr('name');
      e.preventDefault();
      var x = e.pageX;
      var y = e.pageY;
      $('.deletechat').css({'left':x, 'top':y, 'display':'block'})
    });
    $(document).on('click', '.dchlist', function(e) {
      socket.emit('deletechat', deln);
      $('.deletechat').css('display','none');
      $('.'+deln+'').remove();
      $('.pvnotif'+deln+'').remove();
    });

    //search
    $('#search').keyup(function (e) {
      $('#notfound').remove();
      $('.searchfound').remove();
      if ($('#search').val() != '') {
        e.preventDefault();
        var key = $('#search').val();
        socket.emit('search', key);
      }
    });
    socket.on('res', function (f) {
      for (var i = 0; i < f.length; i++) {
        $('.s_area').append('<div class="searchfound">'+f[i]+'</div>');
        var isonline = f[i];
        socket.emit('isonline', isonline);
        /*socket.on('isonline', function (status) {
          if (status == true) {
            alert('ok');
            $('.searchfound').append('salam');
          }
          else {
            alert('no');
          }

        });*/
      }
    });
    socket.on('no', function (no) {
      $('.s_area').append('<div id="notfound">¯\\_(ツ)_/¯ \n <br><span id="nobody">هیچ کس پیدا نشد</span></div>');
    });
    $(document).on('click', ".searchfound", function (e) {
      var reqpv = $(this).html();
      selfname =  $('#uname').val();
      room = reqpv+selfname;
      socket.emit('reqpv',{reqpv, selfname});
      $('.chatbox').css('display','none');
      $('#main2').remove();
      if ($('.'+room+'').length == 0) {
        $('.chatbody').append('<div class="chatbox '+room+'" style="display: none;" id="ch2"><nav class="chatnav '+room+'1" id="chatnav2"><ul class="onlineu '+room+'2" id="onlineu2">  </ul></nav><div class="msg_area '+room+'3" id="cha2"></div><form class="main '+room+'4" id="main2" action=""><input dir="rtl" class="in '+room+'5" id="msg2" autocomplete="off" /><button class="in '+room+'5" id="go2">برو</button></form></div>');
      }
      $('.'+room+'').attr('style','display: block !important');
        $('.addroom').css({'width':'70px','height':'70px','border-radius': '50%'});
        $('.plus').css({'transform':'rotate(-0deg) translate(-180%, -60%)','left':'35px'});
        $('.search').css('transform','scale(1)');
        $('#search').css({'animation':'fx 1s forwards','display':'none'});
        $('.s_area').css('display','none');
        addroomtoggle = 0;
        $('.groups').append('<div class="pvnotif'+room+' bib" name="'+room+'" style="margin: auto;position: relative;height: 10%;width: 85%;border-radius: 10px;background-color: #222;color:white;opacity: .5;margin-bottom: 20px;padding: 10px 20px;font-size: 30px;cursor: pointer;">'+reqpv+'</div>');

    });

});

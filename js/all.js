// $('.discount').fadeOut(200);
$(function () {
  // [側邊選單]
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  });

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      // $('.wrap').addClass('addPadding');
    } else {
      $sidenav.removeClass('fixed');
      // $('.wrap').removeClass('addPadding');
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
    $('html, body').stop().animate(
      {
        scrollTop: scrollPos,
      },
      300
    );
  });

  $(window)
    .on('scroll', function () {
      goTopShow();
      $(window).width() < 768 && rightnavFixedTop();
    })
    .scroll();
});

// const startAni = gsap.timeline()
// startAni.to('.truesAni',{duration:1,rotate:10})

// 物件起始次數
let index = 0;
// 顯示關卡
let num = 1;
$('#numB').text(num)
// 總共的關卡
let allBody = everyBody.length
// console.log(allBody);
$('#allTot').text(allBody)

$(window).on('load',function(){
  $('#start').removeClass('pointer-none')
  $('#start').addClass('truesAni')

})

// 開始的按鈕
$('#start').click(() => {
  $('.game_box').addClass('pointer-none')
  const t1 = gsap.timeline({});
  t1.to('.tree', { duration: 1, x: '-100%', })
    .to('.tree', {
      duration: 0.5, opacity: 0, onComplete: () => {
        $('.tree').remove();
      }
    }, 0.1)
    .to('.animal', {
      duration: 0.5, opacity: 0, onComplete: () => {
        $('.animal').remove();
      }
    }, 0.2)
    .to('.start', { duration: 0.2, y: -10 }, 0.2)
    .to('.start', { duration: 0.2, y: '100%' }, 0.5)
    .to('.start', {
      duration: 0.2, opacity: 0, onComplete: () => {
        $('.start').remove();
        gsap.to('.level', { duration: 0.5, opacity: 1 })
        setTimeout(checkBox(index), 500)
        $('.game_box').removeClass('pointer-none')

      }
    }, 0.5)

})

// 雲的動畫
$('.cloud1').marquee({
  duration: 50000,
  gap: 50,
  delayBeforeStart: 0,
  direction: 'left',
  duplicated: true,
  startVisible: true
});
$('.cloud2').marquee({
  duration: 50000,
  gap: 50,
  delayBeforeStart: 0,
  direction: 'right',
  duplicated: true,
  startVisible: true
});



// 動物模型
function checkBox(index) {

  let mainIme = '<img class="everyOne pointer-none" src="img/' + everyBody[index].img + '" alt="">';
  let checkIme1 = $('<div class="check"><img class="checks" data-state="' + everyBody[index].food_left_state + '" src="img/' + everyBody[index].food_left + '" alt=""><img class="checks" data-state="' + everyBody[index].food_right_state + '" src="img/' + everyBody[index].food_right + '" alt=""></div>');

  $('.game-main').append(mainIme)
  $('.game-main').append(checkIme1)


  clickImg(checkIme1[0].firstChild, checkIme1[0].lastChild)

  const start = gsap.timeline({});
  start.from('.everyOne', { duration: 0.5, y: -50 })
    .to('.everyOne', { duration: 0.5, opacity: 1 }, 0.2)
    .to('.check', {
      duration: 0.5, opacity: 1, onComplete: function () {
        $('.checks').removeClass('pointer-none')
        checkFood(checkIme1[0].firstChild, checkIme1[0].lastChild)
      }
    }, 0.2)

}

// 資料進入後，判斷這個食物是不是正確的，若正確加入放大動畫(會在點擊是true removeClass)
function checkFood(first, last) {
  let leftFood = $(first).data('state')
  let rightFood = $(last).data('state')

  if (leftFood) {
    $(first).addClass('truesAni')
  }
  if (rightFood) {
    $(last).addClass('truesAni')
  }

}

// 點擊
function clickImg(first, last) {
  // 左右邊照片點擊取data-set值
  $(first).on('click', function () {

    let checkState = $(this).data('state')
    indexAdd(checkState)
  })
  $(last).on('click', function () {

    let checkState = $(this).data('state')
    indexAdd(checkState)
  })
}

// 計算答對or答錯
function indexAdd(states) {


  if (states) {
    $('.checks').removeClass('truesAni')

    index = index + 1

    // console.log(index);
    if (index >= allBody) {
      $('.game-main').addClass('pointer-none')


      // level
      const t2 = gsap.timeline();

      t2.to('.everyOne', { duration: 0.5, opacity: 0 })
        .to('.check', { duration: 0.5, y: '100%' }, 0.1)
        .to('.check', {
          duration: 0.5, opacity: 0, onComplete: function () {
            $('.game-main').children().remove()
            $('.level-p').text('成功!!')
            pass('.game_box')
          }
        }, 0.1)

    } else {
      num = num + 1
      $('#numB').text(num)

      $('.checks').addClass('pointer-none')
      const t1 = gsap.timeline();

      t1.to('.everyOne', { duration: 0.5, opacity: 0 })
        .to('.check', { duration: 0.5, y: '100%' }, 0.1)
        .to('.check', {
          duration: 0.5, opacity: 0, onComplete: function () {
            $('.game-main').children().remove()
            checkBox(index)

          }
        }, 0.1)


    }
  }else{
    $('#exampleModal').modal('show')

  }
}


// pass
function pass(divID) {
  let str = '';

  str = `
  <div class="pass">
    <img class="pointer-none pass-top" src="img/pass.png" alt="">
    <a id="pass_a"  href="${passLink}" target="_blank"> <img class="award truesAni" src="img/award.png" alt=""> </a>
  </div> 
  `
  $(divID).append(str);
  const tPass = gsap.timeline({});
  tPass.from('.pass', { duration: 0.5, y: -50 })
    .from('.award', {
      duration: 0.5, opacity: 0, onComplete: function () {

        $('.game-main').removeClass('pointer-none')

      }
    }, 0.2)
}


$('.err').click(function () {
  $('#exampleModal').modal('hide')

})
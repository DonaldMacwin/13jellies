//モーダル設定
'use strict';
$(function () {
    $('.js_modalBtnCont').on('click', function (e) {
            e.preventDefault();
            let target = $(this).data('modal-btn');
            let modal = document.getElementById(target);
            $(modal).fadeIn();
            $('html, body').css('overflow', 'hidden');//背景動かないよう固定
    });

    $('.js_modalOverlay, .js_modalClose').on('click', function (e) {
            e.preventDefault();
            $('.js_modalWrap').fadeOut();
            $('html, body').removeAttr('style');//背景固定を解除
        });
});

//ふわっと表示設定
function fadeAnime() {
        $('.js_fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
                var elemPos = $(this).offset().top + 300;//要素より、200px下の
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll >= elemPos - windowHeight) {
                        $(this).addClass('js_fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
                } else {
                        $(this).removeClass('js_fadeUp');// 画面外に出たらfadeUpというクラス名を外す
                }
        });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
        fadeAnime();
});

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
        fadeAnime();
});
window.onload = function () {
    //头部搜索框背景,鼠标滚动,背景透明度渐变
        var banner = document.querySelector('.banner');
        var bannerTop = banner.offsetHeight;
        var tops = document.querySelector('.top');

        window.onscroll = function () {
            var scrollTopPage = document.body.scrollTop || document.documentElement.scrollTop;
            var percent = scrollTopPage / bannerTop;
            if(percent <= 1) {
                tops.style.backgroundColor = 'rgba(233,35,34,'+percent+')';
            }
        };


    //倒计时
    var picTime = document.querySelector('.time');
    var spans = picTime.querySelectorAll('span');
    var total = 3700;
    var timerId;
    timerId = setInterval(function () {
        total--;
        if(total <= 0) {
            clearInterval(timerId);
            return;
        }
        var hour = Math.floor(total / 3600);
        var minutes = Math.floor(total % 3600 / 60);
        var seconds = total % 60;
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);

        spans[3].innerHTML = Math.floor(minutes / 10);
        spans[4].innerHTML = Math.floor(minutes % 10);

        spans[6].innerHTML = Math.floor(seconds / 10);
        spans[7].innerHTML = Math.floor(seconds % 10);

    },1000);
    //轮播图部分
/*
    //动态克隆第一张和最后一张图片
    var banner = document.querySelector('.banner');
    var pictures = banner.querySelector('.pictures');

    var lists = pictures.children;
    var first = lists[0].cloneNode(true);
    var last = lists[lists.length-1].cloneNode(true);
    pictures.appendChild(first);
    pictures.insertBefore(last,lists[0]);

    var bannerWidth = banner.offsetWidth;
    var lis = banner.querySelector('.pictures').children;

    var countWidth = bannerWidth * (lis.length);
    pictures.style.width = countWidth + 'px';

    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        li.style.width = countWidth / lis.length +'px';
    }

    var index = 1;

    pictures.style.left= - bannerWidth + 'px';

    //当屏幕改变宽度的时候,banner里面的图片宽度不随着屏幕缩放,onresize事件就是解决这个问题
    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        lis = banner.querySelector('.pictures').children;
        countWidth = bannerWidth * (lis.length);
        pictures.style.width = countWidth + 'px';
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            li.style.width = countWidth / lis.length +'px';
        }
        pictures.style.left= - bannerWidth * index + 'px';
    };
    //轮播图自动播放
    var timeId;
    timeId = setInterval(function () {
        index ++ ;
        pictures.style.transition = 'all 0.5s';
        pictures.style.left= - bannerWidth * index + 'px';
       setTimeout(function(){
           if(index == lis.length - 1) {
               pictures.style.transition = 'none';
               index = 1;
               pictures.style.left= - bannerWidth + 'px';
           }
       },500)
    },2000);

    //实现手动播放
    var startX,moveX,distanceX;
    //绑定touch事件的元素必须有宽和高才能触发事件,此时ul里面的li都是浮动的,所以ul只有宽,没有高,给ul清除浮动,才能是触摸事件生效
    pictures.addEventListener('touchstart',function(e){
        clearInterval(timeId);
        timeId = null;
        startX = e.touches[0].clientX;
    });
    pictures.addEventListener('touchmove',function(e){
        pictures.style.transition = 'none';
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        //注意此时ul偏移的位置是相对自身的位置,必须加上该ul当前偏移的位置
        pictures.style.left = -index*bannerWidth + distanceX + 'px';

    });
    pictures.addEventListener('touchend',function(){
        if(Math.abs(distanceX) > (bannerWidth / 2)) {
            if(distanceX > 0) {
                index--;
            }else {
                index++;
            }
            pictures.style.transition = 'left 0.5s';
            pictures.style.left = -index * bannerWidth + 'px';
        }else if(Math.abs(distanceX) > 0) {
            pictures.style.transition = 'left 0.5s';
            pictures.style.left = -index * bannerWidth + 'px';
        }
    });


    //实现小圆点跟着当前元素索引动,在webkitTransitionEnd里面调用
    var getCurrent = function(index) {
        var circle = document.querySelector('.circle');
        var lists = circle.children;
        for (var i = 0; i < lists.length; i++) {
            var li = lists[i];
            li.classList.remove('current');
        }
        lists[index-1].classList.add('current');
    }





    /!*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*!/
    pictures.addEventListener("webkitTransitionEnd",function () {
        if(index == 0) {
            pictures.style.transition = 'none';
            index = lis.length - 2;
            pictures.style.left = -index * bannerWidth + 'px';
        }else if(index == lis.length - 1) {
            index = 1;
            pictures.style.transition = 'none';
            pictures.style.left = -index * bannerWidth + 'px';
        }
        setTimeout(function () {
            clearInterval(timeId);
            timeId = setInterval(function () {
                index ++ ;
                pictures.style.transition = 'all 0.5s';
                pictures.style.left= - bannerWidth * index + 'px';
                setTimeout(function(){
                    if(index == lis.length - 1) {
                        pictures.style.transition = 'none';
                        index = 1;
                        pictures.style.left= - bannerWidth + 'px';
                    }
                },500)
            },2000);
        },100);
        getCurrent(index);


    })
*/

    // zepto.js实现轮播图
    var banner = $('.banner');
    var bannerWidth = banner.width();

    var pictures = $('.pictures');
    var lis = pictures.children();
    var first = lis[0];
    var last = lis[lis.length - 1];

    pictures.append($(first).clone());
    $(last).clone().insertBefore(first);

    var count = pictures.children().length;
    pictures.width(count*bannerWidth);

    pictures.children().width(bannerWidth);
    var index = 1;
    pictures.css('left',-bannerWidth);
    $(window).on('resize', function () {
        bannerWidth = banner.width();
        pictures.width(count*bannerWidth);
        pictures.children().width(bannerWidth);
        pictures.css('left',-bannerWidth*index);
    })


    /*图片轮播的动画效果*/
    var timerId;
    var lists =$('.circle').children();
    setTime();
    function setTime() {
        timerId = setInterval(function () {
            index++;
            pictures.animate(
                {'left': -index * bannerWidth},
                200,
                "ease-in-out",
                function () {
                    if(index == 0) {
                        index = count-2;
                        pictures.css("left",-index*bannerWidth);
                    }else if(index == count -1) {
                        index = 1;
                        pictures.css("left",-index*bannerWidth);
                    }
                    lists.removeClass('current').eq(index-1).addClass('current');
                }
            );

        },1000);
    }

    pictures.on('swipeLeft', function () {
        clearInterval(timerId);
        index++;
        pictures.animate(
            {'left': -index * bannerWidth},
            200,
            "ease-in-out",
            function () {
                if(index == 0) {
                    index = count-2;
                    pictures.css("left",-index*bannerWidth);
                }else if(index == count -1) {
                    index = 1;
                    pictures.css("left",-index*bannerWidth);
                }
                lists.removeClass('current').eq(index-1).addClass('current');
                setTime();
            }
        )
    });

    pictures.on('swipeRight', function () {
        clearInterval(timerId);
        index--;
        pictures.animate(
            {'left': -index * bannerWidth},
            200,
            "ease-in-out",
            function () {
                if(index == 0) {
                    index = count-2;
                    pictures.css("left",-index*bannerWidth);
                }else if(index == count -1) {
                    index = 1;
                    pictures.css("left",-index*bannerWidth);
                }
                lists.removeClass('current').eq(index-1).addClass('current');
                setTime();
            }
        )
    })



}
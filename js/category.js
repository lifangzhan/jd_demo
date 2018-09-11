window.onload = function () {
    var ck_left = document.querySelector('.ck_left');
    var ck_leftHeight = ck_left.offsetHeight;
    var ulBOx = ck_left.querySelector('ul:first-of-type');
    var ulBOxHeight = ulBOx.offsetHeight;

    var staticMax = 0;
    var staticMin = ck_leftHeight - ulBOxHeight;

    var bounceMax = staticMax + 100;
    var bounceMin = staticMin - 100;

    var startY,moveY,endY=0,distanceY;
    ulBOx.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;
    })
    ulBOx.addEventListener('touchmove', function (e) {
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if(distanceY + endY > bounceMax || distanceY + endY < bounceMin) {
            console.log('超出范围了');
            return;
        }
        ulBOx.style.transition = 'none';
        ulBOx.style.top = distanceY + endY + 'px';
    })
    ulBOx.addEventListener('touchend', function () {
        if(distanceY + endY > staticMax) {
            ulBOx.style.transition = 'top 0.5s';
            ulBOx.style.top = staticMax + 'px';
            //需要重置结束时候的值
            endY = staticMax;
        }else if(distanceY + endY < staticMin) {
            ulBOx.style.transition = 'top 0.5s';
            ulBOx.style.top = staticMin + 'px';
            endY = staticMin;
        } else {
            endY += distanceY;
        }

    })


    var lists = ulBOx.children;
    for (var i = 0; i < lists.length; i++) {
       lists[i].index = i;
    }

    //自己封装的tap事件 完成点击事件
    /*tap(ulBOx, function (e) {
        for (var i = 0; i < lists.length; i++) {
            lists[i].classList.remove('current');
        }
        var li = e.target.parentNode;
        li.classList.add('current');
        var index = li.index;
        var liHeight = li.offsetHeight;
        ulBOx.style.transition = 'top 0.5s';
        var ulBoxtop =  - index * liHeight;
        if(ulBoxtop < staticMin) {
            ulBoxtop = staticMin;
        }
        ulBOx.style.top = ulBoxtop + 'px';
        endY = ulBoxtop;
    })*/

    <!-- 使用zepto完成点击事件-->
   /* $(ulBOx).on('tap',function (e) {
        for (var i = 0; i < lists.length; i++) {
                lists[i].classList.remove('current');
            }
            var li = e.target.parentNode;
            li.classList.add('current');
            var index = li.index;
            var liHeight = li.offsetHeight;
            ulBOx.style.transition = 'top 0.5s';
            var ulBoxtop =  - index * liHeight;
            if(ulBoxtop < staticMin) {
                ulBoxtop = staticMin;
            }
            ulBOx.style.top = ulBoxtop + 'px';
            endY = ulBoxtop;
    })*/


    //利用fastclick完成点击事件
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    ulBOx.addEventListener('click', function (e) {
        for (var i = 0; i < lists.length; i++) {
            lists[i].classList.remove('current');
        }
        var li = e.target.parentNode;
        li.classList.add('current');
        var index = li.index;
        var liHeight = li.offsetHeight;
        ulBOx.style.transition = 'top 0.5s';
        var ulBoxtop =  - index * liHeight;
        if(ulBoxtop < staticMin) {
            ulBoxtop = staticMin;
        }
        ulBOx.style.top = ulBoxtop + 'px';
        endY = ulBoxtop;
    })

}
function tap(element,callback) {
    if(!element || typeof element != 'object') {
        return;
    }
    var startX,startY,endX,endY,startTime;
    element.addEventListener('touchstart', function (e) {
        if(e.targetTouches.length > 1) {
            return;
        }
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        startTime = Date.now();

    })
    element.addEventListener('touchend', function (e) {
        if(e.changedTouches.length > 1) {
            return;
        }
        if(Date.now() - startTime > 150) {
            return;
        }
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
            callback && callback(e);
        }

    })
}
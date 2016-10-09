$(function () {
    //header 点击
    $('.header .phone-list .list-nav').on('click', function () {
        $('.header').toggleClass('list-naving');
        //    处理小屏点击的
        $(document.body).toggleClass('hidden');
    })
    $('.phone-list').on('mousedown', false);


    //    moveTo() 接收 jQuery 要动的div
    //    从集合中把有active类名删掉   filter(clsssname)
    //    .next()相邻的下一张
    //    slides.index(elm)元素在集合中的位置
    //    三元运算符
    //    reflow 强制浏览器重新绘制一帧  get(0) 得到dom对象 .offsetWidth  时时获取添加删除类
    //    delay Yu queue 配合使用
    //    active  leave动画  right重绘right  enter进入状态  moveing=false开关
    var slides = $('.imgbox a');
    var dots = $('.dot-list li');
    var content = $(".content_t");
    var moveing = false;
    moveTo = function (dom, dir) {//处理方向
              moveing=true;
        if (dir == 'right') {
            var d = slides.filter('.active').addClass('leave').delay(1000).queue(function () {
                $(this).removeClass('leave').removeClass('active').dequeue();

            })
            $(dom).addClass('active').addClass('right').delay(1000).queue(function () {
                $(this).removeClass('right').dequeue();
                moveing=false;
            })
        }
        if (dir == "left") {
            moveing=true;
            slides.filter('.active').addClass('enter').delay(1000).queue(function () {
                $(this).removeClass('enter').removeClass('active').dequeue();

            })
            $(dom).addClass('active').addClass('left').delay(1000).queue(function () {
                $(this).removeClass('left').dequeue();
                moveing=false;
            })
        }
    }
    var moveright = function () {

        var d = slides.filter('.active')
        var next = d.next().length ? d.next() : slides.eq(0);
        moveTo(next, 'right');
        dots.removeClass('active').eq(slides.index(next)).addClass('active');
    }
    var moveleft = function () {
        var d = slides.filter('.active')
        var prev = d.prev().length ? d.prev() : slides.eq(-1);
        moveTo(prev, 'left');
        dots.removeClass('active').eq(slides.index(prev)).addClass('active');
    }
    var t = setInterval(moveleft, 2000);
    content.hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(moveleft, 2000)
    })
    dots.on('click', function () {
        dots.filter('.active').removeClass('active');
        var d = $(this).addClass('active');
        var next = dots.index($(this));
        var index = slides.index(slides.filter('.active'));
        if (next == index) {
            return;
        }
        if (index < next) {
            moveTo(slides[dots.index($(this))], 'left')
        } else {
            moveTo(slides[dots.index($(this))], 'right')
        }
    })
    $('.btnbox').on('mousedown', false);
    $('.btnbox .l').on('click', function () {
        if(!moveing){
            moveleft()
        }
    })
    $('.btnbox .r').on('click', function () {
        if (!moveing) {
            moveright()
        }
    })
    $('.lists .lists-content h3').on('click', function () {
        // $(this).parent().next().toggleClass('uls');
        $(this).parent().next().slideToggle();
    })
})
// 平滑滚动，配合目录使用
function scrollspy() {
    var navbarHeight = 0;
    $("#page-scrollspy a.nav-link").on('click', function () {
        /* decode chinese hash */
        var target = decodeURI(this.hash.replace(/^#/, ''));
        var scrollSpeed = 400;
        $('html,body').animate({scrollTop: $(":header[id='" + target + "']").offset().top - navbarHeight}, scrollSpeed);
        return false;
    });
}

scrollspy();
// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollTopButton()};

// 只有向下滚动超过20px后才会显示按钮, 其他情况按钮隐藏
// function scrollTopButton() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     document.getElementById("goTopBtn").style.display = "block";
//   } else {
//     document.getElementById("goTopBtn").style.display = "none";
//   }
// }


//Smooth scroll to the top of the document
// 平滑回滚到顶部
function smoothScrollTop(){
    var timer  = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn(){
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(oTop > 0){
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 150;
            timer = requestAnimationFrame(fn);
        }else{
            cancelAnimationFrame(timer);
        }
    });
}
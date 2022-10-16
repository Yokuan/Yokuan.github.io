// 设置月份
const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
];


function drawChartGrid(pointsData) {
    // 绘制贡献点矩阵 12x7
    let $el = $(".hotmap .background .pointsBar");
    // $el.css("--point-size", `${ $el.width() / 12 }px`);
    for ( let h = 0; h < 12; h++ ) {
        for ( let v = 0; v < 7; v++ ) {
            $el.append(`<div class="point"></div>`);
        }
    }

    // 获取当前日期
    let nowDate = new Date();
    // 获取 84 天前的日期
    // let oldDate = new Date(nowDate.getTime()-84*24*3600*1000);
    console.log(nowDate.getDay());
    if (nowDate.getDay() == 0) {
      var oldDate = new Date(nowDate.getTime()+((7-7)-83)*24*3600*1000);
    } else {
      var oldDate = new Date(nowDate.getTime()+((7-nowDate.getDay())-83)*24*3600*1000);
    }
    // console.log(new Date(nowDate.getTime()+((7-nowDate.getDay())-83)*24*3600*1000));
    // console.log(nowDate);
    // console.log(oldDate);
    drawPoints(nowDate.getDay(), pointsData(oldDate));
    drawMonths(oldDate);
}

// 绘制贡献点
function drawPoints(index, data) {
    // index 为星期几
    // let start = index - 1 < 0 ? 6 : index - 1;
    let start = 0;
    // let end = start === 6 ? 372 : 365 + index;
    if (index == 0) {
      var end = 84;
    } else {
      var end = 84 - (7-index);
    }


    $(`.hotmap .background .pointsBar .point`).slice(start, end).each((i, el) => {
      setPointColor(el, data[i].number);
      $(el).on({
        "mouseenter": () => {
          openPointPopup(data[i], el);
          $(el).addClass("point-hover")
               .next(".point-popup")
               .addClass("open-point-popup")
               .removeClass("close-point-popup");
        },
        "mouseleave": () => {
          $(el).removeClass("point-hover")
               .next(".point-popup")
               .addClass("close-point-popup")
               .removeClass("open-point-popup");
        },
      });
    });
}

// 鼠标悬浮时发出提示
function openPointPopup(data, el) {
    if ( !$(el).next(".point-popup").length ) {
      $(el).after(`
        <div class="point-popup close-point-popup" style="top: ${ el.offsetTop}px; left: ${ el.offsetLeft + el.clientWidth*1.5}px;">
          <div>${ data.date } : ${ data.number } 篇文章</div>
        </div>
      `);
    }
}

// 随机生成贡献点
function getPointsData(date) {
    // 获取所有文章的日期
    var datelist = [];
    var pointDate = $(".pointDate");
    $.each(pointDate,function (index,don){
        datelist.push(don.innerText);
    });
    console.log(typeof(datelist));

    let outcome = [];
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let end = day;

    for ( let m = 0; m < 4; m++ ) {
      let maxDayOfMonth = new Date(year, month, 0).getDate();
      for ( let d = day; d <= maxDayOfMonth; d++ ) {
        // 生成随机函数
        // let number = Math.floor(Math.random() * 5);
        let number = 0;
        // 日期格式封装，补零
        let date = `${ year }-${ month.toString().padStart(2,'0') }-${ d.toString().padStart(2,'0') }`;
        for (const i in datelist) {
          if (datelist[i] == date){
            number += 1;
          }
        }
        // 装入列表
        outcome.push({ date, number });
      }
      month++;
      day = 1;
      if ( month > 12 ) {
        month = 1;
        year++;
      }
    }

    // for ( let d = 1; d <= end; d++ ) {
    //   let number = Math.floor(Math.random() * 30);
    //   let date = `${ year }-${ month }-${ d }`;
    //   outcome.push({ date, number });
    // }
    console.log(outcome);
    return outcome;
}

// 绘制月份栏
function drawMonths(date) {
    let indexOfMonth = date.getMonth();
    for ( let m = 0; m < 4; m++ ) {
      if ( indexOfMonth === 12 ) indexOfMonth = 0;
      $(".hotmap .background .monthsBar").append(`
        <div class="month">${ months[indexOfMonth] }</div>
      `);
      indexOfMonth++;
    }
}

// 设置贡献点颜色
function setPointColor(el, number) {
    if ( number > 0 && number <= 1 ) {
      $(el).addClass("a-type-point");
    } else if ( number > 1 && number <= 2 ) {
      $(el).addClass("b-type-point");
    } else if ( number > 2) {
      $(el).addClass("c-type-point");
    } else {
      $(el).addClass("d-type-point");
    }
}

drawChartGrid(
  (date) => getPointsData(date),
);
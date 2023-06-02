function countStep(counter, final_num, current, step) {
  current += step;
  if (current > final_num)
    current = final_num;
  else {
    setTimeout(function(){countStep(counter, final_num, current, step)}, 20);
  }
  counter.html(current.toLocaleString("en-US"));
}

$(function () {
  $(".counter").each(function() {
    let counter = $(this);
    let start = parseInt(counter.data("start"));
    counter.html(start);
  });
});

$(window).scroll(function() {
  let scroll = $(this);
  $(".counter").each(function() {
    let counter = $(this);
    let hT = counter.offset().top,
      hH = counter.outerHeight(),
      wH = $(window).height(),
      wS = scroll.scrollTop();
    if (wS > (hT+hH-wH)) {
      if (!counter.data("done")) {
        counter.data("done", 1);
        let final_num = parseInt(counter.data("final"));
        let start = parseInt(counter.data("start"));
        let step = parseInt(counter.data("step"));
        setTimeout(function(){countStep(counter, final_num, start, step)}, 20);
      }
    }
  });
});

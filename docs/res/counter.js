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

  countHandler();
  $(window).scroll(function() {
    countHandler();
  });
});

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function countHandler() {
  $(".counter").each(function() {
    let counter = $(this);
    if (counter.data("done"))
      return

    if (counter.isInViewport()) {
      counter.data("done", 1);
      let final_num = parseInt(counter.data("final"));
      let start = parseInt(counter.data("start"));
      let step = parseInt(counter.data("step"));
      countStep(counter, final_num, start, step);
    }
  });
}

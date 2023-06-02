$(function () {
    $('.infographic').each(function () {
        let node = $(this).children();
        let repeat_number = $(this).data('repeat');
        let newline = $(this).data('newline');
        $(this).empty();

        for (let i = 0; i < repeat_number; i++) {
            let node_copy = node.clone();
            $(this).append(node_copy).append(' ');
            if ((i + 1) % newline == 0)
                $(this).append('<br />');
        }
    });

    scrollHandler();
    $(window).scroll(function() {
        scrollHandler();
    });
});

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function scrollHandler() {
    $(".infographic").each(function() {
        let infographic = $(this);
        if (infographic.data("done"))
            return
        
        if (infographic.isInViewport()) {
            infographic.data("done", 1);
            let highlight_number = infographic.data("highlight");
            highlightIth($(this), 0, highlight_number);
        }
    });
}

function highlightIth(infographic, current, total) {
    let node = infographic.find("i:nth-child("+(current+1)+")");
    node.addClass('highlight-icon');

    current++;
    console.log(current);
    if (current < total)
        setTimeout(function(){highlightIth(infographic, current, total)}, 400);
}
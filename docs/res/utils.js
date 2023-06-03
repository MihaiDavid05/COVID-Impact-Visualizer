$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-covid");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 5);
    });

    let modal = $("#myModal");
    modal.draggable({
        handle: ".dragable-touch",
    });
    modal.resizable();
});

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
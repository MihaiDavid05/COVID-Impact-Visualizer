$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-covid");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 5);
    });
});
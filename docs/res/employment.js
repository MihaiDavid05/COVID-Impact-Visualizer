$(function () {
    $('.infographic').each(function () {
        let node = $(this).children();
        let repeat_number = $(this).data('repeat');
        let highlight_number = $(this).data('highlight');
        let newline = $(this).data('newline');
        $(this).empty();

        for (let i = 0; i < repeat_number; i++) {
            let node_copy = node.clone();
            if (i < highlight_number)
                node_copy.addClass('highlight-icon');

            $(this).append(node_copy).append(' ');
            if ((i + 1) % newline == 0)
                $(this).append('<br />');
        }
    });
});

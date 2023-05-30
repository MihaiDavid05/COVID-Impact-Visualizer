$(function() {
    function count($this){
        var current = parseInt($this.html().replaceAll(",",""), 10);
        const step = Math.floor($this.data('count') / 100)
        current = current + step;
        $this.html(current.toLocaleString("en-US"));
        if(current > $this.data('count')){
            $this.html($this.data('count').toLocaleString("en-US"));
        } else {
            setTimeout(function(){count($this)}, 5);
        }
    }        
  $(".numbers-highlight-beginning").each(function() {
    $(this).css('visibility', 'visible');
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
  });
});

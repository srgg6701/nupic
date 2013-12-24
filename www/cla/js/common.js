$(function(){
    $('[type="range"]').on('change',function(){
        document.getElementById($(this).attr('data-bind')).value=$(this).val();
    });
    $('[data-range-id]').on('keyup', function(){
        document.getElementById($(this).attr('data-range-id')).value=$(this).val();
    });
    $('.minus').on('click', function(){
       changeValue(this);
    });
    $('.plus').on('click', function(){
       changeValue(this);
    });
});

/**
 * Change block value
 */
function changeValue(btn) {
    var func = (btn.className.indexOf('minus')!=-1)? 'next':'prev'; 
    var vBlock = $(btn)[func]('span');
    var cVal = parseInt($(vBlock).text());
    if(func=='next') {
        if(cVal>1) --cVal;
    }
    else ++cVal;
    $(vBlock).text(cVal);
}
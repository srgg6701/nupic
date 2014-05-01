$(function() {
    // interval, iterations
    $('[type="range"]').on('change', function() {
        syncRanges(this, 'data-bind');
        var settings_name=(this.id=='limit')? 'iterations_limit':'interval';
        handleDb(settings_name, this.value);
    });
    $('[data-range-id]').on('keyup', function() {
        syncRanges(this, 'data-range-id');
    });
    // show inhibition area
    $('[data-col-num]').on('mouseenter', function(){
        var currentColumnNumber = $(this).attr('data-col-num');

    });
    // show inhibition area
    $('[data-col-num] div').on('click mouseenter', function(event){
        if(event.type=='click'){
            dropColsFixation();
            $(this).attr('data-col-state','fixed');
        }
        if(event.type=='click'||$(this).attr('data-col-state')||!$('[data-col-state]').size())
            setInhibitionArea(this);
    });

    // clear all borders
    $('#td-clear').on('click', function(){
        $('[data-col-num]').removeClass('inhibition_area');
        dropColsFixation();
    });
    //-------------------------------------------------------------------
    // avoid selecting +/-
    $('.minus div, .plus div').on('selectstart', function(){ return false; });
});
/**
 * synchronize values in the range element and the input element
 */
function syncRanges(obj, binded_id){
    document.getElementById($(obj).attr(binded_id)).value = $(obj).val();
}
/**
 * */
function dropColsFixation(){
    $('div').removeAttr('data-col-state');
}
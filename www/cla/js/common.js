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
        var colNum = $(this).attr('data-col-num');
        // calculate its number in the row
        var rows = Matrix.columnsSets[Matrix.settings.columns][0];
        var cols = Matrix.columnsSets[Matrix.settings.columns][1];
        var numberInRow = colNum%cols; console.log('numberInRow = '+numberInRow);
    });
    $('[data-col-num] div').on('click', function(){
        $(this).parent().toggleClass('borderGrey');
        //console.dir(event.currentTarget);
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
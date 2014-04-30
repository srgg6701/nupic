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

    });
    $('[data-col-num] div').on('click', function(){
        var colRect = $(this).parent();
        $(colRect).toggleClass('borderGrey');
        var colNum = parseInt($(colRect).attr('data-col-num'));
        // calculate its number in the row
        //var rows = Matrix.columnsSets[Matrix.settings.columns][0];
        // cols in Matrix
        var cols = Matrix.columnsSets[Matrix.settings.columns][1];
        //
        var numberInRow = colNum%cols; //console.log('numberInRow = '+numberInRow);
        var inhRadius = Matrix.settings.inhibition_radius[0];
        // calculate the rows above the column
        var rows_above = (colNum-numberInRow)/cols,
            recHorizontalLen = inhRadius*2;



    });

    // clear all borders
    $('#td-clear').on('click', function(){
        $('[data-col-num]').removeClass('borderGrey');
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
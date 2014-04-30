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
    $('[data-col-num] div').on('click', function(){
        var colRect = $(this).parent();
        $(colRect).toggleClass('borderGrey');
        //
        var currentColumnNumber = parseInt($(colRect).attr('data-col-num'));
        // calculate its number in the row
        var rows = Matrix.columnsSets[Matrix.settings.columns][0];
        // columnsInMatrix in Matrix
        var columnsInMatrix = Matrix.columnsSets[Matrix.settings.columns][1];
        //
        var numberInRow = currentColumnNumber%columnsInMatrix; //console.log('numberInRow = '+numberInRow);
        var inhRadius = Matrix.settings.inhibition_radius[0];
        // calculate the rows above the column
        var rows_above = (currentColumnNumber-numberInRow)/columnsInMatrix,
            //              107 - 8 / 11
            rows_bellow = rows_above+inhRadius+ 1,
            recHorizontalLen = inhRadius*2;

        var leftEdge=null,
            topEdge=null,
            rightEdge=null,
            bottomEdge=null;

        if((currentColumnNumber%columnsInMatrix==0)
            || currentColumnNumber%columnsInMatrix>inhRadius)
            leftEdge = true;

        if(rows_above>=inhRadius)
            topEdge = true;

        if((currentColumnNumber%columnsInMatrix>0)
            && currentColumnNumber%columnsInMatrix<=recHorizontalLen+2)
            rightEdge = true;

        if(rows_bellow<=rows)
            bottomEdge = true;
            
        console.log('leftEdge: '+leftEdge+'\ntopEdge: '+topEdge+'\nrightEdge: '+rightEdge+'\nbottomEdge: '+bottomEdge);

        var topLeft=null,
            topRight=null,
            bottomLeft=null,
            bottomRight=null;
        

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
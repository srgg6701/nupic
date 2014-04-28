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
        var rows = Matrix.columnsSets[Matrix.settings.columns][0];
        var cols = Matrix.columnsSets[Matrix.settings.columns][1];
        //
        var numberInRow = colNum%cols; //console.log('numberInRow = '+numberInRow);
        var inhRadius = Matrix.settings.inhibition_radius[0];
        // calculate the rows above the column
        var rows_above = (colNum-numberInRow)/cols,
            row_length = inhRadius*2;
        // inhibition area corners (numbers of divs)
        var topLeft     = colNum-inhRadius-(cols*inhRadius),
            topRight    = colNum+inhRadius-(cols*rows_above),
            bottomLeft  = colNum-inhRadius+(cols*inhRadius),
            bottomRight = colNum+inhRadius+(cols*inhRadius);
        /*  if topLeft <1
                ! topRight
            if topLeft % cols > (cols - colNum+inhRadius)
                ! topRight
            if bottomLeft % cols > (cols - colNum+inhRadius)
                ! bottomRight
            if bottomRight > Matrix.columns
                ! bottomRight

            if bottomRight % cols < row_length+1
                ! bottomLeft
        */

        if(topLeft>0 && topRight % cols >= row_length+1)
            $('[data-col-num="'+topLeft+'"]').addClass('borderGrey');

        if(topLeft>0 && (topLeft % cols <= cols - row_length))
            $('[data-col-num="'+topRight+'"]').addClass('borderGrey');

        if(bottomRight <= Matrix.columns && bottomLeft % cols <= (cols - colNum+inhRadius))
            $('[data-col-num="'+bottomRight+'"]').addClass('borderGrey');

        if(bottomRight % cols >= row_length+1)
            $('[data-col-num="'+bottomLeft+'"]').addClass('borderGrey');



        console.log('colNum('+typeof(colNum)+'): '+
                    colNum+'\ninhRadius('+typeof(inhRadius)+'): ' +
                    inhRadius+'\nrow_length('+typeof(row_length)+'): '+
                    row_length+'\nrows_above('+typeof(rows_above)+'): '+
                    rows_above+'\n\ntopLeft('+typeof(topLeft)+'): '+
                    topLeft+'\ntopRight('+typeof(topRight)+'): '+
                    topRight+'\nbottomLeft('+typeof(bottomLeft)+'): '+
                    bottomLeft+'\nbottomRight('+typeof(bottomRight)+'): '+
                    bottomRight);


        $('[data-col-num="'+bottomLeft+'"]').addClass('borderGrey');
        $('[data-col-num="'+bottomRight+'"]').addClass('borderGrey');

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
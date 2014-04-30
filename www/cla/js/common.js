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
        var rows = parseInt(Matrix.columnsSets[Matrix.settings.columns][0]);
        // columnsInMatrix in Matrix
        var columnsInMatrix = parseInt(Matrix.columnsSets[Matrix.settings.columns][1]);
        //
        var numberInRow = currentColumnNumber%columnsInMatrix; //console.log('numberInRow = '+numberInRow);
        if(numberInRow===0) numberInRow = columnsInMatrix;
        var inhRadius = parseInt(Matrix.settings.inhibition_radius[0]);
        // calculate the rows above the column
        var rows_above = (currentColumnNumber-numberInRow)/columnsInMatrix,
            //              107 - 8 / 11
            rows_above_real=(rows_above<inhRadius)? rows_above:inhRadius,
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
            
        var topLeft=null,
            topRight=null,
            bottomLeft=null,
            bottomRight=null;

        var rowLenFromLeft=null,
            rowLenFromRight=null;

        if(leftEdge){
            if(topEdge){
                topLeft = currentColumnNumber-inhRadius-(columnsInMatrix*inhRadius);
            }else{
                topLeft = currentColumnNumber-(columnsInMatrix*rows_above_real)-inhRadius;
                /*console.log('topLeft: '+topLeft+'\ncurrentColumnNumber: '+currentColumnNumber+
                    '-'+(columnsInMatrix*rows_above_real)+'-'+inhRadius);*/
            }
            if(bottomEdge){
                bottomLeft = currentColumnNumber-inhRadius+(columnsInMatrix*inhRadius);
                $('[data-col-num="'+bottomLeft+'"]').addClass('borderGrey');
            }
            rowLenFromLeft = inhRadius+1+columnsInMatrix-numberInRow;
            if(rowLenFromLeft>columnsInMatrix) rowLenFromLeft=columnsInMatrix;
        }else{
            topLeft = currentColumnNumber-(columnsInMatrix*rows_above_real)-numberInRow+1;
        }   /*console.log('topLeft: '+topLeft+'\ncurrentColumnNumber: '+currentColumnNumber+
            '-'+(columnsInMatrix*rows_above_real)+'-'+numberInRow+'+1');*/

        if(rightEdge){
            if(topEdge){
                topRight = currentColumnNumber+inhRadius-(columnsInMatrix*inhRadius);
            }else{
                if(leftEdge){
                    topRight = topLeft+inhRadius*2;
                    console.log('topRight: '+topRight+' = '+topLeft+
                        '+'+columnsInMatrix+'-'+numberInRow+'+'+inhRadius);
                }else{
                    topRight = topLeft + numberInRow-1+inhRadius;
                }
            }

            if(bottomEdge){
                bottomRight = currentColumnNumber+inhRadius+(columnsInMatrix*inhRadius);
                $('[data-col-num="'+bottomRight+'"]').addClass('borderGrey');
            }
        }else{
            if(!topEdge){
                topRight = topLeft+columnsInMatrix-numberInRow+inhRadius;
                console.log('topRight: '+topRight+' = '+topLeft+
                    '+'+columnsInMatrix+'-'+numberInRow+'+'+inhRadius);
            }
        }

        $('[data-col-num="'+topLeft+'"]').addClass('borderGrey');
        $('[data-col-num="'+topRight+'"]').addClass('borderGrey');

        console.log('leftEdge: '+leftEdge+'\ntopEdge: '+topEdge+'\nrightEdge: '+rightEdge+'\nbottomEdge: '+bottomEdge);


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
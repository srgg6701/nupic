$(function(){
    // set input mode
    $('input[name="ffi-order"]').on('click', function(){
        handleDb('input_mode',this.value);
    });
    // set distortion type
    $('#erosion, #random_offset').on('click', function(){
        var distortion='';
        if(this.checked) distortion=this.id;
        handleDb('distortion', distortion);
    });
});
/**
 * Called on load
 * it is here because it is being called from the index page as well
 */
function setColumnsArea(select) { // if redefine set
    //
    var mGrid = 'mGrid';
    var getSelVal = function () {
        return parseInt($('option:selected', select).val());
    };
    if (select) { // got selected columns' number onChange
        $('#' + mGrid).remove();
        // store data in local storage
        var sets = getDb();
        sets.settings.columns = getSelVal();
        setDb(sets);
    }
    else select = Matrix.getColsSelect(); //console.dir(select);
    //
    var activeSet = Matrix.columnsSets[getSelVal()];
    var cHeight = Matrix.regionSpace.height / activeSet[0];
    var cWidth = Matrix.regionSpace.width / activeSet[1];
    //console.log('rows: '+activeSet[0]+'('+cHeight+'), cols: '+activeSet[1]+'('+cWidth+')');
    var cover = $('<div/>', {
        id: mGrid
    }).css({
            //background:'yellow',
            //opacity:    0.65,
            position: 'absolute',
            top: Matrix.regionSpace.top + 'px',
            left: Matrix.regionSpace.left + 'px',
            width: Matrix.regionSpace.width + 'px',
            height: Matrix.regionSpace.height + 'px'
        });
    $('body').prepend(cover);
    var colDm = $('td', Matrix.lines[0]).eq(1).width();
    var vMargin = (cHeight - colDm) / 2;
    var curStyle,
        fullStyle,
        cStyle = 'height:' + cHeight + 'px; ' +
            'width:' + cWidth + 'px; ' +
            'line-height:' + cHeight + 'px; ',
        innerStyle = 'margin-top:' + vMargin + 'px; margin-bottom:' + vMargin + 'px',
        colNum=0;
    for (var i = 0; i < activeSet[0]; i++) {
        curStyle = cStyle + 'top:' + cHeight * i + 'px;';
        for (var j = 0; j < activeSet[1]; j++) {
            colNum++;
            fullStyle = curStyle + 'left:' + cWidth * j + 'px;';
            $(cover).append('<div data-col-num="'+colNum+'" style="' + fullStyle + '" class="column"><div style="height:' + colDm + 'px; width:' + colDm + 'px;' + innerStyle + '"></div></div>');
        }
    }
}
/**
 * Change block value
 */
function changePlusMinus(btn) {
    var func;
    if (btn.className.indexOf('minus') != -1) {
        func = 'next';
    } else {
        func = 'prev';
    }

    var vBlock = $(btn)[func]('span'),
        cVal = parseInt($(vBlock).text()),
        fId = $(vBlock).attr('id'),
        matrixSet;

    switch ($(btn).parent('span').attr('id')){
        case 'cells_per_column':
            matrixSet = 'cells';
            break;
        case 'inhibition_radius':
            matrixSet = 'inhibition_radius';
            break;
    }
    // change value if limit allows
    if (func == 'next') {
        if (cVal > Matrix.limit[matrixSet].min)
            cVal -= 1;
    } else {
        if (cVal < Matrix.limit[matrixSet].max)
            cVal += 1;
    }
    $(vBlock).text(cVal);
    handleDb(matrixSet,cVal);
}
/**
 * Save radiobuttons ordered/random settings
 */
/*function setInputMode(value){
    handleDb('input_mode',value);
}*/


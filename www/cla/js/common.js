$(function() {
    $('[type="range"]').on('change', function() {
        document.getElementById($(this).attr('data-bind')).value = $(this).val();
    });
    $('[data-range-id]').on('keyup', function() {
        document.getElementById($(this).attr('data-range-id')).value = $(this).val();
    });
    Matrix.getColsSelect().onchange = function(event){
        // get current colums set:
        setColumns(event.currentTarget);
    };
});

/**
 * Change block value
 */
function changeValue(btn) {
    var func;
    if (btn.className.indexOf('minus') != -1) {
        func = 'next';
    } else {
        func = 'prev';
    }

    var vBlock = $(btn)[func]('span');
    var cVal = parseInt($(vBlock).text());
    var fId = $(vBlock).attr('id');

    // change value if limit allows
    if (func == 'next') {
        if (cVal > Matrix.limit.cells.min)
            cVal -= 1;
    } else {
        if (cVal < Matrix.limit.cells.max)
            cVal += 1;
    }

    $(vBlock).text(cVal);
}
/**
 *
 */
function setColumns(select){ // if redefine set

    var mGrid = 'mGrid';
    var getSelVal = function(){
        return parseInt($('option:selected',select).val());
    };
    if(select) { // got selected columns' number onChange
        $('#'+mGrid).remove();
        // store data in local storage
        var sets=JSON.parse(window.localStorage.getItem('settings'));
        sets.settings.columns = getSelVal();
        window.localStorage.setItem('settings',JSON.stringify(sets));
    }
    else select = Matrix.getColsSelect(); //console.dir(select);
    //
    var activeSet = Matrix.columnsSets[getSelVal()];
    var cHeight = Matrix.regionSpace.height/activeSet[0];
    var cWidth  = Matrix.regionSpace.width/activeSet[1];
    //console.log('rows: '+activeSet[0]+'('+cHeight+'), cols: '+activeSet[1]+'('+cWidth+')');
    var cover = $('<div/>',{
            id:mGrid
        }).css({
        //background:'yellow',
        //opacity:    0.65,
        position:   'absolute',
        top:        Matrix.regionSpace.top+'px',
        left:       Matrix.regionSpace.left+'px',
        width:      Matrix.regionSpace.width+'px',
        height:     Matrix.regionSpace.height+'px'
    });
    $('body').prepend(cover);
    var colDm = $('td',Matrix.lines[0]).eq(1).width();
    var vMargin = (cHeight-colDm)/2;
    var curStyle,
        fullStyle,
        cStyle = 'height:'+cHeight+'px; '+
                 'width:'+cWidth+'px; '+
                 'line-height:'+cHeight+'px; ',
        innerStyle='margin-top:'+vMargin+'px; margin-bottom:'+vMargin+'px';
    for(var i=0; i<activeSet[0];i++){
        curStyle = cStyle+'top:'+cHeight*i+'px;';
        for(var j=0; j<activeSet[1];j++){
            fullStyle = curStyle+'left:'+cWidth*j+'px;';
            $(cover).append('<div style="'+fullStyle+'" class="column"><div style="height:'+colDm+'px; width:'+colDm+'px;'+innerStyle+'"></div></div>');
        }
    }
}

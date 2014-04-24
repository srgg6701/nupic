$(function() {
    $('[type="range"]').on('change', function() {
        syncRanges(this, 'data-bind');
    });
    $('[data-range-id]').on('keyup', function() {
        syncRanges(this, 'data-range-id');
    });
    // avoid selecting +/-
    $('.minus div, .plus div').on('selectstart', function(){ return false; });
});
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
}
/**
 * synchronize values in the range element and the input element
 */
function syncRanges(obj, binded_id){
    document.getElementById($(obj).attr(binded_id)).value = $(obj).val();
}
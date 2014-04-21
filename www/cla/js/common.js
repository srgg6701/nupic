$(function() {
    $('[type="range"]').on('change', function() {
        document.getElementById($(this).attr('data-bind')).value = $(this).val();
    });
    $('[data-range-id]').on('keyup', function() {
        document.getElementById($(this).attr('data-range-id')).value = $(this).val();
    });
});

/**
 * Change block value
 */
function changeColumnsNumber(btn) {
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
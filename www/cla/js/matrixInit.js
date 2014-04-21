//
$(function() {
    // set data from local storage
    Matrix.handleSettings();
    // get table headers:
    Matrix.makeMatrixMap('headers');
    // set id id to the cells:
    Matrix.makeMatrixMap();
    // create 2D array of possible sets of columns, choose current value from select
    Matrix.setMatrixColumnsRange();
    // arrange columns area
    setColumnsArea();
    /*  arrange other settings: */
    // distortion: null,
    //setDistortion();
    // cells: [null, 8],
    $('#numCells').text(Matrix.settings.cells[0]);
    //setCells();
    // input_mode: [null, 'random'],
    // interval: [false, 1000],
    // iterations_limit: [false, 0],
    // inhibition_radius: [null, 2]

});
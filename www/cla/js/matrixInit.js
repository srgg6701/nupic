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
    // cells: [null, 8],
    // input_mode: [null, 'random'],
    // interval: [false, 1000],
    // iterations_limit: [false, 0],
    // inhibition_radius: [null, 2]

});
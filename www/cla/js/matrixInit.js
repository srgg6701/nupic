//
$(function() {
    // set data from local storage */
    Matrix.handleSettings();
    // get table headers:
    Matrix.makeMatrixMap('headers');
    // set id id to the cells:
    Matrix.makeMatrixMap();
    // create 2D array of possible sets of columns, choose current value from select
    Matrix.setMatrixColumnsRange();
    // arrange columns area
    setColumnsArea();
    /*  arrange other settings:
    distortion, num cells, interval, iterations_limit, inhibition_radius*/
    Matrix.pushSettingsToHTML();
});
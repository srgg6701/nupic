//
$(function() {
    // get table headers:
    Matrix.makeMatrixMap('headers');
    // set id id to the cells:
    Matrix.makeMatrixMap();
    // create 2D array of possible sets of columns, choose current value from select
    Matrix.setMatrixColumnsRange();
    //
    setColumns();
});
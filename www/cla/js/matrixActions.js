$( function(){
    $('#ffi-ordered').on('click', function(){
        if($('#limit').val()=='0')
            $('#limit').val('10'); // by default, equals to the inputs length
    });
    // manage erosion:
    $('#erosion').on('click', function(){
        switchDistortionType(this);
    });
    // manage random offset:
    $('#random_offset').on('click', function(){
        switchDistortionType(this);
    });
    // run or stop Matrix:
    $('#'+Matrix.switcher.button_id).on('click', function(){
        console.log('Matrix is: '+Matrix.run);
        (!Matrix.run)? runMatrix():stopMatrix();
    });
    // re-set columns
    Matrix.getColsSelect().onchange = function(event){
        // re-arrange columns set:
        setColumnsArea(event.currentTarget);
    };

});

/**
 * Switch distortion types
 */
function switchDistortionType(obj) {
    var distortion_type_alt, distortion_type=obj.id;
    Matrix[distortion_type]=obj.checked;
    if(distortion_type=='erosion'){
        distortion_type_alt='random_offset';
    }else{
        if(distortion_type=='random_offset'){
            distortion_type_alt='erosion';
        }
    } //console.log('distortion_type = '+distortion_type+', distortion_type_alt = '+distortion_type_alt);
    if(obj.checked){
        Matrix[distortion_type_alt]=false;
        $('#'+distortion_type_alt).attr('checked', false);
    }
}
/**
 * interval - ms duration
 * static - use static data from the beginning to the end, once
 * in order to using random data set logical false
 * limit - iteration limit. To make it internal, set logical false or nothing
 */
function runMatrix(once) { // Matrix's going to have you, Neo! :)
    var interval,static,limit;

    static=$('input[name="ffi-order"]:checked').val();
    if (once) {
        limit=1;
        interval=0;
    }else{
        limit=$('#limit').val();
        if(!(interval=$('#interval').val()))
            interval='1000';
    } /*    console.log('interval = '+interval+', static('+typeof(static)+') = '+static+', limit = ' + limit);
    */
    var inputNumber, iterationNumber=0;
    var dt, hrs, mnts, secs;
    var showCurrentInfo=function() {
        iterationNumber++;
        $('#iteration_number').html(iterationNumber);
        dt = new Date();
        hrs = dt.getHours();
            if(hrs<10) hrs='0'+hrs;
        mnts = dt.getMinutes();
            if(mnts<10) mnts='0'+mnts;
        secs = dt.getSeconds();
            if(secs<10) secs='0'+secs;
        
        $('#log').prepend('<div>'+ hrs   + ' : '
                                 + mnts  + ' : '
                                 + secs  + ' : '
                                 + dt.getMilliseconds()
        + ' <div style="float: right">data: <b>' + inputNumber+'</b></div>'
                                 + '</div>');
    }
    // ordered input
    if(static>0){
        var inputNumber=0;
        var staticInputs = [1,2,3,4,5,6,7,8,9,10];
        //
        //console.log('staticInputs.length: '+staticInputs.length);
        var runMatrixAnyway = function(){ 
            //console.log('input index = '+(inputNumber+Matrix.corrections.y));           
            Matrix.feedInputs(inputNumber+Matrix.corrections.y);            
            inputNumber++; //console.log('inputNumber end = '+inputNumber);
            showCurrentInfo();
            if(limit){ //12
                //console.log('limit = '+limit+', inputNumber = '+inputNumber);
                if(limit==inputNumber) {// stop it before end comes
                    stopMatrix();
                }else if(limit>staticInputs.length){ // 12>10 go on     
                    if(inputNumber==staticInputs.length){
                        inputNumber=0;                   
                        limit-=staticInputs.length;
                    }
                }
            }
        };
        // initial iteration is without duration
        if(!inputNumber){ //console.log('%cno inputNumber, runMatrixAnyway, inputNumber: '+inputNumber,'color:blue');
            runMatrixAnyway();
        }
        Matrix.indervalId=setInterval(function(){ //console.log('%cSet interval','color:brown');            
            if(staticInputs[inputNumber]){ //console.log('staticInputs['+inputNumber+'] = '+staticInputs[inputNumber]);
                runMatrixAnyway(); 
            }else{
                stopMatrix();
            }
        }, interval);
    }else{ // if we want to implement unordered (random) iterations 
        //
        Matrix.indervalId=setInterval(function(){ 
            inputNumber=Math.round(Math.random() * (10 - 1) + 1);
            //console.log('runMatrix, inputNumber = '+inputNumber);
            Matrix.feedInputs(inputNumber);
            if(limit){
                limit--;
                if(!limit)
                    stopMatrix();
            }
            showCurrentInfo();
        }, interval);
    }
    Matrix.run=true;
    Matrix.switcher.changeBtnVal();
}
/**
 *
 */
function runMatrixOnce(){
    if(Matrix.run) stopMatrix();
    runMatrix(true);
}
/**
 * Stop it, Neo!!! :)
 */
function stopMatrix() {
    clearInterval(Matrix.indervalId);
    Matrix.run=false;
    Matrix.switcher.changeBtnVal();
}
/**
 * Set inhibition area of active column
 */
function setInhibitionArea(column){
    var colRect = $(column).parent();
    $(colRect).toggleClass('borderGrey');
    //
    var currentColumnNumber = parseInt($(colRect).attr('data-col-num'));
    // calculate its number in the row
    var rows = parseInt(Matrix.columnsSets[Matrix.settings.columns][0]);
    // columnsInMatrix in Matrix
    var columnsInMatrix = parseInt(Matrix.columnsSets[Matrix.settings.columns][1]);
    //
    var numberInRow = currentColumnNumber%columnsInMatrix;
    if(numberInRow===0) numberInRow = columnsInMatrix;
    var inhRadius = parseInt(Matrix.settings.inhibition_radius[0]);
    // calculate the rows above the column
    var rows_above = (currentColumnNumber-numberInRow)/columnsInMatrix,
        rows_above_real=(rows_above<inhRadius)? rows_above:inhRadius,
        rows_bellow = rows_above+inhRadius+ 1,
        rows_bellow_real = null,
        recHorizontalLen = inhRadius*2;
    var fullRowsBellowAmount=Math.floor((Matrix.settings.columns-currentColumnNumber)/columnsInMatrix),
        rows_bellow_real = (fullRowsBellowAmount<inhRadius)?
            fullRowsBellowAmount:inhRadius;

    var leftEdge=null,
        topEdge=null,
        rightEdge=null,
        bottomEdge=null,
        topLeft,topRight,bottomLeft,bottomRight;

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

    if(leftEdge){
        if(topEdge)
            topLeft = currentColumnNumber-inhRadius-(columnsInMatrix*inhRadius);
        else
            topLeft = currentColumnNumber-(columnsInMatrix*rows_above_real)-inhRadius;
    }else
        topLeft = currentColumnNumber-(columnsInMatrix*rows_above_real)-numberInRow+1;

    if(rightEdge){
        if(topEdge)
            topRight = currentColumnNumber+inhRadius-(columnsInMatrix*inhRadius);
        else{
            if(leftEdge)
                topRight = topLeft+inhRadius*2;
            else
                topRight = topLeft + numberInRow-1+inhRadius;
        }
    }else
        topRight = topLeft+columnsInMatrix-numberInRow+inhRadius;

    // set area
    $('[data-col-num]').removeClass('inhibition_area');
    var rowLen = topRight-topLeft+1;
    for(var cNum = topLeft, i= 1, enlarger = columnsInMatrix-rowLen;
            cNum < topLeft+(rows_above_real+rows_bellow_real+1)*(columnsInMatrix);
            cNum++,
            i++){
        //console.log('cNum = '+cNum);
        $('[data-col-num="'+cNum+'"]').addClass('inhibition_area');
        if(i%rowLen===0){
            cNum+=enlarger;
            //console.log('new line, i = '+i+', rowLen = '+rowLen+', cNum = '+cNum);
        }
    }}
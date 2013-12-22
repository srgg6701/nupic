//
$(function(){
    // Prepare Matrix:
	Matrix.obj=$('#'+Matrix.Id);
	// get table headers:
	Matrix.makeMatrixMap('headers');
	// set id id to the cells:
	Matrix.makeMatrixMap();
    //console.dir(Marix);
    $('#ffi-ordered').on('click', function(){
        //console.log('val = '+$('#limit').val());
        if($('#limit').val()=='0')
            $('#limit').val('10'); // by default, equals to the inputs length
    });
    // run or stop Matrix:
    $('#'+Matrix.switcher.button_id).on('click', function(){
        (!Matrix.run)? runMatrix():stopMatrix();
    });
});
/**
 * interval - ms duration
 * static - use static data from the beginning to the end, once
 * in order to using random data set logical false
 * limit - iteration limit. To make it internal, set logical false or nothing
 */
function runMatrix() { // Matrix's going to have you, Neo! :)
    var interval,static,limit;
    if(!(interval=$('#interval').val())) interval='1000';
    
    static=$('input[name="ffi-order"]:checked').val();
    limit=$('#limit').val();
    /*    console.log('interval = '+interval+', static('+typeof(static)+') = '+static+', limit = ' + limit); 
    */
    var inputNumber, iterationNumber=0; 
    var dt, hrs, mnts, secs;
    var showCurrentInfo=function() {
        iterationNumber++;
        $('#iteration_number').html(iterationNumber);
        $('#current_input_number').html(inputNumber);
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
    //
    if(static>0){
        var inputNumber=0;
        var staticInputs = [1,2,3,4,5,6,7,8,9,10];
        //
        console.log('staticInputs.length: '+staticInputs.length);
        var runMatrixAnyway = function(){ 
            //console.log('input index = '+(inputNumber+Matrix.corrections.y));           
            Matrix.feedInputs(inputNumber+Matrix.corrections.y);            
            inputNumber++; //console.log('inputNumber end = '+inputNumber);
            showCurrentInfo();
            if(limit){ //12
                console.log('limit = '+limit+', inputNumber = '+inputNumber);
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
 * Stop it, Neo!!! :)
 */
function stopMatrix() {
    clearInterval(Matrix.indervalId);
    Matrix.run=false;
    Matrix.switcher.changeBtnVal();
}
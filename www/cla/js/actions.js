//
$(function(){
	Matrix.obj=$('#'+Matrix.Id);
	// get table headers:
	Matrix.makeMatrixMap('headers');
	// get lines
	//Matrix.getMatrixlines();
	// set id id to the cells:
	Matrix.makeMatrixMap();
    //check The Matrix:
    //console.dir(Marix);
    // feed inputs to the Matrix:
    var int=0,iOrder = [1,2,3,4,5,6,7,8,9,10];
    //for(var i = 1,j=iOrder.length;i<=j;i++)
    var runMatrix = function(){
        //console.log('runMatrix, int: '+int);
        var runMatrixAnyway = function(){ 
            //console.log('input index = '+(int+Matrix.corrections.y));           
            Matrix.feedInputs(int+Matrix.corrections.y);            
            int++;
            //console.log('int end = '+int);
        };
        if(!int){ //console.log('%cno int, runMatrixAnyway, int: '+int,'color:blue');
            runMatrixAnyway();
        }
        var indervalId = setInterval(function(){
            //console.log('%cSet interval','color:brown');
            if(iOrder[int]){ //console.log('iOrder['+int+'] = '+iOrder[int]);
                runMatrixAnyway();    
            }else{
                clearInterval(indervalId); //console.log('End of inputs is reached. int = '+int);
            }
        },'1000');
    };
    runMatrix();
});
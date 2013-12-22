var Matrix={
	Id:'Matrix',
	obj:null,
	headers:[],
	lines:null,
	makeMatrixMap:function(row,first_tr){
		//console.groupCollapsed('%cset Matrix map:','font-weight:bold');
        $(row).each(function(indexTr, tr) {
			$('td',tr).each(function(indexTd,td){
				// skip the first column
				if(indexTd){
					if(first_tr) // only single iteration
						Matrix.headers[indexTd-1]=$(td).text();
					else{
						td.id=Matrix.headers[indexTd-1]+[indexTr+1];
						//console.log('td.id = '+td.id);
					}
				} 
            });
		});
		//console.groupEnd();
	},
	feedInputs:function(patternIndex){
        $('td',this.lines).removeClass('active');
        var Pattern = inputs[patternIndex];
        console.groupCollapsed('%cPattern:','font-weight:bold');
            //console.dir(Pattern);
        /*  counter for patterns element that matches for the
            current column
        */
        var p, rw=0;
        for(var row in Pattern){
            rw++;
            console.dir(this.headers); // A	B C	D E	F G	H I J
            console.dir(Pattern[row]);
            /*  3 : ['C','D','E','F']
                4 :	['B','C','D','E','F']
             */
            p=0;
            for (var i = 0, j=Pattern[row].length; i <= j; i++) {
                //
                for(var k=0, g = this.headers.length; k<g; k++){
                    //console.log(this.headers[k]+' : '+Pattern[row][p]);
                    if(this.headers[k]==Pattern[row][p]){
                        console.log('cell.id: '+this.headers[k]+rw);
                        $('#'+this.headers[k]+rw).addClass('active');
                        p++;
                    }
                }
            }
        }
        console.groupEnd();
	},
	getMatrixlines:function(){
		this.lines=$('tr',this.obj).slice(1);
	}
};
var inputs={
	1:{
		1:                  ['E','F'],
		2:              ['D','E','F'],
		3:          ['C','D','E','F'],
		4:      ['B','C','D','E','F'],
		5:      			['E','F'],
		6:      			['E','F'],
		7:      			['E','F'],
		8:      			['E','F'],
		9:          		['E','F'],
		10:     			['E','F'],
		11:             	['E','F'],
		12: 				['E','F'],
		13:     ['B','C','D','E','F','G','H','I'],
		14:     ['B','C','D','E','F','G','H','I']
	},
	2:{
		1:			["C","D","E","F","G","H"],
		2:		["B","C","D","E","F","G","H","I"],
		3:	["A","B","C",               "H","I","J"],
		4:  ["A","B",                       "I","J"],
		5:                                  ["I","J"],
		6:                              ["H","I","J"],
		7:                          ["G","H","I"],
		8:                      ["F","G","H"],
		9:                  ["E","F","G"],
		10:				["D","E","F"],
		11:			["C","D","E"],
		12:		["B","C","D"],
		13:	['A','B','C','D','E','F','G','H','I'],
		14:	['A','B','C','D','E','F','G','H','I']
    },
	3:{
		1:				['E','F'],
		2:			['D','E','F'],
		3:		['C','D','E','F'],
		4:	['B','C','D','E','F'],
		5:				['E','F'],
		6:				['E','F'],
		7:				['E','F'],
		8:				['E','F'],
		9:				['E','F'],
		10:				['E','F'],
		11:				['E','F'],
		12:				['E','F'],
		13:	['B','C','D','E','F','G','H','I'],
		14:	['B','C','D','E','F','G','H','I']
    },
	4:{
		1:			["C","D","E","F","G","H"],
		2:		["B","C","D","E","F","G","H","I"],
		3:	["A","B","C",               "H","I","J"],
		4:  ["A","B",                       "I","J"],
		5:                                  ["I","J"],
		6:                              ["H","I","J"],
		7:                          ["G","H","I"],
		8:                      ["F","G","H"],
		9:                  ["E","F","G"],
		10:				["D","E","F"],
		11:			["C","D","E"],
		12:		["B","C","D"],
		13:	['A','B','C','D','E','F','G','H','I'],
		14:	['A','B','C','D','E','F','G','H','I']
    },
	5:{
		1:				['E','F'],
		2:			['D','E','F'],
		3:		['C','D','E','F'],
		4:	['B','C','D','E','F'],
		5:				['E','F'],
		6:				['E','F'],
		7:				['E','F'],
		8:				['E','F'],
		9:				['E','F'],
		10:				['E','F'],
		11:				['E','F'],
		12:				['E','F'],
		13:	['B','C','D','E','F','G','H','I'],
		14:	['B','C','D','E','F','G','H','I']
    },
	6:{
		1:			["C","D","E","F","G","H"],
		2:		["B","C","D","E","F","G","H","I"],
		3:	["A","B","C",               "H","I","J"],
		4:  ["A","B",                       "I","J"],
		5:                                  ["I","J"],
		6:                              ["H","I","J"],
		7:                          ["G","H","I"],
		8:                      ["F","G","H"],
		9:                  ["E","F","G"],
		10:				["D","E","F"],
		11:			["C","D","E"],
		12:		["B","C","D"],
		13:	['A','B','C','D','E','F','G','H','I'],
		14:	['A','B','C','D','E','F','G','H','I']
    },
	7:{
		1:				['E','F'],
		2:			['D','E','F'],
		3:		['C','D','E','F'],
		4:	['B','C','D','E','F'],
		5:				['E','F'],
		6:				['E','F'],
		7:				['E','F'],
		8:				['E','F'],
		9:				['E','F'],
		10:				['E','F'],
		11:				['E','F'],
		12:				['E','F'],
		13:	['B','C','D','E','F','G','H','I'],
		14:	['B','C','D','E','F','G','H','I']
    },
	8:{
		1:			["C","D","E","F","G","H"],
		2:		["B","C","D","E","F","G","H","I"],
		3:	["A","B","C",               "H","I","J"],
		4:  ["A","B",                       "I","J"],
		5:                                  ["I","J"],
		6:                              ["H","I","J"],
		7:                          ["G","H","I"],
		8:                      ["F","G","H"],
		9:                  ["E","F","G"],
		10:				["D","E","F"],
		11:			["C","D","E"],
		12:		["B","C","D"],
		13:	['A','B','C','D','E','F','G','H','I'],
		14:	['A','B','C','D','E','F','G','H','I']
    },
	9:{
		1:				['E','F'],
		2:			['D','E','F'],
		3:		['C','D','E','F'],
		4:	['B','C','D','E','F'],
		5:				['E','F'],
		6:				['E','F'],
		7:				['E','F'],
		8:				['E','F'],
		9:				['E','F'],
		10:				['E','F'],
		11:				['E','F'],
		12:				['E','F'],
		13:	['B','C','D','E','F','G','H','I'],
		14:	['B','C','D','E','F','G','H','I']
    },
	10:{
		1:			["C","D","E","F","G","H"],
		2:		["B","C","D","E","F","G","H","I"],
		3:	["A","B","C",               "H","I","J"],
		4:  ["A","B",                       "I","J"],
		5:                                  ["I","J"],
		6:                              ["H","I","J"],
		7:                          ["G","H","I"],
		8:                      ["F","G","H"],
		9:                  ["E","F","G"],
		10:				["D","E","F"],
		11:			["C","D","E"],
		12:		["B","C","D"],
		13:	['A','B','C','D','E','F','G','H','I'],
		14:	['A','B','C','D','E','F','G','H','I']
    }
};

$(function(){
	Matrix.obj=$('#'+Matrix.Id);
	// get table headers:
	Matrix.makeMatrixMap($('tr:first-child',Matrix.obj),true);
	// get lines
	Matrix.getMatrixlines();
	// set id id to the cells:
	Matrix.makeMatrixMap(Matrix.lines);
    //check The Matrix:
    //console.dir(Matrix);
    // feed inputs to the Matrix:
    var int=0,iOrder = [1,2,3,4,5,6,7,8,9,10];
    //for(var i = 1,j=iOrder.length;i<=j;i++)
    var runMatrix = function(){
        console.log('runMatrix, int: '+int);
        var runMatrixAnyway = function(){ 
            console.log('int start = '+int);           
            Matrix.feedInputs(int+1);            
            int++;
            console.log('int end = '+int);
        };
        if(!int){
            console.log('%cno int, runMatrixAnyway, int: '+int,'color:blue');
            runMatrixAnyway();
        }
        var indervalId = setInterval(function(){
            console.log('%cSet interval','color:brown');
            if(iOrder[int]){
                console.log('iOrder['+int+'] exists, runMatrixAnyway, int: '+int);
                runMatrixAnyway();    
            }else{
                clearInterval(indervalId);
                console.log('End of inputs is reached...');
            }
        },'2000');
    };
    runMatrix();
});
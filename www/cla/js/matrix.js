var Matrix={
	Id:'Matrix',
    run:false,
	obj:null,
	headers:[],
    corrections:{
        x:3,    // vertical offset
        y:1     // horizontal offset
    },
	lines:null,
    // set ids to the reception area elements (td in table):
	makeMatrixMap:function(headers){
        //console.groupCollapsed('%cset Matrix map:','font-weight:bold');
        var row;
        if(headers){
            row=$('tr:first-child',this.obj);
        }else{
            this.getReceptionArea();
            row=this.lines; 
        }   //console.log('row: ');console.dir(row);
        var Mtrx = this;
        $(row).each(function(indexTr, tr) {
            //
            $('td',tr).each(function(indexTd,td){
				// skip the first column
				if(indexTd){
					if(headers){ // only single iteration
						Mtrx.headers[indexTd-1]=$(td).text();
                        /*console.log('['+indexTd+'-1] = '+(indexTd-1)+', $(td).text(): '+$(td).text());
                        console.log('current header: %c'+Mtrx.headers[indexTd-1], 'color: orange');*/
                    }else{
						td.id=Mtrx.headers[indexTd-1]+(indexTr+1);
                        /*console.log('%cthis.headers['+(indexTd-1)+'] = '+Mtrx.headers[indexTd-1], 'color:green');
						console.log('%cthis.headers['+indexTd+'-1]+('+indexTr+'+1)', 'color:violet');
                        console.log('this.headers['+(indexTd-1)+']+('+(indexTr+1)+') = '+Mtrx.headers[indexTd-1]+(indexTr+1));
                        console.log('td.id = '+td.id);*/
					}
				} 
            });
		});
		//console.groupEnd();
	},
	// get feed-forward input (FFI):
    feedInputs:function(patternIndex){
        $('td',this.lines).removeClass('active');
        var Pattern = inputs[patternIndex]; //console.dir(patternIndex);console.dir(Pattern);
        /*  console.group('patternIndex: %c'+patternIndex,'font-weight:bold');
            console.dir(inputs[patternIndex]);
            //  counter for patterns element that matches for the current column
        */
        var patternStringElementsNumber, matrixRowNumber=this.corrections.x;
        for(var row in Pattern){ //console.log('row = '+row);
            matrixRowNumber++;
            /*  console.dir(this.headers); // A	B C	D E	F G	H I J
                console.dir(Pattern[row]);  */
            /*  3 : ['C','D','E','F']
                4 :	['B','C','D','E','F']
             */
            patternStringElementsNumber=0;
            for (var i = 0, j=Pattern[row].length; i <= j; i++) {
                //console.groupCollapsed('i = '+i+', %cPattern[row].length = '+Pattern[row].length,'font-weight:bold');
                //
                for(var k=0, g = this.headers.length; k<g; k++){
                    //console.log('k='+k+', g= '+g+' this.headers[k] : Pattern[row][patternStringElementsNumber] = '+this.headers[k]+' : '+Pattern[row][patternStringElementsNumber]);
                    if(this.headers[k]==Pattern[row][patternStringElementsNumber]){
                        //console.log('cell.id: '+this.headers[k]+matrixRowNumber);
                        $('#'+this.headers[k]+matrixRowNumber).addClass('active');
                        patternStringElementsNumber++;
                    }
                } //console.groupEnd();
            }
        } //console.groupEnd();
	},
	// get reception area:
    getReceptionArea:function(){
		this.lines=$('tr',this.obj).slice(1);
	},
    intervalId:null,
    switcher:{
        button_id:      'action',         
        btn_text:       'Stop it!',
        changeBtnVal:   function(){
            var btnVal = $('#'+Matrix.switcher.button_id).text();             
            $('#'+Matrix.switcher.button_id).text(Matrix.switcher.btn_text);
            Matrix.switcher.btn_text = btnVal;
        }
    }
};
var Matrix = {
    run: false,
    headers: [],
    random_offset: false,
    erosion: false,
    init:{
        cols:null, // In reality it will be re-calculated immediately after the page is being loaded
        cells:10
    },
    limit:{
        cells:{
            min:1,
            max:20        
        },
        ratio:0.05 // 16 columns
    },
    // array of columns by width and height
    columnsSets:[],
    corrections: {
        x: 3, // vertical offset
        y: 1, // horizontal offset
        randomOffset: function(set_offset) {
            var offset = 0; //console.log('Matrix.erosion = '+Matrix.erosion);
            if (Matrix.erosion || set_offset) {
                offset = Math.round(Math.random() * (3 - 1) + 1);
                if (Math.round(Math.random()) == 0
                        && set_offset) // otherwise while errosion it will tear input apart
                    offset = -offset;
                /*console.log('Matrix.random_offset = ' + Matrix.random_offset
                 + ', Matrix.erosion = ' + Matrix.erosion
                 + ', offset = '+offset);*/
            }
            return offset;
        }
    },
    lines: null,
    intervalId: null,
    regionSpace:{
        left:null,
        top:null,
        height:null,
        width:null
    },
    settings:{
        columns:null,
        cells:null,
        input_mode:null,
        distortion:null,
        interval:false,
        iterations_limit:false,
        ingibition_radius:null
    },
    switcher: {
        button_id: 'action',
        btn_text: '■ Stop it! ',
        changeBtnVal: function() {
            var btnVal = $('#' + Matrix.switcher.button_id).text();
            $('#' + Matrix.switcher.button_id)
                .text(Matrix.switcher.btn_text).toggleClass('start stop');
            Matrix.switcher.btn_text = btnVal;
        }
    },
    handleSettings:function(data_to_store){
        if(data_to_store)
            window.localStorage.setItem('settings',JSON.stringify(data_to_store));
        else{
            var mSettings=null;
            if(mSettings=JSON.parse(window.localStorage.getItem('settings'))){
                console.dir(mSettings);
                this.settings.columns = mSettings.settings.columns;
                console.log('this.settings.columns = '+this.settings.columns);
            }
        }
    },
    getColsSelect: function(){
        return document.getElementById('column_count');
    },
    // set ids to the reception area elements (td in table):
    // it is being called twice (arg, no arg)
    makeMatrixMap: function(headers) {
        // Prepare Matrix:
        var MatrixTbl = $('#Matrix');
        //console.groupCollapsed('%cset MatrixTbl map:','font-weight:bold');
        var row;
        if (headers) { // first calling
            //
            row = $('tr:first-child', MatrixTbl);
        } else {    // next calling
            //this.getReceptionArea();
            row = this.lines = $('tr', MatrixTbl).slice(1);
            // set columns onto perception field
            var mTdFirst    = $('td:first',MatrixTbl),
                borderW     = parseInt($(mTdFirst).css('border-width'));
            this.regionSpace.left  = mTdFirst.offset().left+mTdFirst.outerWidth()+borderW;
            this.regionSpace.top    =  mTdFirst.offset().top+mTdFirst.outerHeight()+borderW;
            this.regionSpace.height = MatrixTbl.height()-mTdFirst.outerHeight()-borderW;
            this.regionSpace.width  = MatrixTbl.width()-mTdFirst.outerWidth()-borderW;
        }   //console.log('row: ');console.dir(row);
        $(row).each(function(indexTr, tr) {
            //
            $('td', tr).each(function(indexTd, td) {
                // skip the first column
                if (indexTd) {
                    if (headers) { // only single iteration
                        Matrix.headers[indexTd - 1] = $(td).text();
                        /*console.log('['+indexTd+'-1] = '+(indexTd-1)+', $(td).text(): '+$(td).text());
                         console.log('current header: %c'+Mtrx.headers[indexTd-1], 'color: orange');*/
                    } else {
                        td.id = Matrix.headers[indexTd - 1] + (indexTr + 1);
                        /*console.log('%cthis.headers['+(indexTd-1)+'] = '+Mtrx.headers[indexTd-1], 'color:green');
                         console.log('%cthis.headers['+indexTd+'-1]+('+indexTr+'+1)', 'color:violet');
                         console.log('this.headers['+(indexTd-1)+']+('+(indexTr+1)+') = '+Mtrx.headers[indexTd-1]+(indexTr+1));
                         console.log('td.id = '+td.id);*/
                    }
                }
            });
        }); //console.groupEnd();
        $('#numCells').text(this.init.cells);
    },
    // get feed-forward input (FFI):
    feedInputs: function(patternIndex) {
        $('td', this.lines).removeClass('active');
        var Pattern = inputs[patternIndex]; //console.dir(patternIndex);console.dir(Pattern);
        //console.group('patternIndex: %c'+patternIndex,'font-weight:bold');
        //console.dir(inputs[patternIndex]);
         //  counter for patterns element that matches for the current column
        var patternStringElementsNumber, matrixRowNumber = this.corrections.x;
        var hOffset = 0;
        if (Matrix.random_offset) {
            //console.log('%cMatrix.random_offset','color:red');
            hOffset = Matrix.corrections.randomOffset(true);
        }
        if (Matrix.random_offset || Matrix.erosion)
            matrixRowNumber += Matrix.corrections.randomOffset(true);
        for (var row in Pattern) { //console.log('row = '+row);
            matrixRowNumber++;
            /*  console.dir(this.headers); 
             console.dir(Pattern[row]);  */
            patternStringElementsNumber = 0;
            for (var i = 0, j = Pattern[row].length; i <= j; i++) {
                //console.groupCollapsed('i = '+i+', %cPattern[row].length = '+Pattern[row].length,'font-weight:bold');
                for (var k = 0, g = this.headers.length; k < g; k++) {
                    //console.log('k='+k+', g= '+g+' this.headers[k] : Pattern[row][patternStringElementsNumber] = '+this.headers[k]+' : '+Pattern[row][patternStringElementsNumber]);
                    if (this.headers[k] == Pattern[row][patternStringElementsNumber]) {
                        // if erosion has been set, get offsets value
                        if (Matrix.erosion) {
                            hOffset = Matrix.corrections.randomOffset() - 2;
                        }
                        //console.log('cell.id: '+this.headers[k + hOffset]+matrixRowNumber);
                        $('#' + this.headers[k + hOffset] + matrixRowNumber).addClass('active');
                        patternStringElementsNumber++;
                    }
                } //console.groupEnd();
            }
        } //console.groupEnd();
    },
    // all possibles numbers of columns
    setMatrixColumnsRange:function(){
        var cols = $('td',this.lines[0]).size()-1;
        var rows = this.lines.length;
        var cellsNum = cols*rows; console.log('cellsNum = '+cellsNum);

        // set init columns number
        var initColsNum;
        // if there is no settings stored in db, add them there
        if(!this.settings.columns)
            // store data in local storage
            this.handleSettings({settings:{columns:(cellsNum/2).toFixed()}});
        // keep it, it will be checked  bellow
        initColsNum = this.settings.columns;
        var h, w, dvd, cff, curValueOfCell, curCellEnc; //calculate columns by sides
        var colSelect = this.getColsSelect(), cOption;
        var cRatio = cellsNum*this.limit.ratio;
        for(var i=1;i<cellsNum-1;i++){
            curValueOfCell = (i>1)? cellsNum-i:cellsNum;
            cff = Math.sqrt(cellsNum/curValueOfCell);
            curCellEnc = curValueOfCell*cff;
            // round height value
            h = (curCellEnc/cols).toFixed();
            w = (curCellEnc/rows);
            dvd = curValueOfCell/h;
            if((dvd ^ 0) === dvd){
                w = w.toFixed();
                cOption='<option value="'+curValueOfCell+'"';
                // set init cols number
                if(initColsNum && curValueOfCell<=initColsNum){
                    cOption+=' selected="selected"';
                    initColsNum=null;
                    this.init.cols = curValueOfCell;
                }
                cOption+='>'+curValueOfCell+'</option>';
                //console.log((h*w)+' = '+h+' x '+w);
                $(colSelect).append(cOption);
                this.columnsSets[curValueOfCell]=[h,w];
                //console.dir(this.columnsSets[curValueOfCell]);
            }
            // avoid too small amount of columns
            if(curValueOfCell<=cRatio) break;
        }
    }
};
/**
 * it here because it is being called from the index page as well
 */
function setColumns(select){ // if redefine set

    var mGrid = 'mGrid';
    var getSelVal = function(){
        return parseInt($('option:selected',select).val());
    };
    if(select) { // got selected columns' number onChange
        $('#'+mGrid).remove();
        // store data in local storage
        var sets=JSON.parse(window.localStorage.getItem('settings'));
        sets.settings.columns = getSelVal();
        window.localStorage.setItem('settings',JSON.stringify(sets));
    }
    else select = Matrix.getColsSelect(); //console.dir(select);
    //
    var activeSet = Matrix.columnsSets[getSelVal()];
    var cHeight = Matrix.regionSpace.height/activeSet[0];
    var cWidth  = Matrix.regionSpace.width/activeSet[1];
    //console.log('rows: '+activeSet[0]+'('+cHeight+'), cols: '+activeSet[1]+'('+cWidth+')');
    var cover = $('<div/>',{
        id:mGrid
    }).css({
            //background:'yellow',
            //opacity:    0.65,
            position:   'absolute',
            top:        Matrix.regionSpace.top+'px',
            left:       Matrix.regionSpace.left+'px',
            width:      Matrix.regionSpace.width+'px',
            height:     Matrix.regionSpace.height+'px'
        });
    $('body').prepend(cover);
    var colDm = $('td',Matrix.lines[0]).eq(1).width();
    var vMargin = (cHeight-colDm)/2;
    var curStyle,
        fullStyle,
        cStyle = 'height:'+cHeight+'px; '+
            'width:'+cWidth+'px; '+
            'line-height:'+cHeight+'px; ',
        innerStyle='margin-top:'+vMargin+'px; margin-bottom:'+vMargin+'px';
    for(var i=0; i<activeSet[0];i++){
        curStyle = cStyle+'top:'+cHeight*i+'px;';
        for(var j=0; j<activeSet[1];j++){
            fullStyle = curStyle+'left:'+cWidth*j+'px;';
            $(cover).append('<div style="'+fullStyle+'" class="column"><div style="height:'+colDm+'px; width:'+colDm+'px;'+innerStyle+'"></div></div>');
        }
    }
}
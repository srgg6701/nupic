// JavaScript Document
$(function(){
	$('ul > li > span').click( function(){
		$('>ul',$(this).parent()).fadeToggle(300);
		return false;
		/*var i=0;
		var goDeep=function(liParent){ // this, li
			var nextUl=$('>ul',liParent);
			var lenNext = $(nextUl).size();
			console.log('lenNext = '+lenNext);
			//console.dir(nextUl);
			if(lenNext){
				i++;
				if(i<100){
					var nextNextUl=$('>ul',nextUl);
					var lenNextNext = $(nextNextUl).size();
					
					if(lenNextNext){
						goDeep(lenNext);
					}else{
						if($(nextUl).is(':visible')){
							$(nextUl).fadeOut(200);
						}else{
							$(nextUl).fadeIn(200);
						}		
					}
				}
			}
		};
		goDeep(this);*/
	});
});

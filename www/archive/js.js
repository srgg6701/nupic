// JavaScript Document
$(function(){
	var pointer;
	$('ul > li > span').click( function(){
		$('>ul',$(this).parent()).fadeToggle(300);
		pointer=(this.innerHTML.indexOf('►')!=-1)? '▼ ':'► ';
		$(this).text(pointer);
	});
});

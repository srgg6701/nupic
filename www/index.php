<?	$doc=new DOMDocument();
	$doc->loadHTMLFile('http://lists.numenta.org/pipermail/nupic_lists.numenta.org/2013-November/thread.html');
	$head=$doc->getElementsByTagName('head')->item(0);
	// css:
	$css=$doc->createElement('link');
	$css->setAttribute('href','style.css');
	$css->setAttribute('rel','stylesheet');
	$css->setAttribute('type','text/css');
	// attach styles:
	$head->appendChild($css);	
	// jQuery:
	$jq=$doc->createElement('script');
	$jq->setAttribute('src','jquery-1.8.1.js');
	// js:
	$js=$doc->createElement('script');
	$js->setAttribute('src','js.js');
	// attach scripts:
	$head->appendChild($jq);
	$head->appendChild($js);
	
	$uls=$doc->getElementsByTagName('ul');
	$ulLast=$uls->item($uls->length-1);
	$ulLast->setAttribute('class','empty');
	$uls->item(0)->setAttribute('class','empty');
	$lis=$doc->getElementsByTagName('li');
	$span=$doc->createElement('span');
	foreach($uls as $ul){
		if(!($ul->getAttribute('class')=='empty')){
			$lis = $ul->getElementsByTagName('li');
			foreach($lis as $i=>$li){
				$spointer=$span->cloneNode();
				$spointer->appendChild($doc->createTextNode('► '));				
				$a=$li->getElementsByTagName('a')->item(0);
				$li->insertBefore($spointer,$a);
			}
		}
	}
	// expose HTML:
	echo $doc->saveHTML();?>
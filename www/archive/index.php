<?	$doc=new DOMDocument();
	$month='http://lists.numenta.org/pipermail/nupic_lists.numenta.org/2013-November/';
	$doc->loadHTMLFile($month.'thread.html');
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
	
	$xpath = new DOMXPath($doc);
	$uls = $xpath->query('//body/ul');
	
	//foreach($uls as $ul) echo "<div>length: ".$ul->childNodes->length."</div>";
	
	$ulLast=$uls->item($uls->length-1);
	$ulLast->setAttribute('class','empty');
	$uls->item(0)->setAttribute('class','empty');
	
	function dive($ul){
		global $doc,$month;
		foreach($ul->getElementsByTagName('li') as $i=>$li){
			$span=$doc->createElement('span');
			$pointer=$doc->createTextNode('► ');
			$span->appendChild($pointer);	
			// http://lists.numenta.org/pipermail/nupic_lists.numenta.org/2013-November/001860.html			
			$a=$li->getElementsByTagName('a')->item(0);
			$a->setAttribute('href',$month.$a->getAttribute('href'));
			$newSpan=$li->insertBefore($span,$a);							
			if($li->getElementsByTagName('ul')->length){
				dive($newSpan);
			}else{
				$span->setAttribute('class','hidden');
			}
			unset($li);
		}
	}

	foreach($uls as $ul){
		//echo "<div>".$ul->nodeValue."</div>";
		if(!($ul->getAttribute('class')=='empty')){
			dive($ul);
		}
	}
	// expose HTML:
	echo $doc->saveHTML();?>
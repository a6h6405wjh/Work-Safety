// Use python -m http.server 10000 to run.

// Image rotator.
'use strict';

// Namespace.
var wsw = wsw || 
{
	alternate: 0,
	next: 1,
	data: null,
	interval: 5000
};


wsw.onload = function()
{
	// Read images from xml.
	var xmlReq = new XMLHttpRequest();
	
	xmlReq.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var xml = xmlReq.responseXML;

			// Store img list.
			wsw.data = xml.getElementsByTagName('slide');

			xmlReq = undefined;

			// Initiate rotator.
			wsw.rotator();
		}
	}

	xmlReq.open("GET", "rotator.xml", true);
	xmlReq.send();
}

window.onload = wsw.onload;


// Fade and rotate images.
wsw.rotator = function()
{
	var slides = document.getElementById('rotator').children;

	wsw.next++;

	if (wsw.next == wsw.data.length)
	{
		wsw.next = 0;
	}

    // Assign other div next image.
	slides[+ wsw.alternate].innerHTML = wsw.data[wsw.next].children[0].outerHTML;
    slides[+ wsw.alternate].classList.add('expand');

    // Remove current div expansion.
	slides[+ !wsw.alternate].classList.remove('expand');

	// Flip.
	wsw.alternate = !wsw.alternate;

	setTimeout(function(){wsw.rotator(100)}, wsw.interval);
}
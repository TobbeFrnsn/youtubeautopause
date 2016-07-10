// Content script
var injected;

//Ref: http://stackoverflow.com/questions/23895377/sending-message-from-a-background-script-to-a-content-script-then-to-a-injected/
if(!injected)
{
	injected = true;

	//Change player when you resize site
	window.addEventListener("resize", function() 
	{
		setVideoPlaybackIfVisible();
		
	});

	//Change player when you scroll on site
	window.addEventListener("scroll", function() 
	{
		setVideoPlaybackIfVisible();
		
	});

	function setVideoPlaybackIfVisible()
	{
		//console.log("Before: " + window.youtubevideoplaying);
		
		var video = document.getElementsByTagName("video")[0];
		var isvisible = isElementInViewport(video);
		
		if(typeof window.youtubevideoplaying == "undefined")
		{
			window.youtubevideoplaying = isvisible;
		}
		
		if (isvisible) 
		{
			if(window.youtubevideoplaying == false)
			{
				window.youtubevideoplaying = true;
				video.play();
				
			}
		} 
		else 
		{
			if(window.youtubevideoplaying == true)
			{
				window.youtubevideoplaying = false;
				video.pause();
			
			}
		}
		
		//console.log("Is video playing: " + window.youtubevideoplaying);
	}

	//Ref: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	function isElementInViewport(el) 
	{
		//special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery)
		{
			el = el[0];
		}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 - 60 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	}
}





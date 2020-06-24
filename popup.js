document.addEventListener("DOMContentLoaded",function(){	
	var tablink;
	$(".lds-spinner").css("display", "inline-block");
	const check = false;
	chrome.tabs.getSelected(null,function(tab) {
	   	tablink = tab.url;

		var xhr=new XMLHttpRequest();
		const baseUrl = "http://0.0.0.0:5000/localPrediction/"
        var data = JSON.stringify({'url': tablink})
		//xhr.responseType = 'json'
		console.log(1)
		xhr.onreadystatechange = function() {
			console.log('this.readyState',this.readyState)
			console.log('this.status',this.status)
        if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText)
            if(this.responseText)  $(".lds-spinner").css("display", "none");
			if(this.responseText === 'Cannot predict this site') $("#result").text(this.responseText)
			if(this.responseText === 'Safe') $("#result-safe").text(this.responseText)
			if(this.responseText === 'Malicious') $("#result-nsafe").text(this.responseText)
	   }

    };
	xhr.open("POST",baseUrl,true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(data);
	});
});


// $(document).ready(function(){
//     $("#btn-check").click(function(e){	
// 		e.preventDefault();
// 		var val = transfer();
//     });
// });

chrome.tabs.getSelected(null,function(tab) {
	   var tablink = tab.url;
	  
	   $("#url-check").attr("href",tablink);

	   $("#url-check").text(tablink.toString().length > 50 ? tablink.substring(0,50) + '.....' : tablink);
});

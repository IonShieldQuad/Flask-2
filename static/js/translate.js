"use strict"

function createRequest() {
	let rq = new XMLHttpRequest();
	if (rq == null) {
		alert("Request creation error!");
	}
	return rq;
}

/*document.getElementById("inputMessage").addEventListener("input", function(event) {
	sendSubmitRequest();
});*/

document.getElementById("submit").addEventListener("click", function(event) {
	event.preventDefault();
  
	sendSubmitRequest();
}); 

document.getElementById("reverseButton").addEventListener("click", function(event) {
	event.preventDefault();

	let tmp = translate.translate_from.value;
	translate.translate_from.value = translate.translate_to.value;
	translate.translate_to.value = tmp;

	let input = document.querySelector('#inputMessage');
	let output = document.querySelector('#outputMessage');

	tmp = input.value;
	input.value = output.value;
	output.value = tmp;

	sendSubmitRequest();
}); 


function sendSubmitRequest() {
    let obj = {};
	obj.translate_from = translate.translate_from.value;
	obj.translate_to = translate.translate_to.value;
	obj.translate_text = document.querySelector('#inputMessage').value;

	let request = createRequest();
	
	let url = "translate";
	request.onreadystatechange = () => updatePage(request, "submit");
	request.open("POST", url, true);
	request.setRequestHeader('Content-type', 'application/json');
	request.send(JSON.stringify(obj));
}


function updatePage(request, type) {
	if (request.readyState == 4 && request.status == 200) {
		console.log(request);
		let el = document.getElementById("outputMessage");
		let response = request.response;
		
		switch (type) {
			case "submit": {
				el.value = response;
			}
			break;
		}
	}
}

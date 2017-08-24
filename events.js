var products = [];
var categories = [];

var numOfXHRLoaded = 0;

function decideDataType(dataFromArray){
	var dataType = "products";
	for (var i = 0; i < dataFromArray.length; i++){
		if(dataFromArray[i].season_discount){
			dataType = categories;
		}
	}
	if(dataType = 'products'){
		products = dataFromArray;
	}else if(dataType = categories){
		categories =dataFromArray
	}
}
numOfXHRLoaded ++
if(numOfXHRLoaded === 2){
	moveOn()
}

function moveOn (){
	console.log(products);
	console.log(categories);
}


function executeThisCodeAfterFileLoads(){
	console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	decideDataType(data)
}

function executeThisCodeAfterFileLoads2(){
	console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	decideDataType(data)
}

function executeThisCodeAfterFileErrors(){
	console.log("It Broke");
}

var myRequest = new XMLHttpRequest();
myRequest.addEventListener('load', executeThisCodeAfterFileLoads);
myRequest.addEventListener('error', executeThisCodeAfterFileErrors);
myRequest.open('GET', 'products.json');
myRequest.send();

var myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener('load', executeThisCodeAfterFileLoads2);
myRequest2.addEventListener('error', executeThisCodeAfterFileErrors);
myRequest2.open('GET', 'categories.json');
myRequest2.send();
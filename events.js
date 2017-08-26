var products = [];
var categories = [];

var numOfXHRLoaded = 0;

function decideDataType(dataFromArray){
	var dataType = "products";
	//console.log(dataFromArray);
	//console.log(dataFromArray.categories);
	for (var i = 0; i < dataFromArray.length; i++){
		//console.log(dataFromArray[i].season_discount)
		if(dataFromArray[i].season_discount){
			dataType = "categories";
		}
	}
	console.log(dataType);
	if(dataType === "products"){
		products = dataFromArray;
	}else if(dataType === "categories"){
		categories = dataFromArray;
		console.log("categories logging", categories);
	}

	numOfXHRLoaded ++;
	if(numOfXHRLoaded === 2){
		moveOn();
	}
}

function moveOn (){
	console.log(products);
	console.log(categories);
	addCategoryToProduct();
}

function addCategoryToProduct(){
	for (var i = 0; i < products.length; i++) {
		for (var j = 0; j < categories.length; j++) {
			if (products[i]["category_id"] === categories[j].id){
				products[i].categoryName = categories[j].name;
				products[i].categorySeason = categories[j]["season_discount"];
				products[i].categoryDiscount = categories[j].discount;
			}
		}
	}
	prodString(products);
}

//Products domString
function prodString (products){
	var domString = '';
	for (var i = 0; i < products.length; i++){
		domString += `<div id="prodCard">`;
		domString +=	`<h4 class="department">${products[i].categoryName}</h4>`;
		domString +=	`<h4 class="name">${products[i].name}</h4>`;
		domString +=	`<h4 class="price">${products[i].price}</h4>`;
		domString += `</div>`;
	}
	writeToDom(domString);
}

function writeToDom (strang){
	var seasonalSales = document.getElementById("seasonal-sales");
	seasonalSales.innerHTML += strang;
}

//Autumn

//Spring

//Winter


function executeThisCodeAfterFileLoads(){
	// console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	decideDataType(data.products);
}

function executeThisCodeAfterFileLoads2(){
	// console.log("this", this.responseText);
	var data = JSON.parse(this.responseText);
	decideDataType(data.categories);
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
var foodItems = document.getElementById('foodItems')
var Tables = document.getElementById('Tables');

function loadDhaba(){
	addMenu();
	addTable();
}

function addTable(){
	for(var i=0; i< tableData.length ; i++){
	  	var tableDiv = document.createElement('div');
	  	tableDiv.id = tableData[i].id;
	  	tableDiv.foodItems = tableData[i].foodItems;
	  	tableDiv.itemCount = tableData[i].itemCount;
	  	tableDiv.amount = tableData[i].amount;
	  	Tables.appendChild(tableDiv);
	  	tableDiv.innerHTML = tableData[i].id + ' | Rs: 0 | Total items: 0';

		tableDiv.addEventListener("dragover",dragover_handler,false);
		tableDiv.addEventListener("drop",drop_handler,false);
		tableDiv.addEventListener("dragenter",dragenter_handler,false);
		tableDiv.addEventListener("dragleave",dragleave_handler,false);
		tableDiv.addEventListener("click",showBill,false);
	}
}

function addMenu(){
	for(var i=0; i< menuData.length ; i++){
		var foodDiv = document.createElement('div');
		var foodName = document.createElement('p');
		var foodPrice = document.createElement('b');
		foodName.textContent = menuData[i].name;
		foodPrice.textContent = "Rs: " + menuData[i].cost;

		foodDiv.id = menuData[i].id;
		foodDiv.name = menuData[i].name;
		foodDiv.type = menuData[i].type;
		foodDiv.cost = menuData[i].cost;

		foodItems.appendChild(foodDiv);
		foodDiv.appendChild(foodName);
		foodDiv.appendChild(foodPrice);

		foodDiv.draggable = 'true';
		foodDiv.addEventListener("dragstart",dragstart_handler);
		foodDiv.addEventListener("dragend",dragend_handler);
	}
}

function dragstart_handler(ev) {
 console.log("dragStart");
 console.log(ev.target.id);
 ev.currentTarget.style.border = "2px dashed";		// Change the source element's background color to signify drag has started
 ev.currentTarget.style.color = "green";
 ev.dataTransfer.setData("text", ev.target.id);		//// Add the id of the drag source element to the drag data payload so // it is available when the drop event is fired
 ev.effectAllowed = "copyMove";		// Tell the browser both copy and move are possible
}

var cc;
function dragenter_handler(ev){
	cc = ev.currentTarget.style.background;
	ev.currentTarget.style.background = "lightblue";
}

function dragleave_handler(ev){
	if(cc !== "blue"){
	 ev.currentTarget.style.background = "";
	}else { ev.currentTarget.style.background = "blue";}
}

function dragover_handler(ev) {
 ev.preventDefault();
 console.log("dragOver");
 ev.currentTarget.style.background = "lightblue";		// Change the target element's border to signify a drag over event// has occurred
}

function dragend_handler(ev) {
  console.log("dragEnd");
  // Restore source's style
  ev.target.style = "";
  ev.currentTarget.style=" ";
  // Remove all of the drag data
  ev.dataTransfer.clearData();
}

function drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  ev.currentTarget.style.background = "blue";

    var itemId = ev.dataTransfer.getData("text");
    var item = document.getElementById(itemId);
    var tableId = ev.target.id;
    var table = document.getElementById(tableId);
    var found = false;

    if(table.foodItems.length>0){
        for(var i=0;i<table.foodItems.length;i++){
			if(table.foodItems[i].table_food_id == itemId){
				table.foodItems[i].table_food_count++;
				table.itemCount++;
				table.amount+=item.cost;
				found = true;
    		}
    	}	
    }


    if(found === false){
    	console.log('its new item');
    	// if the item is not already on the table then add a new item to the list of items of the table
    	var new_item = {"table_food_id":item.id,"table_food_count": 1, "table_food_name":item.name, "table_food_cost":item.cost};
    	table.foodItems.push(new_item);
    	table.itemCount++;
    	table.amount+=item.cost;
    }
    // setting the innerHTML of the table
    table.innerHTML = tableId + " | Rs: "+ table.amount+ " | Total items: "+ table.itemCount;
}

function filterTables() {
	var input = document.getElementById('input1');
  	var filter = input.value.toUpperCase();
    var table = document.getElementById("Tables");
    var div = table.getElementsByTagName("div");
    for (var i = 0; i < div.length; i++) {
    	if(div[i].id.toUpperCase().indexOf(filter) > -1){
    		div[i].style.display = "";
    	}
    	else{
    		div[i].style.display = "none";	
    	}
    }	
    
}

function filterMenu(){
	var input = document.getElementById('input2');
  	var filter = input.value.toUpperCase();
  	var menu = document.getElementById("foodItems");
    var div = menu.getElementsByTagName("div");
    
    for (var i = 0; i < div.length; i++) {
    	if(div[i].name.toUpperCase().indexOf(filter) > -1 || div[i].type.toUpperCase().indexOf(filter) > -1){
    		div[i].style.display = "";
    	}
    	else{
    		div[i].style.display = "none";	
    	}
    }	
}

var modal = document.getElementById('myModal');
var span = document.getElementById('close');
var latest_table, latest_input ,latest_target;

var billFooter = document.getElementById('billFooter');
billFooter.addEventListener("click",payBill);

function payBill(){
	alert("Please pay : INR "+latest_table.amount);
	modal.style.display = "none";
	latest_table.amount = 0;
	latest_table.itemCount = 0;
	latest_table.foodItems = [];
	latest_table.innerHTML = latest_table.id + " | Rs. "+latest_table.amount +" | Total items: "+latest_table.itemCount;
	latest_table.style.background = "";
}

function showBill(ev){
	latest_target = ev;
	modal.style.display = "block";
	var table = document.getElementById(ev.target.id);
	console.log('table id :'+ table.id);
	var billHeader = document.getElementById("billHeader");
	billHeader.innerHTML = table.id +" |  Order Details";
	var tableRef = document.getElementById('billTable');
	billTable.innerHTML = '<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>';
	
	for(var i=0;i<table.foodItems.length;i++){
		var item = table.foodItems[i];
		var row = tableRef.insertRow(i+1);
		
		row.insertCell(0).innerHTML = i+1;
		row.insertCell(1).innerHTML = item.table_food_name;
		row.insertCell(2).innerHTML = item.table_food_cost;

		row.insertCell(3).innerHTML = '<input type="number" style="align:center;width:50px"></input>';
		document.getElementsByTagName("input")[i+2].value = item.table_food_count;
		document.getElementsByTagName("input")[i+2].id = 50+i;

		row.insertCell(4).innerHTML = '<i class="fa fa-trash"></i>';
		document.getElementsByClassName("fa fa-trash")[i].id =100+i;

		row.cells[3].addEventListener("change",editBill,false);	
		row.cells[4].addEventListener("click",deleteItem,false);	
	}
	var row = tableRef.insertRow(table.foodItems.length+1);
	row.insertCell(0).innerHTML = "";
	row.insertCell(1).innerHTML = "";
	row.insertCell(2).innerHTML = "Total : "+table.amount;
	row.insertCell(3).innerHTML = "";
	row.insertCell(4).innerHTML = "";

	latest_table = table;
}

function editBill(ev){
	var change;
	var input_id = ev.target.id;
	if(ev.target.value <= 0){
		alert("Item count should be greater than zero.(You may delete the item)");
		ev.target.value = latest_table.foodItems[input_id-50].table_food_count;
		change = 0;
	}
	else{
		change = ev.target.value - latest_table.foodItems[input_id - 50].table_food_count;
	}
	
	 
	latest_table.foodItems[input_id - 50].table_food_count = ev.target.value;
	latest_table.amount += change * (latest_table.foodItems[input_id -50].table_food_cost);
	latest_table.itemCount +=change;
	latest_table.innerHTML = latest_table.id + " | Rs. "+latest_table.amount +" | Total items: "+latest_table.itemCount;
	showBill(latest_target);
}


function deleteItem(ev){
	var delete_id = ev.target.id;
	console.log('itemCount:'+latest_table.itemCount);
	latest_table.itemCount -= latest_table.foodItems[delete_id-100].table_food_count;
	console.log('itemCount:'+latest_table.itemCount);
	latest_table.amount -= latest_table.foodItems[delete_id-100].table_food_count * latest_table.foodItems[delete_id-100].table_food_cost;
	latest_table.foodItems.splice(delete_id-100, 1);
	showBill(latest_target);
	latest_table.innerHTML = latest_table.id + " | Rs. "+latest_table.amount +" | Total items: "+latest_table.itemCount;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {				
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
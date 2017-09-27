var mywork = document.getElementById('portfolio-container');
var modal = document.getElementById('myModal');


var imageSN = 0; 

function loadImages(){

	for (var i = 0; i < myImagesData.images.length ; i++) {
		var url =myImagesData.directory + myImagesData.images[i].url;
		var name = myImagesData.images[i].name;
		var info = myImagesData.images[i].description;
		var uploadDate = myImagesData.images[i].uploadDate;
		addImage(url,name,info,uploadDate);

		}
}

function addImage(url,name,info,uploadDate){
		var imageDiv = document.createElement('div');
		var newImage = document.createElement('img');
		imageDiv.className = 'img-holder w3-row-padding w3-center';	
		newImage.className = 'w3-hover-opacity';

		newImage.src = url;
		newImage.alt = name;
		newImage.info = info;
		newImage.uploadDate = uploadDate;
		imageSN++;
		newImage.id = imageSN;

		mywork.appendChild(imageDiv);
		imageDiv.appendChild(newImage);
		newImage.addEventListener('click', loadFormInfo);
}

var currentModalImage;
var image = document.getElementById('modal-image');
var imageName = document.getElementById('imageName');
var imageInfo = document.getElementById('imageInfo');
var imageURL = document.getElementById('imageURL');
var imageUploadDate = document.getElementById('imageUploadDate');

function loadFormInfo(){
  		image.src = this.src;
  		imageName.value = this.alt;
		imageInfo.value = this.info;
		imageURL.value = this.src;
		imageUploadDate.value = this.uploadDate;
		modal.style.display = "block";		// When the user clicks the image, open the modal

		currentModalImage = this;
		editButton.addEventListener('click',editFunction);
		addButton.addEventListener('click',addFunction);
		deleteButton.addEventListener('click',deleteFunction);
}

var span = document.getElementsByClassName("close")[0];			// Get the <span> element that closes the modal

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

var editButton = document.getElementById('editButton');
var addButton = document.getElementById('addButton');
var deleteButton = document.getElementById('deleteButton');

function editFunction(){
	var input_value = [ imageName.value , imageURL.value , imageInfo.value , imageUploadDate.value];
	if(dataValidation(input_value)){
		currentModalImage.alt = imageName.value;
		// currentModalImage.src = imageURL.value;			// TODO: check if valid url or not; if not,display image of noImage
		if(validateUrl(imageURL.value)){
			currentModalImage.src = imageURL.value;			// TODO: check if valid url or not; if not,display image of noImage
		}else {	currentModalImage.src = noImageFound;}
		currentModalImage.info = imageInfo.value;
		currentModalImage.uploadDate = imageUploadDate.value;
		modal.style.display = "none";
	}
}

function addFunction(){
	var input_value = [ imageName.value , imageURL.value , imageInfo.value , imageUploadDate.value];
	if(dataValidation(input_value)){
		if(validateUrl(imageURL.value)){
			currentModalImage.src = imageURL.value;			// TODO: check if valid url or not; if not,display image of noImage
		}else {	currentModalImage.src = noImageFound;}
		addImage(imageURL.value,imageName.value,imageInfo.value,imageUploadDate.value);
		modal.style.display = "none";
	}
	
}

function deleteFunction(){
	var id = currentModalImage.id;
	var imageDel;
	while (imageDel = document.getElementById(id)) {
    imageDel.parentNode.parentNode.removeChild(imageDel.parentNode);
	}
	modal.style.display = "none";
}

function validateUrl(url){
	var re = /\S+\.\S+/;
    return re.test(url);
}


function isValidDate(dateString) {
	var regEx = /^\d{4}\/\d{2}\/\d{2}$/;
  	if(dateString.match(regEx) === false) 
  		return false;  // Invalid format
  	var enteredDate = new Date(dateString);
  	if(!enteredDate.getTime()) 
  		return false;
  	var enteredMS = new Date(dateString).getTime();
  	 var currentMS = new Date().getTime();
  	// Return the number of milliseconds since 1970/01/01:
  	if(enteredMS > currentMS) 
  		return false;

  	// Return a Date object as a String, using the ISO standard:
  	return enteredDate.toISOString().slice(0,10) === dateString;
}



function dataValidation(input_value){
	if(input_value[0].value ===""){
		alert("Name cannot be empty !!");
		return false;
	}
	// if(validateUrl(input_value[1].value) === false ){
	// 	alert("url is invalid !!");
	// 	return false;
	// }
	if(input_value[2].value === ""){
		alert("Information cannot be empty !!");
		return false;
	}
	if(input_value[3].value === ""){
		alert("Uploaded date cannot be empty !!");
		return false;
	}
	// if(isValidDate(input_value[3].value) === false){
	// 	alert("Uploaded date is invalid !!");
	// 	return false;
	// }
	return true;
}


// change it later to your image
var noImageFound = 'http://awards.arabiacsrnetwork.com/img/no_image.gif';
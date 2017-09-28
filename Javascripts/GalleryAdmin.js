var mywork = document.getElementById('portfolio-container');
var modal = document.getElementById('myModal');

// Image serial Number to give them unique ID
var imageSN = 0; 

// Load images into webpage, when html body loads
function loadImages(){
	for (var i = 0; i < myImagesData.images.length ; i++) {
		var url =myImagesData.directory + myImagesData.images[i].url;
		var name = myImagesData.images[i].name;
		var info = myImagesData.images[i].description;
		var uploadDate = myImagesData.images[i].uploadDate;
		addImage(url,name,info,uploadDate);
		}
}

// adding Images into webpages with neccesary information and calling to Load Form info for modal when clicked.
function addImage(url,name,info,uploadDate){
		var imageDiv = document.createElement('div');
		var newImage = document.createElement('img');
		imageDiv.className = 'img-holder w3-row-padding w3-center';	
		newImage.className = 'w3-hover-opacity';

		if(checkForImage(url)){
			newImage.src = url;			
		}else {	
			newImage.src = noImageFound;		/// TODO: check if valid url or not; if not,display image of noImage
		}

		
		newImage.url = url;
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

// Display the image info in the form of the modal
function loadFormInfo(){
  		image.src = this.src;			// if wrong url enter, then image of NoImage displayed
  		imageName.value = this.alt;
		imageInfo.value = this.info;
		// imageURL.value = this.src;
		imageURL.value = this.url;
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
		if(checkForImage(imageURL.value)){
			currentModalImage.src = imageURL.value;	
			currentModalImage.url = imageURL.value;		
		}else {	
			currentModalImage.src = noImageFound;		/// TODO: check if valid url or not; if not,display image of noImage
			currentModalImage.url = imageURL.value;
		}
		currentModalImage.info = imageInfo.value;
		currentModalImage.uploadDate = imageUploadDate.value;
		modal.style.display = "none";
	}
}

function addFunction(){
	var input_value = [ imageName.value , imageURL.value , imageInfo.value , imageUploadDate.value];
	if(dataValidation(input_value)){
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

function dataValidation(input_value){
	if(input_value[0] ===""){
		alert("Name cannot be empty !!");
		return false;
	}
	if(validateUrl(input_value[1]) === false ){
		alert("url is invalid !!");
		return false;
	}
	if(input_value[2] === ""){
		alert("Information cannot be empty !!");
		return false;
	}
	if(input_value[3] === ""){
		alert("Uploaded date cannot be empty !!");
		return false;
	}
	if(isValidDate(input_value[3]) === false){
		// alert("Uploaded date is invalid !!");
		return false;
	}
	return true;
}

function checkForImage(str){
	var regex = /(png|jpg|jpeg)$/;
  	return regex.test(str);
}

function validateUrl(str) {
  // var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
  //   '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
  //   '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
  //   '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
  //   '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
  //   '(\#[-a-z\d_]*)?$','i'); // fragment locater

  // var pattern = = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+-]*)?(\#[-a-z\d_]*)?$','i/;

  // if(!pattern.test(str)) {
  //   alert("Please enter a valid URL.");
  //   return false;
  // } else {
  //   return true;
  // }

  var regex = /\S+\.\S+/;
  return regex.test(str);
}

// valid date (ISO Date Format): YYYY-MM-DD 
function isValidDate(myDate) {

	var regex = /^\d{4}\-\d{2}\-\d{2}/;		// Format : YYYY-MM-DD 
    if(!regex.test(myDate)){
    	alert('Invalid UploadDate!! wrong format, please enter as YYYY-MM-DD:'+myDate);
      return false;
    }

    var enteredDate = new Date(myDate);		// accept 2012-02-31 and 2012-04-31 but not 32nd day or 13th month, may improve it for not to accept 2012-02-31
  	if(!enteredDate.getTime()) {
  		alert('Invalid UploadDate!! month or date exceeding values');
  		return false;
  	}

  	var enteredMS = new Date(myDate).getTime();		// Return the number of milliseconds since 1970/01/01:
  	var currentMS = new Date().getTime();
  	if(enteredMS > currentMS) {
  		alert('Invalid UploadDate!! Future date not allowed');
  		return false;
  	}

  	return true;
//   // Return a Date object as a String, using the ISO standard:
//   return enteredDate.toISOString().slice(0,10) === myDate;
}


// change it later to your image
var noImageFound = 'http://awards.arabiacsrnetwork.com/img/no_image.gif';
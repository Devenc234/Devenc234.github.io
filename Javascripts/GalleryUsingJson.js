var mywork = document.getElementById('portfolio');

  	// Get the modal
var modal = document.getElementById('myModal');
	

for (var i = 0; i < 8; i++) {
	
	var imageDiv = document.createElement('div');
	imageDiv.setAttribute('class', 'img-holder w3-row-padding w3-center');	
	mywork.appendChild(imageDiv);

	var imageNameDes = myImagesData.images[i].name + '$$description$$' + myImagesData.images[i].description;
	var absURL = myImagesData.directory + myImagesData.images[i].url;

	var newImage = document.createElement('img');
	newImage.setAttribute('class', 'w3-hover-opacity');
	newImage.setAttribute('alt', imageNameDes);
	newImage.setAttribute('src',absURL);

	imageDiv.appendChild(newImage);

	newImage.addEventListener('click', function(e){
  		var modalImage = document.getElementById('modal-image');
  		modalImage.setAttribute('class', 'modal-image');
  		modalImage.setAttribute('src',e.target.getAttribute('src'));

  		imageNameDes = e.target.getAttribute('alt').split("$$description$$");
  		
  		document.getElementById('modal-image-name').textContent = imageNameDes[0];
		document.getElementById('modal-image-description').textContent = imageNameDes[1];

  		modal.style.display = "block";		// When the user clicks the image, open the modal 
  	});


}
  	
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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



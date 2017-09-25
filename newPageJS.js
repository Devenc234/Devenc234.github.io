var myHeading = document.querySelector('p');
myHeading.textContent = 'Hello world!'

// var data = { "name":"John", "birth":"1986-12-14", "city":"New York"};
// myHeading.textContent = data.name;


// var myvar = JSON.parse(data);
// myHeading.textContent = myvar.name;


    var requestURL = 'https://github.com/Devenc234/Devenc234.github.io/blob/master/newPageJSON.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      var myvar = request.response;
      myHeading.textContent = myvar.name;
      
    }

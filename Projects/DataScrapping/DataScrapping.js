var Hospital = [];
var exception = [];
var dept;
var item,itemCount =0;
function DataExtractor (){

	var elements = document.getElementsByClassName('MsoPlainText');

	for(var i=0;i<elements.length; i++){

		var line = elements[i].innerText;
		var formatted_line = '';

		for(var j=0;j<line.length; j++){
			if(line[j] != String.fromCharCode(160)) { formatted_line += line[j]; }
		}

		if( formatted_line.indexOf('ACCOMMODATION CHARGES W.E.F. 01.09.2006') >=0) { break;}

		if( formatted_line.indexOf('DEPARTMENT OF')>=0) { 
			dept = formatted_line; 
			if( dept.indexOf('NEUROLOGY')>=0) { dept = 'DEPARTMENT OF NEUROLOGY';}
			continue; 
		}else {

			var regex1 = /^\w+/;
			var regex2 = /(\d+)(\s+)?$/;
			if( regex1.test(formatted_line) &&  regex2.test(formatted_line)){
				if(formatted_line.length > 80) {
					exception.push(formatted_line); 
				 } else{

				 	var code,info='',rate;
				 	var temp_array = formatted_line.split(" ");
				 	var len = temp_array.length;
				 	code = temp_array[0];
				 	rate = temp_array[len-1];

				 	if(rate ==='') { rate = temp_array[len-2]; len--; }

				 	for(var k=1; k<len-1;k++){
				 		info+=temp_array[k];
				 	}

				 	item = {
				 		"Department": dept,
				 		"code": code,
				 		"description": info,
				 		"rate": rate
				 	}
				 	Hospital.push(item);
				 	itemCount++;
				 }
			} else {
				var regex = /\w+/;
				if(regex.test(formatted_line)){
					exception.push(formatted_line);
				}
			}
		}
	}

	// add from the exception as length was greater than 80
	var item = {
	 		"Department": 'DEPARTMENT OF SURGICAL GASTEROENTROLOGY',
	 		"code": 'SGE230',
	 		"description": 'LAPAROSCOPIC BOWEL RESECTION',
	 		"rate": '11000'
	 		}
	Hospital.push(item);
	itemCount++;
	item = {
	 		"Department": 'DEPARTMENT OF SURGICAL GASTEROENTROLOGY',
	 		"code": 'SGE232',
	 		"description": 'LAPAROSCOPIC CHOLECYSTECTOMY+ADHESIOLYSIS',
	 		"rate": '4400'
	 	}
	Hospital.push(item);
	itemCount++;
}

var CSV;
var link = document.getElementById('DownloadLink'); 
link.addEventListener('click',myFunction);


function myFunction (){
	DataExtractor();
	CSV = toCsv(Hospital);
	CSVDownloader(CSV);
}


/**
* Converts an array of objects (with identical schemas) into a CSV table.
* @param {Array} objArray An array of objects.  Each object in the array must have the same property list.
* @param {string} sDelimiter The string delimiter.  Defaults to a double quote (") if omitted.
* @param {string} cDelimiter The column delimiter.  Defaults to a comma (,) if omitted.
* @return {string} The CSV equivalent of objArray.
*/
function toCsv(objArray, sDelimiter, cDelimiter) {
	var i, l, names = [], name, value, obj, row, output = "", n, nl;

	// Initialize default parameters.
	if (typeof (sDelimiter) === "undefined" || sDelimiter === null) {
		sDelimiter = '"';
	}
	if (typeof (cDelimiter) === "undefined" || cDelimiter === null) {
		cDelimiter = ",";
	}

	for (i = 0, l = objArray.length; i < l; i += 1) {
		// Get the names of the properties.
		obj = objArray[i];
		row = "";
		if (i === 0) {
			// Loop through the names
			for (name in obj) {
				if (obj.hasOwnProperty(name)) {
					names.push(name);
					row += [sDelimiter, name, sDelimiter, cDelimiter].join("");
				}
			}
			row = row.substring(0, row.length - 1);
			output += row;
		}

		output += "\n";
		row = "";
		for (n = 0, nl = names.length; n < nl; n += 1) {
			name = names[n];
			value = obj[name];
			if (n > 0) {
				row += ","
			}
			row += toCsvValue(value, '"');
		}
		output += row;
	}

	return output;
}


/**
* Converts a value to a string appropriate for entry into a CSV table.  E.g., a string value will be surrounded by quotes.
* @param {string|number|object} theValue
* @param {string} sDelimiter The string delimiter.  Defaults to a double quote (") if omitted.
*/
function toCsvValue(theValue, sDelimiter) {
	var t = typeof (theValue), output;

	if (typeof (sDelimiter) === "undefined" || sDelimiter === null) {
		sDelimiter = '"';
	}

	if (t === "undefined" || t === null) {
		output = "";
	} else if (t === "string") {
		output = sDelimiter + theValue + sDelimiter;
	} else {
		output = String(theValue);
	}

	return output;
}

function CSVDownloader( CSV ){
	if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    ReportTitle = "Exported Data";

    //Generate a file name
    var fileName = "My_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    //this trick will generate a temp <a /> tag
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.download = fileName + ".csv";
}
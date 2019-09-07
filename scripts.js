let authkey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImViZjQ1ZWM2NzhhMjdhNTI0NDUyNjcxNzkwNzI4Yjg5ZjI1ZDg4Njg4ZDU2OTUwNDcxNGRhMGMwMWFkN2IwMjJhZTBlOWJkZjM1MDQ3ZDZhIn0.eyJhdWQiOiJ5RGExekU0OEprYkM3QTF5dUxWa3dKUWhRd2N5c3VpUWZzaWJmSmFlaW0xWTl4Z1VsSSIsImp0aSI6ImViZjQ1ZWM2NzhhMjdhNTI0NDUyNjcxNzkwNzI4Yjg5ZjI1ZDg4Njg4ZDU2OTUwNDcxNGRhMGMwMWFkN2IwMjJhZTBlOWJkZjM1MDQ3ZDZhIiwiaWF0IjoxNTY3ODQ3MDk4LCJuYmYiOjE1Njc4NDcwOTgsImV4cCI6MTU2Nzg1MDY5OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.V5Eb2-s0xosJMJY5_wikiYnG-QEuztaVJWGdAuhr-spBzP9pPcqiVUaecvGZqZhHn-2JzMnGygbOZ8UPtqXIC9v1tzdsTwDi73gvsgIh3ciz7sjNJ0x-kk7Li3_6R5b1aG1kvCgNKFQ6oqtfHBmKhGp2wiHWA5Dw539pSQMGsfW0-OJYWxFokxOtkOgIe8evi_wgCBpreHXhlXaedHlsjd-P1hNGWJdh-8XhcGP93jDyAjpDprqukbRJ-v-XaHlsnPe3gGOwKZrG2qF_pjK1uymb2whkcJAwNAwmXhtMppFHPfHziwAzKtsrk3ystEoQOdDJI-ltMYStffzWMNxxuQ";

	
	
function print(elements){
	elements = elements.toString();
	elements = elements.split(",");
	console.log(elements);
	for(var i = 0; i < elements.length; i++){
		console.log(elements[i]);
		findDog(elements[i]);
	}
}

function findDog(element){
	var doOnce = true;
	var xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				//console.log(this.responseText);
				if(this.responseText.length > 1){
				let foundDogs = JSON.parse(this.responseText);
				let foundDogslist = foundDogs.animals;
				if(foundDogslist != null){
				//console.log(foundDogslist[1].url);
					if(doOnce){
					for(var k = 0; k< foundDogslist.length && k < 3; k++){
					console.log(k + " for " + element + ": " +foundDogslist[k].url + ", "
						+ foundDogslist[k].breeds.primary + " ," + foundDogslist[k].name +
						", " + foundDogslist[k].description);
					}
					doOnce = false;
					}
				}
				}
			}
			xml.open("GET", "https://api.petfinder.com/v2/animals?type=dog&breed=" + element, true);
  			xml.setRequestHeader("Authorization", "Bearer " + authkey);
	xml.setRequestHeader("Access-Control-Allow-Headers", "Origin");
	xml.setRequestHeader("Authorization", "Bearer " + authkey);
	xml.setRequestHeader("Access-Control-Allow-Origin", "https://jellyhat.github.io/");
    xml.setRequestHeader("Access-Control-Allow-Credentials", "true");
    xml.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
			xml.send(); 
}


function UserAction() {
	let breed = ["bulldog", "maltese", "abcdefg", "English Bulldog"];
	var xhttp = new XMLHttpRequest();
 	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
		let test = JSON.parse(this.responseText);
		//console.log(JSON.parse(this.responseText));
		let results = test.breeds;
		for (var i = 0; i < results.length; i++) {
		    //console.log(results[i].name);
			for(var l = 0; l < breed.length; l++){
				var result = results[i].name.toLowerCase().indexOf(breed[l].toLowerCase())>=0;
				if(result){
				//console.log("found " + results[i].name);
				breeds.add(results[i].name);
				}
			}
		}
		//console.log(breeds.length + " aaa");
		print(Array.from(breeds));	
	} 
  }	
  xhttp.open("GET", "https://api.petfinder.com/v2/types/dog/breeds", true);
  xhttp.setRequestHeader("Authorization", "Bearer " + authkey);
  xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
	xhttp.setRequestHeader("Authorization", "Bearer " + authkey);
	xhttp.setRequestHeader("Access-Control-Allow-Origin", 'https://jellyhat.github.io');
    xhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  xhttp.send();
  console.log(breeds);
  
}

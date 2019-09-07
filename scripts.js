let authkey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ3ZmIyMzhkMTI4ZDM4NDVmZDRhZmZmZjlmN2EyNTQ4NmIxMDk5MDcyYmU1NTliMWEzNTVhZDE2MjNkMDJjM2U2YWIxZTY4NTQ2MjE0M2UzIn0.eyJhdWQiOiJ5RGExekU0OEprYkM3QTF5dUxWa3dKUWhRd2N5c3VpUWZzaWJmSmFlaW0xWTl4Z1VsSSIsImp0aSI6ImQ3ZmIyMzhkMTI4ZDM4NDVmZDRhZmZmZjlmN2EyNTQ4NmIxMDk5MDcyYmU1NTliMWEzNTVhZDE2MjNkMDJjM2U2YWIxZTY4NTQ2MjE0M2UzIiwiaWF0IjoxNTY3ODQ0MzQxLCJuYmYiOjE1Njc4NDQzNDEsImV4cCI6MTU2Nzg0Nzk0MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.XlUynfQLS24OG-mC70H8jsWxrWtiT7eX4y_EC9sVn0ORIoZdq5hqHvqqLCseCCeWSHjoJSvGXXlK3dpboJTw66Xd4S6-HMls3ZlJoQk8w2v0tNhSDlgqkzzGeWO6QqpCBpB7wW1aIhlWL4byayW4UQmDMte3rgt2G8CAYbbUTixzFM4eghVivSUnDtjBW428ebNszHq8UydajQ7n7PuM6O1Bqhve1mXJ4iQ_hDjVvh6j-K32aNyNd67b6_1Fk78DhBkCJrp7K27gBZ0gxZhR_p11KuqcC6N4zFhqm1Jil3pc3hellITN6MjThnY9pHTV820bX1qwjNEsNPT5VSkXeg";
let breeds = new Set();

	
	
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
  xhttp.send();
  console.log(breeds);
  
}

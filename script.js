tracts = [];
requests = [];

init = async function() {
	data = await d3.csv("data.csv");
	for(i =0; i < data.length; i++){
		var args = {
			lat: data[i].lat,
			lng: data[i].lng
		}
		request = $.get({
			  url: "https://geo.fcc.gov/api/census/block/find?latitude=" + args.lat + "&longitude=%20" + args.lng + "&format=json",
			  success: function(e, args){
			  	var array = [e.Block.FIPS, this.lat, this.lng];
 				tracts.push(array);
			  },
			  dataType: "json",
			  lat: args.lat, 
			  lng: args.lng
		});
		requests.push(request);
	}

	function success(e) {
		console.log("success");
	}

	$.when(requests).done(function(e){
		console.log("done");
	});
	$.when(requests).fail(function(e){
		console.log("fail");
	});

	$('#button').click(function(){
		let csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "tract, lat, lng" + "\r\n";
		tracts.forEach(function(rowArray){
		   let row = rowArray.join(",");
		   csvContent += row + "\r\n";
		}); 
		
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	});
};

init();


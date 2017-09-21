// Interface to API's

var apiArray = [
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['freemusicarchive', 'https://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10', ''],
	['youtube', 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&', 'key=AIzaSyAKbYAjNo72FOZ6S0XZoW395R2LTWIm8II'],
	['bandsintown', 'https://rest.bandsintown.com/artists/van morrison?', 'app_id=codingbootcamp'],
	['eventful', 'https://cors.io/?https://eventful.com/json/events/search?q=concert', 'G8jtQgjTFGVsmvdV'],

	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&page=1&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'], 
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/track.snippet.get?track_id=16860631&page=1&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=437407&page_size=2&page=1&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/album.get?album_id=14250417&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],

	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=12650515&page=1&page_size=2&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/page=1&tracking.url.get?domain=irgead73.github.io.project-one&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/matcher.track.get?q_artist=eminem&q_track=lose%20yourself%20(soundtrack)&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/track.search?q=sun&page_size=10&page=1&s_track_rating=desc&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=10&page=1&s_track_rating=desc&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],

	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/track.get?track_id=15445219&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/artist.get?artist_id=56&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	//['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/&page=1&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	//['musixmatch', 'https://cors.io/?https://api.musixmatch.com/ws/1.1/&page=1&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
];

var apis = [
	{
		apiname: 'musixmatch', 
		baseurl: 'https://api.musixmatch.com/ws/1.1/', 	
		types: ['chart.artists.get?'],
		apikey: 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'
	},
		{
		apiname: 'freemusicarchive', 
		baseurl: 'https://freemusicarchive.org/api/',
		types: ['trackSearch?'], 
		apikey: ''
	},
		{
		apiname: 'youtube', 
		baseurl: 'https://www.googleapis.com/youtube/v3/', 
		types: ['search?'],
		apikey: 'key=AIzaSyAKbYAjNo72FOZ6S0XZoW395R2LTWIm8II'
	},
		{
		apiname: 'bandsintown', 
		baseurl: 'https://rest.bandsintown.com/',
		types: ['artists/'], 							// note question mark goes After artist here
		apikey: 'app_id=codingbootcamp'
	},
		{
		apiname: 'eventful', 
		baseurl: 'https://eventful.com/', 
		types: ['json/events/search?'],
		apikey: 'G8jtQgjTFGVsmvdV'
	}
];

var searchObject = "";

function controlApiQuery () {

}

function getApiInfo (apiName) {
	//console.log("getApiInfo function");

	var queryString;

	switch (apiName) {
		case 'musixmatch':
			queryString = constructQueryString(0);
			break;
		case 'freemusicarchive':
			queryString = constructQueryString(1);
			break;		
		case 'youtube':
			queryString = constructQueryString(2);
			break;		
		case 'bandsintown':
			queryString = constructQueryString(3);
			break;		
		case 'eventful':
			queryString = constructQueryString(4);
			break;		
		default:
			console.log("Error: invalid getApiInfo() name")
	}	// switch

    console.log("queryString: ", queryString);

	$.ajax({
		  //dataType: 'jsonp',
          url: queryString,
          method: "GET"    
        }).done(function(response) {
            console.log("response: ", response);
    });
	
}

// Use apisArray to construct query String based on index
function constructQueryString (index) {
	//console.log("constructQueryString function");
	var queryString = 
         apis[index].baseurl
         + apis[index].types
         + apis[index].apikey;

    //console.log("queryString: ", queryString);    
    return queryString;
}

// This function automatically takes all the input from a form and sends it to an API
// Please note that values from inputs with a type of checkbox or radio are included only if they are checked
function serialQueryApi (formName) {
	//The .serialize() method serializes a form's data into a query string. 
	//For the element's value to be serialized, it must have a name attribute. 
	var baseUrl = 'http://api.musixmatch.com/ws/1.1/';
	var formData = $("#formName").serialize();

	var queryString = 
		baseUrl
		+ formData;

    console.log("queryString: ", queryString);

	$.ajax({
		  //dataType: 'jsonp',
          url: queryString,
          method: "GET"    
        }).done(function(response) {
            console.log("response: ", response);
    });

}

function queryApi (index) {
	var queryString = 
         //apiArray[index][0]
         apiArray[index][1]
         + apiArray[index][2];

         console.log("queryString: ", queryString);

	$.ajax({
		  //dataType: 'jsonp',
          url: queryString,
          method: "GET"    
        }).done(function(response) {
            console.log("response: ", response);
    });

}

function test(artist) {

var getThis = function(url){
  	return new Promise (function(resolve, reject){
    $.ajax({
      url: url,
      method: "GET"
    }).done(function(data) {
      resolve(data);
    });
  });
}

getThis("https://cors.io/?"
	+ "https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it&apikey=4dd81b4d24fc4b88c41b0e8638cc97aa")
	.then(function(result){console.log(result)})

}

      //$(document).on("click", <"h1">, queryApi(musixMatch, chartartistsget));
//$(document).ready(function(){
    $("h1").click(function(){
  		//console.log("click");
    	//test ("van Morrison");
    	//getThis();
    	//queryApi(0);		// musixmatch country source
    	//queryApi(1);		// fma track search by artist deerhoof
    	//queryApi(2);		// some kind of youtube search
    	//queryApi(3);		// bands in town - van morrison
    	//queryApi(4);		// eventful

    	//queryApi(5);		// musixmatch - lyrics search by mm track id #
    	//queryApi(6);		// musixmatch - snippet search by mm track id #  	
    	//queryApi(7); 		// musixmatch - match sexy and i know it  - works (doesn't like page at end) 	
    	//queryApi(8);    	// artist.related.get?artist_id=437407&page_size=2&page=1 - works (no Faith Hill?) 
    	//queryApi(9);   	// album.get?album_id=14250417& - works - don't use page params

    	queryApi(10); 	// album.tracks.get?album_id=12650515 &page=1&page_size=2&
    	//queryApi(11);    	// tracking URL not working - not needed
    	//queryApi(12);		// matcher.track.get?q_artist=eminem&q_track=lose%20yourself%20(soundtrack)&

    	//queryApi(13);		// q=sun&page_size=10&page=1&s_track_rating=desc&    	
    	//queryApi(14);    	// q_artist=justin bieber&page_size=10&page=1&s_track_rating=desc&
    	//queryApi(15);		// track.get?track_id=15445219&
    	//queryApi(16);		// artist.get?artist_id=118
    	//getApiInfo("musixmatch");
    	//getApiInfo("freemusicarchive");
    	//getApiInfo("youtube");
    	//getApiInfo("bandsintown");
    	//getApiInfo("eventful");
    });
//});
//.ajaxSuccess();
//.ajaxError();
//.ajaxStart()
//.ajaxSend();
//.ajaxComplete();
//.ajaxStop();
// ajaxStart (Global Event)
// This event is triggered if an Ajax request is started and no other Ajax requests are currently running.
// 	beforeSend (Local Event)
// 	This event, which is triggered before an Ajax request is started, allows you to modify the XMLHttpRequest object (setting additional headers, if need be.)
// 	ajaxSend (Global Event)
// 	This global event is also triggered before the request is run.
// 	success (Local Event)
// 	This event is only called if the request was successful (no errors from the server, no errors with the data).
// 	ajaxSuccess (Global Event)
// 	This event is also only called if the request was successful.
// 	error (Local Event)
// 	This event is only called if an error occurred with the request (you can never have both an error and a success callback with a request).
// 	ajaxError (Global Event)
// 	This global event behaves the same as the local error event.
// 	complete (Local Event)
// 	This event is called regardless of if the request was successful, or not. You will always receive a complete callback, even for synchronous requests.
// 	ajaxComplete (Global Event)
// 	This event behaves the same as the complete event and will be triggered every time an Ajax request finishes.
// ajaxStop (Global Event)
// This global event is triggered if there are no more Ajax requests being processed.
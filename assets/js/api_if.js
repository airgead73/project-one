// Interface to API's

var apiArray = [
	['musixmatch', 'http://api.musixmatch.com/ws/1.1/chart.artists.get?', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'],
	['freemusicarchive', 'https://freemusicarchive.org/api/trackSearch?', ''],
	['youtube', 'https://www.googleapis.com/youtube/v3/search?', 'key=AIzaSyAKbYAjNo72FOZ6S0XZoW395R2LTWIm8II'],
	['bandsintown', 'https://rest.bandsintown.com/artists/', 'app_id=codingbootcamp'],
	['eventful', 'https://eventful.com/jason/events/search?', 'G8jtQgjTFGVsmvdV']
];

var apis = [
	{
		apiname: 'musixmatch', 
		baseurl: 'https://api.musixmatch.com/ws/1.1/', 	// was http:
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
		types: ['jason/events/search?'],
		apikey: 'G8jtQgjTFGVsmvdV'
	}
];

var searchObject = "";

function controlApiQuery () {

}

function getApiInfo (apiName) {
	console.log("getApiInfo function");

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

    //console.log("queryString: ", queryString);

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
	console.log("constructQueryString function");
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

function queryApi (apiName, queryType, searchObject) {
	var queryString = 
         apis[0].baseurl
         + apis[0].types
         + apis[0].apikey;

         console.log("queryString: ", queryString);

	$.ajax({
		  //dataType: 'jsonp',
          url: queryString,
          method: "GET"    
        }).done(function(response) {
            console.log("response: ", response);
    });

}

      //$(document).on("click", <"h1">, queryApi(musixMatch, chartartistsget));
//$(document).ready(function(){
    $("h1").click(function(){
    	//queryApi("dummy1", "dummy2");
    	getApiInfo("musixmatch");
    	getApiInfo("freemusicarchive");
    	getApiInfo("youtube");
    	getApiInfo("bandsintown");
    	getApiInfo("eventful");
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
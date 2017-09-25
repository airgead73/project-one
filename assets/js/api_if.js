// Interface to API's

/**
 * Global variables
 *  - design note: Possible convenience feature - should really not need these for anything
 */
var gblResponse = {};
var gblApiName = '';
var gblBaseUrl = '';
var gblSearchType = '';
var gblCountry = '';

/**
 * apiObj - this is the main wrapper object to access all api related stuff
 * 
 */
var apiObj = {

	keywordSearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.keyworkSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('keywordSearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'q=' + searchString + '&' + searchParam + key;
		console.log("apiObj.keywordSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	songSearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.songSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('trackSearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'q_track=' + searchString + '&' + searchParam + key;
		console.log("apiObj.songSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	artistSearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.artistSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('keywordSearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'q_artist=' + searchString + '&' + searchParam + key;
		console.log("apiObj.artistSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	lyricsSearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.lyricsSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : '';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('lyricsSearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'track_id=' + searchString + '&' + searchParam + key;
		console.log("apiObj.lyricsSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	videoSearch: function (keyword) {
		//return apiObj ();
	},

	audioSearch: function (song) {

	},

	someKindOfSearch: function () {

		return new apiObj (artist_id, artist_name);		// don't need the new...
	},

	getApiData: function () {

	},

	callAjax: function (queryString) {
  		console.log("apiObj.callAjax function");

		var queryString = queryString;

    	console.log("callAjax function: queryString: ", queryString);

		$.ajax({
		  	dataType: 'json',
          	url: queryString,
          	method: "GET"    
        	}).done(function(response) {
            	apiObj.processResponse(response);		// doesn't work with 'this'(type error) - says it's not a function 
            	//fooDone(response);			// works           	
    	});

	},

	processResponse: function (response) {

		//var myResponse = response;

		console.log ("apiObj: processResponse: response", response);

		if (typeof response.message.body != undefined) {
			console.log("apiObj: processResponse: response.message.body", response.message.body);
		};


		//console.log ("apiObj: processResponse.message.body: ", response.message.body);

		//console.log ("apiObj: processResponse.message.body.lyrics.lyrics.body: ", response.message.body.lyrics.lyrics_body);

		var myObject = {level1: {level2: {level3: {level4: {level5: 'track_list'}}}}};
		console.log ("Object.get: ", Object.get(myObject, 'level1.level2.level3.level4.level5'));

		if(typeof response.message.body.track_list != undefined) {
			console.log ("apiObj: processResponse.message.body.track_list: ", response.message.body.track_list);			
		}
		//console.log ("apiObj: processResponse.message.body.track_list[0].track.track_name: ", response.message.body.track_list[0].track.track_name);



		//console.log("apiObj.processResponse: ", myResponse[100]);

	},



	showApiData: function () {
		console.log("showApiData function called");

		console.log("apiData: artist_id: ", this.apiData.artist_id);		
		console.log("apiData: artist_name: ", this.apiData.artist_name);		
		console.log("apiData: album_id: ", this.apiData.album_id);		
		console.log("apiData: album_name: ", this.apiData.album_name);		
		console.log("apiData: album_art: ", this.apiData.album_art);		
		console.log("apiData: track_id: ", this.apiData.track_id);		
		console.log("apiData: track_name: ", this.apiData.track_name);		
		console.log("apiData: lyrics_id: ", this.apiData.lyrics_id);		
		console.log("apiData: lyrics_body: ", this.apiData.lyrics_body);	

		//console.log("placeholder: ", this.);		
		//console.log("placeholder: ", this.);		
		//console.log("placeholder: ", this.);		
	},

	firstLevelFunction: function () {

		this.helperFn = function (value) {
			this.something = value;
			return this;
		};
	},

	helperFn: function () {
		console.log("In helperFn: ");
	},

	apiData: {

		artist_id: 0,
		artist_name: "",
		album_id: 0,
		album_name: "",
		album_art: "",
		track_id: 0,
		track_name: "lawdkjflaksdfjla",
		lyrics_id: 12345,
		lyrics_body: "Oh baby baby",
		album_year: "1955",

	},

};	// apiObject

Object.get = function(object, property) {
    var properties = property.split('.');
    for (var i = 0; i < properties.length; i++) {
        if (object && object[properties[i]]) {
            object = object[properties[i]];
        }
        else {
            return null;
        }
    }
    return object;
},

function fooDone (response) {
	console.log ("fooDone: ", JSON.parse(response));
};



/**
 * Plain Vanilla Functions - you can call these on their own to return a result string 
 * 	- they do not affect the apiObj{}
 * 	- return = string result(s)
 */

function keywordSearch (searchString, apiName, searchParam) {
	apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
	searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

	var search = searchString;
	var baseUrl = getBaseUrl(apiName);
	var searchType = getSearchType('keywordSearch');
	var key = getKey(apiName);
	queryString = baseUrl + searchType + 'q=' + searchString + '&' + searchParam + key;
	console.log("keywordSearch: queryString: ", queryString);

	callAjax(queryString);
}

function songSearch (searchString, apiName, searchParam) {
	apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
	searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

	var search = searchString;
	var baseUrl = getBaseUrl(apiName);
	var searchType = getSearchType('keywordSearch');
	var key = getKey(apiName);
	queryString = baseUrl + searchType + 'q_track=' + searchString + '&' + searchParam + key;
	console.log("songSearch: queryString: ", queryString);

	callAjax(queryString);
}

function artistSearch (searchString, apiName, searchParam) {
	apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
	searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

	var search = searchString;
	var baseUrl = getBaseUrl(apiName);
	var searchType = getSearchType('keywordSearch');
	var key = getKey(apiName);
	queryString = baseUrl + searchType + 'q_artist=' + searchString + '&' + searchParam + key;
	console.log("artistSearch: queryString: ", queryString);

	callAjax(queryString);
}

function lyricsSearch (searchString, apiName, searchParam) {
	apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
	searchParam = (typeof searchParam !== 'undefined') ?  searchParam : '';	// default to this if no param is given\

	var search = searchString;
	var baseUrl = getBaseUrl(apiName);
	var searchType = getSearchType('lyricsSearch');
	var key = getKey(apiName);
	queryString = baseUrl + searchType + 'q_artist=' + searchString + '&' + searchParam + key;
	console.log("artistSearch: queryString: ", queryString);

	callAjax(queryString);
}

/**
 * Helper Functions
 *  - used by other functions
 *  - return a string to use, such as baseUrl e.g.
 *  - or return a response object
 *  - or populate the apiObj {}
 */

function getBaseUrl (apiName) {
	//console.log("getBaseUrl: apiName", apiName);

	var proxy = 'https://cors.io/?'
	var baseUrl = '';

	switch (apiName) {
		case 'musixmatch':
			baseUrl = 'https://api.musixmatch.com/ws/1.1/';
			break;
		case 'freemusicarchive':
			baseUrl = 'https://freemusicarchive.org/api/';
			break;		
		case 'youtube':
			baseUrl = 'https://www.googleapis.com/youtube/v3/';
			break;		
		case 'bandsintown':
			baseUrl = 'https://rest.bandsintown.com/';
			break;		
		case 'eventful':
			baseUrl = 'https://eventful.com/';
			break;		
		default:
			console.log("Error: invalid apiName parameter passed to function getBaseUrl")
	}	// switch

    console.log("proxy: ", proxy);
    console.log("baseUrl: ", baseUrl);
    console.log("proxy + baseUrl", proxy + baseUrl);

    return (proxy + baseUrl);	
}	// function getBaseUrl()

function getKey(apiName) {
	//console.log("getKey: apiName: ", apiName);

	var thekey = '';

	switch (apiName) {
		case 'musixmatch':
			thekey = 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa';
			break;
		case 'freemusicarchive':
			thekey = '';
			break;		
		case 'youtube':
			thekey = 'key=AIzaSyAKbYAjNo72FOZ6S0XZoW395R2LTWIm8II';
			break;		
		case 'bandsintown':
			thekey = 'app_id=codingbootcamp';
			break;		
		case 'eventful':
			thekey = 'G8jtQgjTFGVsmvdV';
			break;		
		default:
			console.log("Error: invalid apiName parameter passed to function getKey")
	}	// switch

    console.log("getKey function: key: ", thekey);

    return (thekey);	
} // getKey()

function getSearchType (searchType, secondParam) {
	console.log("getSearchType function searchType: ", searchType);
	console.log("getSearchType function secondParam: ", secondParam);

	var searchType = searchType; // does it work without this line?

	switch (searchType) {
		case 'countrySearch': 			// musixMatch only for now - chart.artists.get?page=1&page_size=3&country=it& 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'
			searchTypeString = '';
			break;
		case 'trackSearch': 			// fma - trackSearch?q=deerhoof&limit=10' 
			searchTypeString = 'track.search?';
			break;		
		case 'videoSearch': 			// youTube part=snippet&order=rating&type=video&videoDefinition=high&videoEmbeddable=true& 'key=AIzaSyAKbYAjNo72FOZ6S0XZoW395R2LTWIm8II'
			searchTypeString = '';
			break;		
		case 'lyricsSearch': 						// bandsInTown artists/van morrison?', 'app_id=codingbootcamp'
			searchTypeString = 'track.lyrics.get?';
			break;		
		case 'keywordSearch': 						// musixmatch track.search?q=sun&page_size=10&page=1&s_track_rating=desc&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'
			searchTypeString = 'track.search?';	// track.search?q=sun&page_size=10&page=1&s_track_rating=desc&', 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'';
			break;		
		case '4': 						// musixmatch
			searchTypeString = '';
			break;		
		default:
			console.log("Error: invalid seachType parameter passed to function getsearchType")
	}	// switch

    console.log("searchTypeString: ", searchTypeString);
    return (searchTypeString);	
}	// function getsearchType()

function callAjax (queryString) {
  	//console.log("callAjax function");

	var queryString = queryString;

    console.log("callAjax function: queryString: ", queryString);

	$.ajax({
		  //dataType: 'jsonp',
          url: queryString,
          method: "GET"    
        }).done(function(response) {
            console.log("callAjax: response: ", JSON.parse(response));
            gblResponse = response;								// any reason we can't do this?
    });

}


//$(document).on("click", <"h1">, queryApi(musixMatch, chartartistsget));
//$(document).ready(function(){
    $(".team-name").click(function() {
    	apiObj.keywordSearch("sun");    	
    	apiObj.songSearch("rocket man");
    	apiObj.artistSearch("Van Morrison");
    	apiObj.lyricsSearch(15953433);
    	apiObj.showApiData();

    });

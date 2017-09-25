// Interface to API's

/**
 * Global variables
 *  - design note: Possible convenience feature - should really not need these for anything
 */
var gblResponse = {};
var test = null;

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

	countrySearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.countrySearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page=1&page_size=3&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('countrySearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'country=' + searchString + '&' + searchParam + key;
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

		if (response.message.body.hasOwnProperty('track_list')) {
			console.log ("apiObj: processResponse.message.body.track_list: ", response.message.body.track_list);
			console.log ("apiObj: processResponse.message.body.track_list[0]: ", response.message.body.track_list[0]);
			console.log ("apiObj: processResponse.message.body.track_list[0].track: ", response.message.body.track_list[0].track);
			console.log ("apiObj: processResponse.message.body.track_list[0].track.track_id: ", response.message.body.track_list[0].track.track_id);

			this.track_id = response.message.body.track_list[0].track.track_id;
			this.track_name	= response.message.body.track_list[0].track.track_name;
			this.lyrics_id = response.message.body.track_list[0].track.lyrics_id;
			this.album_id = response.message.body.track_list[0].track.album_id;
			this.album_name = response.message.body.track_list[0].track.album_name;
			this.album_art = response.message.body.track_list[0].track.album_coverart_100x100;
		};

		if (response.message.body.hasOwnProperty('artist_list')) {
			console.log ("apiObj: processResponse.message.body.artist_list: ", response.message.body.artist_list);
			console.log ("apiObj: processResponse.message.body.artist_list[0]: ", response.message.body.artist_list[0]);
			console.log ("apiObj: processResponse.message.body.artist_list[0].artist: ", response.message.body.artist_list[0].artist);
			console.log ("apiObj: processResponse.message.body.artist_list[0].artist.artist_id: ", response.message.body.artist_list[0].artist.artist_id);

			this.artist_id = response.message.body.artist_list[0].artist.artist_id;
			this.artist_name	= response.message.body.artist_list[0].artist.artist_name;
		};	

		if (response.message.body.hasOwnProperty('lyrics')) {
			console.log ("apiObj: processResponse.message.body.lyrics: ", response.message.body.lyrics);

			this.lyrics_body = response.message.body.lyrics.lyrics_body;

			this.showApiData();

		};

		console.log("Object.keys: ", Object.keys(response)); // shows single key "message" in red

	},



	showApiData: function () {
		//console.log("showApiData function called");

		console.log("\n");
		console.log("======================================");
		console.log("          API DATA");
		console.log("======================================");
		console.log("\t" + "artist_id: ", this.artist_id);		
		console.log("\t" + "artist_name: ", this.artist_name);		
		console.log("\t" + "album_id: ", this.album_id);		
		console.log("\t" + "album_name: ", this.album_name);		
		console.log("\t" + "album_art: ", this.album_art);		
		console.log("\t" + "track_id: ", this.track_id);		
		console.log("\t" + "track_name: ", this.track_name);		
		console.log("\t" + "lyrics_id: ", this.lyrics_id);		
		console.log("\t" + "lyrics_body: ", this.lyrics_body);	
		console.log('\n');
	
	},

	clearApiData: function () {
		//console.log("clearApiData function called");

		artist_id = null;		
		artist_name = "";	
		album_id = null;	
		album_name = "";		
		album_art =	"";	
		track_id = null;	
		track_name = "";		
		lyrics_id =	null;
		lyrics_body = "";
		album_year: "";	
	
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

	//apiData: {

		artist_id: 0,
		artist_name: "",
		album_id: 0,
		album_name: "",
		album_art: "",
		track_id: 0,
		track_name: "",
		lyrics_id: 12345,
		lyrics_body: "Oh baby baby",
		album_year: "1955",

	//},

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

function countrySearch (searchString, apiName, searchParam) {
		console.log("apiObj.countrySearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page=1&page_size=3&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = getBaseUrl(apiName);
		var searchType = getSearchType('countrySearch');
		var key = getKey(apiName);
		queryString = baseUrl + searchType + 'track_id=' + searchString + '&' + searchParam + key;
		console.log("apiObj.lyricsSearch: queryString: ", queryString);

		this.callAjax(queryString);
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

	//var proxy = 'https://cors.io/?'
	//var proxy = 'http://cors-proxy.htmldriven.com/?url='
	//var proxy = 'https://crossorigin.me/'
	var proxy = 'https://cors-anywhere.herokuapp.com/'
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
			searchTypeString = 'chart.artists.get?';
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
		case 'test': 						// musixmatch
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
		  dataType: 'json',		// otherwise you get a very long char array!
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
    	apiObj.countrySearch("it");
    	apiObj.showApiData();

    });

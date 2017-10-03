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

	tracks: [],
	track: '',

	keywordSearch: function (searchString, apiName, searchParam) {
		//console.log("apiObj.keyworkSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';						// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = this.getBaseUrl(apiName);
		var searchType = this.getSearchType('keywordSearch');
		var key = this.getKey(apiName);
		queryString = baseUrl + searchType + 'q=' + searchString + '&' + searchParam + key;
		//console.log("apiObj.keywordSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	songSearch: function (searchString, apiName, searchParam) {
		//console.log("apiObj.songSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : '';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = this.getBaseUrl(apiName);
		var searchType = this.getSearchType('songSearch');
		var key = this.getKey(apiName);
		queryString = baseUrl + searchType + 'track_id=' + searchString + '&' + searchParam + key;
		//console.log("apiObj.songSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	artistSearch: function (searchString, apiName, searchParam) {
		//console.log("apiObj.artistSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page_size=10&page=1&s_track_rating=desc&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = this.getBaseUrl(apiName);
		var searchType = this.getSearchType('keywordSearch');
		var key = this.getKey(apiName);
		//queryString = baseUrl + searchType + 'q_artist=' + searchString + '&' + searchParam + key;
		console.log("apiObj.artistSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	lyricsSearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.lyricsSearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : '';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = this.getBaseUrl(apiName);
		var searchType = this.getSearchType('lyricsSearch');
		var key = this.getKey(apiName);
		queryString = baseUrl + searchType + 'track_id=' + searchString + '&' + searchParam + key;
		console.log("apiObj.lyricsSearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	countrySearch: function (searchString, apiName, searchParam) {
		console.log("apiObj.countrySearch fn: searchString: ", searchString);
		apiName = (typeof apiName !== 'undefined') ?  apiName : 'musixmatch';		// default to musixMatch if no name is given
		searchParam = (typeof searchParam !== 'undefined') ?  searchParam : 'page=1&page_size=3&';	// default to this if no param is given\

		var search = searchString;
		var baseUrl = this.getBaseUrl(apiName);
		var searchType = this.getSearchType('countrySearch');
		var key = this.getKey(apiName);
		queryString = baseUrl + searchType + 'country=' + searchString + '&' + searchParam + key;
		console.log("apiObj.countrySearch: queryString: ", queryString);

		this.callAjax(queryString);
	},

	getApiData: function () {

	},

	getBaseUrl: function (apiName) {
		//console.log("getBaseUrl: apiName", apiName);
	
		//var proxy = 'https://cors.io/?'
		var proxy = 'https://thingproxy.freeboard.io/fetch/'
		//var proxy = 'https://cors-anywhere.herokuapp.com/'

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
	
	    //console.log("proxy: ", proxy);
	    //console.log("baseUrl: ", baseUrl);
	    //console.log("proxy + baseUrl", proxy + baseUrl);
	
	    return (proxy + baseUrl);	
	},	// function getBaseUrl()
	
	getKey: function (apiName) {
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
	
	    //console.log("getKey function: key: ", thekey);
	
	    return (thekey);	
	}, // getKey()
	
	getSearchType: function (searchType, secondParam) {
		//console.log("getSearchType function searchType: ", searchType);
		//console.log("getSearchType function secondParam: ", secondParam);
	
		var searchType = searchType; // does it work without this line?
	
		switch (searchType) {
			case 'countrySearch': 			// musixMatch only for now - chart.artists.get?page=1&page_size=3&country=it& 'apikey=4dd81b4d24fc4b88c41b0e8638cc97aa'
				searchTypeString = 'chart.artists.get?';
				break;
			case 'songSearch': 			// fma - trackSearch?q=deerhoof&limit=10' 
				searchTypeString = 'track.get?';
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
	
	    //console.log("searchTypeString: ", searchTypeString);
	    return (searchTypeString);	
	},	// function getsearchType()

	callAjax: function (queryString) {
  		//console.log("apiObj.callAjax function");

		var queryString = queryString;

    	//console.log("callAjax function: queryString: ", queryString);

		$.ajax({
		  	dataType: 'json',
          	url: queryString,
          	method: "GET"    
        	}).done(function(response) {
            	apiObj.processResponse(response);		// doesn't work with 'this'(type error) - says it's not a function          	
    	});

	},

	buildTrack: function(item) {
		console.log(item);
		return {
			cover_art: item.track.album_coverart_100x100,
			artist_name: item.track.artist_name,
			track_id: item.track.track_id,
			track_name: item.track.track_name,
			lyrics_id: item.track.lyrics_id,
			album_id: item.track.album_id,
			album_name: item.track.album_name,
			album_art: item.track.album_coverart_100x100
		};
	},

	
	processResponse: function (response) {

		//console.log ("apiObj: processResponse: response", response);

		if (typeof response.message.body != undefined) {
			console.log("apiObj: processResponse: response.message.body", response.message.body);
		};

		if (response.message.body.hasOwnProperty('track_list')) {

			this.tracks = [];
			for (var i = 0; i < response.message.body.track_list.length; i++) {
				this.tracks.push( this.buildTrack(response.message.body.track_list[i]) );
			}

			//console.log('TRACKS: ', this.tracks);
			this.showTracks(this.tracks, "#results-items");
		};

		if (response.message.body.hasOwnProperty('track')) {

			this.track = this.buildTrack(response.message.body);

			//console.log('TRACK: ', this.track);
			this.showTrack(this.track, "#my-favs");
		};

		if (response.message.body.hasOwnProperty('artist_list')) {

			this.artist_id = response.message.body.artist_list[0].artist.artist_id;
			this.artist_name	= response.message.body.artist_list[0].artist.artist_name;

			this.showTracks();
		};	

		if (response.message.body.hasOwnProperty('lyrics')) {

			this.lyrics_body = response.message.body.lyrics.lyrics_body;

			//console.log("LYRICS: ", this.lyrics_body);
			this.showTrack(this.track, "#my-favs");

		};

	},

	populateTrackDetail: function(track){
			$("#detail-track").html(track.track_name);
			$("#detail-name").html(track.artist_name);
			$("#detail-album").html(track.album_name);
			$("#detail-lyrics").html(track.lyrics_id);
			$("#detail-cover-art").attr('src',  track.cover_art);
	},

	showTrack: function(track, target){
		//console.log("track: ", track);
		//console.log("target: ", target);

		$(target).append(
			$('<tr>')
				.data('track', track)
				.append('<td>' + track.track_id + '</td>')
				.append('<td>' + track.track_name + '</td>')
				.append('<td>' + track.artist_name + '</td>')
				.append('<td>' + track.album_name + '</td>')
				//.append('<td>' + track.lyrics_id + '</td>')
			    .append($('<td class="detail">').text("detail").data('track', track).data('track-name', track.track_name))
				.append('<td><input type="checkbox" class="fav" data-for="' + track.track_id + '" type="checkbox"></td>')
			);
		},


	showTracks: function (tracks, target) {
		//console.log("showTracks function called");
		for (var i = 0; i < tracks.length; i++) {
			this.showTrack(tracks[i], target);
		}
	},

};	// apiObject






// FOR DEBUG ONLY
    $(".team-name").click(function() {
    	//apiObj.keywordSearch("sun");    	
    	//apiObj.songSearch("15445219");
    	//apiObj.artistSearch("Van Morrison");
    	//apiObj.lyricsSearch(15953433);
    	//apiObj.countrySearch("it");
    	//apiObj.showTracks();

    });

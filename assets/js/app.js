////////////////////////////////////////////
// html container variables

var openAccess = $("#open-user-forms");
var closeAccess = $("#close-user-forms");
var profile = $("#profile");
var userForms = $("#user-forms");
var results = $("#results-container");
var searchOpen = $("#searchButton");
var searchClose = $("#close-search-container");
var detail = $("#detail-container");
var detailClose = $("#close-detail-container");
var video = $("#vidHere");

////////////////////////////////////////////
// general show/hide functions

function changeUserStatus(username) {
	var userStatus = $(openAccess).attr("data-status");
	$(openAccess).attr("data-status", "logged");
	$(openAccess).attr("value", username + ": log out");
}

function emptyAlert() {
	$("#fav-save-alert").empty();
}

function open(elem) {
	$(elem).addClass("js-active");
}

function close(elem) {
	$(elem).removeClass("js-active");
}

function stopVideo(elem) {
	$(elem).attr("src", " ");
}

function reset() {
	$("#my-favs").empty();
	$("#results-items").empty();
	$("#search").val("");
	$("#fav-save-alert").html("");
	$("#login-alert").html("");
	close(results);
}

////////////////////////////////////////////
// firebase

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBND2-Ea8JLnajfN-fKzjSv7NZbcL25EGY",
	authDomain: "users-91bb6.firebaseapp.com",
	databaseURL: "https://users-91bb6.firebaseio.com",
	projectId: "users-91bb6",
	storageBucket: "users-91bb6.appspot.com",
	messagingSenderId: "112492288457"
};

firebase.initializeApp(config);

var database = firebase.database();
//firebase variables
var name = "";
var username = "";

//get logged in user
function getCurrentUser(u, cb) {
	//gets the logged in user and returns tracks
	database.ref("users").orderByChild('username').equalTo(u).on("child_added", function (snapshot) {
		var sv = snapshot.val();
		var userId = snapshot.key;
		sessionStorage.setItem('userId', userId);
		sessionStorage.setItem('username', u);
		changeUserStatus(u);
		var newStatus = $(openAccess).attr("data-status");
		console.log("Log in was clicked. User status is now " + newStatus + ".");
		cb(sv);
	});
}

////////////////////////////////////////////
// event handlers



//sign in to application
$("#login").on("click", function () {
	event.preventDefault();
	reset();
	loginuser = $("#un").val().trim();
	console.log("you entered loginuser name: " + loginuser);
	if (loginuser === "") {
		$("#login-alert").html("Enter a username to continue");
	} else {
		getCurrentUser(loginuser, function (sv) {
			for (var key in sv.tracks) {
				apiObj.songSearch(sv.tracks[key]);
				//writeFavorites(sv.tracks[key]);
				console.log(sv.tracks[key]);
			}
		});
		close(userForms);
		open(profile);
	}
});

$("#signup").on("click", function () {
	event.preventDefault();
	reset();
	name = $("#name").val().trim();
	username = $("#new-un").val().trim();
	// database.ref("users/" +username).set({
	database.ref("users").push({
		name: name,
		username: username,
		added: firebase.database.ServerValue.TIMESTAMP
	})

	getCurrentUser(username, function (sv) {
		// console.log("i am in the callback function");
	});
	close(userForms);
	open(profile);
});

//---save favorites 
$('#fav-save').click(function () {
	event.preventDefault();
	var userId = sessionStorage.getItem('userId');
	if (userId === null) {
		//alert("You need to log in to save a track");
		$("#fav-save-alert").text(" You need to log in to save favorites");
		console.log("you need to login");
	} else {
		var currentTracks = [];
		database.ref('users').child(userId).once('value').then(function (snapshot) {
			var user = snapshot.val();
			if (user.tracks) {
				currentTracks = Object.values(user.tracks)
			}
			// console.log(snapshot.val());
			//getting object into an array
			// console.log("current tracks: " + currentTracks);            
			$("input:checkbox:checked", "#results-items").each(function () {
				var track = $(this).data("for");
				// console.log("checked track: "  + track);
				if (currentTracks.indexOf(track) === -1) {
					database.ref("users/" + userId + "/tracks").push(track);
					currentTracks.push(track);
					apiObj.songSearch(track);
					//writeFavorites(track);
				}
			});
		});

		$("#fav-save-alert").text(" Your favorites have been saved");
		setTimeout(emptyAlert, 2000);

	}
});
//add favorites to table
function writeFavorites(tracks) {
	$("#my-favs")
		.append("<tr><td>" + tracks + "</td><td>Track Name</td><td>Artist</td><td>Album</td></tr>");
}

// add search results when user clicks search button 
$("#searchButton").click(function () {
	$("#results-items").empty();
	var searchString = $("#search").val().trim();
	console.log("my search " + searchString);
	$("#searchterm").html(searchString);
	apiObj.keywordSearch(searchString);
});

//add search results when user hits enter with search field in focus
$("#search").keypress(function (event) {
	if (event.which === 13) {
		$("#searchButton").click();
	}
});


// When person clicks button at top right of page ...
$(openAccess).on("click", function () {
	var userStatus = $(openAccess).attr("data-status");

	// if person not logged in yet, signup/login form pops up
	if (userStatus === "notLogged") {
		console.log("opening log in screen");
		open(userForms);

		// if person has logged in, favorites will appear instead of login
	} else if (userStatus === "logged") {
		console.log("favorites will open instead");
		$(profile).addClass("js-active");
		$("#main-logo").removeClass("col-6").addClass("col-2");
		$("intro").removeClass("col-6").addClass("col-10");
		$("#un").val("");
		$("#name").val("");
		$("#new-un").val("");
		open(userForms);
	}
});

// closes signup/login box
$(closeAccess).on("click", function () {
	console.log("closing log in screen");
	close(userForms);

});

// Opens search
//Would need to be combined with other functions that are tied to #searchButton on app.js

$(searchOpen).on("click", function (event) {
	event.preventDefault();
	console.log("search clicked");
	open(results);
	$(profile).addClass("min-banner");
});


// closes search field
$(searchClose).on("click", function (event) {
	event.preventDefault();
	close(results);
	$(profile).removeClass("min-banner");
});

$("#my-favs").on("click", ".detail", function () {
	console.log("Table row clicked");
	var track = $(this).data("track");
	console.log("track", track);
	apiObj.populateTrackDetail(track);
	open(detail);
});


//open details from search result row
$("#results-items").on("click", ".detail", function () {
	console.log("Table row clicked");
	var track = $(this).data("track");
	console.log("track", track);
	apiObj.populateTrackDetail(track);
	open(detail);
});

$(detailClose).on("click", function () {
	console.log("Closing detail");
	close(detail);
	stopVideo(video);
});

////////////////////////////////////////////
// document ready

$(document).ready(function () {
	var userId = sessionStorage.getItem('userId');
	var username = sessionStorage.getItem('username');
	if (userId === null) {
		console.log("user is not logged in");
	} else {
		changeUserStatus(username);
		var newStatus = $(openAccess).attr("data-status");
		console.log("User status is " + newStatus + ".");
		open(profile);
		var currentTracks = [];
		database.ref('users').child(userId).once('value').then(function (snapshot) {
			var sv = snapshot.val();
			for (var key in sv.tracks) {
				//writeFavorites(sv.tracks[key]);
				apiObj.songSearch(sv.tracks[key]);


				console.log("track key: " + sv.tracks[key]);

			}
		});
	}
});

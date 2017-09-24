// UI javascript for showing and hiding log in favorites, and search

// open and  signup/login forms

var openAccess = $("#open-user-forms");
var closeAccess = $("#close-user-forms");
var profile = $("#profile");
var userForms = $("#user-forms");
var results = $("#results-container");
var searchOpen = $("#searchButton");
var searchClose = $("#close-search-container");

// general functions
// for modals, default style has them "display: none". 
//But, with click event class "js-active" is added or removed. 
//See "behavior" section of css file
function open(elem) {
	$(elem).addClass("js-active");
}

function close(elem) {
	$(elem).removeClass("js-active");
}

function changeUserStatus() {
	var userStatus = $(openAccess).attr("data-status");
	$(openAccess).attr("data-status", "logged");
	$(openAccess).attr("value", "view your favorites");
}


// When person clicks button at top right of page ...
$(openAccess).on("click", function(){
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
	}	
});

// closes signup/login box
$(closeAccess).on("click", function(){
		console.log("closing log in screen");
		close(userForms);		
	
});

// when person presses log in, the data-status value attached to top right button changes to "logged"
// and value changes to "view favorites"
// This would need to be combined with the other funtions that are tied to #login on app.js

$("#login").on("click", function(event){
	event.preventDefault();	
	changeUserStatus();
	var newStatus = $(openAccess).attr("data-status");
	console.log("Log in was clicked. User status is now " + newStatus +".");

	
});

// Opens search
//Would need to be combined with other functions that are tied to #searchButton on app.js

$(searchOpen).on("click", function(event){
	event.preventDefault();
	open(results);
});


// closes search field
$(searchClose).on("click", function(event){
	event.preventDefault();
	close(results);
});

	

	


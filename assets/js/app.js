var openAccess = $("#open-user-forms");
var closeAccess = $("#close-user-forms");
var profile = $("#profile");
var userForms = $("#user-forms");
var results = $("#results-container");
var searchOpen = $("#searchButton");
var searchClose = $("#close-search-container");
var detail = $("#detail-container");
var detailClose = $("#close-detail-container");

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
    database.ref("users").orderByChild('username').equalTo(u).on("child_added", function(snapshot){
        var sv = snapshot.val();
        var userId = snapshot.key;       
        sessionStorage.setItem('userId', userId);
        changeUserStatus();
        var newStatus = $(openAccess).attr("data-status");
        console.log("Log in was clicked. User status is now " + newStatus +"."); 
        cb(sv);
    });
}

function changeUserStatus() {
    var userStatus = $(openAccess).attr("data-status");
    $(openAccess).attr("data-status", "logged");
    $(openAccess).attr("value", "view your favorites");
}

//sign in to application
$("#login").on("click", function(){
    event.preventDefault();
    loginuser = $("#un").val().trim();
    console.log("you entered loginuser name: " + loginuser);
    if(loginuser === ""){
        console.log("Enter a username to continue");
    }else{
        getCurrentUser(loginuser, function(sv) {
            for(var key in sv.tracks) {
               writeFavorites(sv.tracks[key]);
                console.log(sv.tracks[key]);
            }            
        });
    }
});

$("#signup").on("click", function(){
  event.preventDefault();
    name = $("#name").val().trim();
    username = $("#new-un").val().trim();
    // database.ref("users/" +username).set({
    database.ref("users").push({        
        name: name,
        username: username,
        added: firebase.database.ServerValue.TIMESTAMP
    })

    getCurrentUser(username, function(sv) {
        // console.log("i am in the callback function");
    });
});

//---save favorites 
$('#fav-save').click(function() {
    var userId = sessionStorage.getItem('userId');
    if(userId === null){
        //alert("You need to log in to save a track");
        $("#loginerror").append("<p>You need to log in to save favorites</p>");
        console.log("you need to login");
    }else{
        var currentTracks = [];
        database.ref('users').child(userId).once('value').then(function(snapshot) {
            var user = snapshot.val();
            if(user.tracks){
                currentTracks = Object.values(user.tracks)
            }
            // console.log(snapshot.val());
            //getting object into an array
            // console.log("current tracks: " + currentTracks);            
            $("input:checkbox:checked", "#results-items").each(function() {
                var track = $(this).data("for");
                // console.log("checked track: "  + track);
                if(currentTracks.indexOf(track) === -1){
                    database.ref("users/"+ userId +"/tracks").push(track);
                    currentTracks.push(track);
                    writeFavorites(track);
                }
            });
        });
    }
});
//add favorites to table
function writeFavorites(tracks){
    $("#my-favs")
    .append("<tr><td>"+tracks+"</td><td>Track Name</td><td>Artist</td><td>Album</td><td>Year</td></tr>");
}

//code to write search results to the table, will be a function 
$("#searchButton").click(function(){
    $("#results-items").empty();
    var searchString = $("#search").val().trim();
    console.log("my search " + searchString);
    apiObj.keywordSearch(searchString);
    
});

function open(elem) {
    $(elem).addClass("js-active");
}

function close(elem) {
    $(elem).removeClass("js-active");
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

// open details from search result row
$("#results-items").on("click", "tr", function(){
     console.log("Table row clicked"); 
     var track = $(this).data("track");
     console.log("track", track);
     apiObj.populateTrackDetail(track);  
     open(detail);   
});

$(detailClose).on("click", function(){
    console.log("Closing detail");
    close(detail);  
});


$(document).ready(function(){
    var userId = sessionStorage.getItem('userId');
    if(userId === null){
        console.log("user is not logged in");
    }else{
        changeUserStatus();
        var newStatus = $(openAccess).attr("data-status");
        console.log("User status is " + newStatus +".");
        var currentTracks = [];
        database.ref('users').child(userId).once('value').then(function(snapshot) {
            var sv = snapshot.val();
            for(var key in sv.tracks) {
               writeFavorites(sv.tracks[key]);
               console.log(sv.tracks[key]);
            }        
        });
    }
});
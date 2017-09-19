// JavaScript Document

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

var name = "";
var username = "";
var password = "";

$("#execute-request-button").on("click", function(){
  event.preventDefault();

name = $("#name").val().trim();
username = $("#new-un").val().trim();
password = $("#new-pwd").val().trim();

database.ref().push({
name: name,
username: username,
password: password,
added: firebase.database.ServerValue.TIMESTAMP
})

});

database.ref().on("child_added", function(snapshot){
	var sv = snapshot.val();

	console.log(sv);
	console.log(snapshot.key);
	console.log(sv.name);
	console.log(sv.username);
	console.log(sv.password);
});
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

<<<<<<< HEAD
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var username = "";
var password = "";

name = "maria";
username = "mra";
password = "pass";

database.ref().push({
name: name,
username: username,
password: password,
added: firebase.database.ServerValue.TIMESTAMP
})
=======
//firebase.initializeApp(config);
//
//var database = firebase.database();
//
//var name = "";
//var username = "";
//var password = "";
//
//name = "maria";
//username = "mra";
//password = "pass";
//
//database.ref().push({
//name: name,
//username: username,
//password: password,
//firstAdded: firebase.database.ServerValue.TIMESTAMP
//})
>>>>>>> 0696b3c645fa4e75f01b0e37d0434e3bde85b420

database.ref().on("child_added", function(snapshot){
	var sv = snapshot.val();

	console.log(sv);
	console.log(snapshot.key);
	console.log(sv.name);
	console.log(sv.username);
	console.log(sv.password);
});
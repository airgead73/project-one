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

name = "maria";
username = "mra";
password = "pass";

database.ref().push({
name: name,
username: username,
password: password,
firstAdded: firebase.database.ServerValue.TIMESTAMP
})


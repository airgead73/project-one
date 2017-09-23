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

//get logged in user
function getCurrentUser(u, cb) {
    //gets the logged in user and returns tracks
    database.ref("users").orderByChild('username').equalTo(u).on("child_added", function(snapshot){
        var userId = snapshot.key;
        sessionStorage.setItem('userId', userId);

        var sv = snapshot.val();
        cb(sv);           
    });
}
//sign in to application
$("#login").on("click", function(){
    event.preventDefault();
    loginuser = $("#un").val().trim();    

    getCurrentUser(loginuser, function(sv) {
        for(var key in sv.tracks) {
           updateFavorites(sv.tracks[key]);
            console.log(sv.tracks[key]);
        }            
    });

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
        console.log("i am in the callback function");
    });
});

//---save favorites 
$('#fav-save').click(function() {
    var userId = sessionStorage.getItem('userId');
    if(userId === null){
        alert("You need to log in to save a track");
    }else{
        var currentTracks = [];
        database.ref('users').child(userId).once('value').then(function(snapshot) {
            var user = snapshot.val();
            if(user.tracks){
                currentTracks = Object.values(user.tracks)
            }
            console.log(snapshot.val());
            //getting object into an array
            console.log(currentTracks);            
            $("input:checkbox:checked", "#results").each(function() {
                var track = $(this).data("for");
                console.log(track);
                if(currentTracks.indexOf(track) === -1){
                    database.ref("users/"+ userId +"/tracks").push(track);
                    currentTracks.push(track);
                    updateFavorites(track);
                }
            });
        });
    }
});
//add favorites to table
function updateFavorites(tracks){
    $("#my-favs")
    .append("<tr><td>"+tracks+"</td><td>Track Name</td><td>Artist</td><td>Album</td><td>Year</td></tr>");
}
$(document).ready(function(){
  $(function() {
    $("form").submit(function() { return false; }); // prevents page from reload on "enter press"
});
  var q ;
  var buildUrl = "https://www.googleapis.com/youtube/v3/search" + q
//establish variables to build AJAX call

$("#searchButton").on("click", function(){
    q = $("#search").val()
  console.log(q)
  $("#vidTitle").html(q)
 
// user input that stores the search variable

  q = $("#search").val()
  $("#vidTitle").html(q)

  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+ q +'&regionCode=us&type=video&videoCategoryId=10&videoDefinition=any&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyCsoCs7rQgLp_KQrlZP8oe6UHvo6taoHbY'
  })
    .done(function(response){
      
     var results = response.items;
     var youtubeSearch = 'https://www.youtube.com/embed/' + results[0].id.videoId;
     
     $("#vidHere").attr("src", youtubeSearch)
    });
    
  });

});
/* FinalProject.js - contains any api calls that are needed to run the page
 * Nick Currie
 */
 
 //Runs the add_song.php file to add a song to the table
function addFavoriteSong()
 {
	console.log("got here");
	$.get('add_song.php', function(data) {
       eval(data);
    });
 }
 
 //This function is an attempt to get rid of the previous video from showing when you go back a page.
 window.onload = function() 
 {
    document.getElementById('player').height=0;
	document.getElementById('player').width=0;
	document.getElementById('player').src = "about:blank";
	document.getElementById('lyrics').innerHTML = "";
	document.getElementById('lyrics').style = "";
	
 };
//Gets the first video related to the song and artist that was input
 function getVideo()
 {
	 document.getElementById('player').src = "about:blank";
	 //Gets the song and artist that the user searched for
	 song = document.getElementById('song').value;
	 artist = document.getElementById('artist').value;
	 search = song + " by " + artist;
	 
	//Begins the youtube query to find the first result for a video related to this song
    //Only gets the first video result
	 q = $('#query').val();
	 $.get(
		"https://www.googleapis.com/youtube/v3/search",
		{
			part:'snippet, id',
			q: search,
			maxResults: 1,
			type: 'video',
		key: 'AIzaSyAY4D5codfuGHy9YecsBD0t7nlN2HxwgW8'},
		function(data)
		{	
		//logs the results the api call returns
			console.log(data);
			$.each(data.items, function(i,item)
			{
				//stores the video id from the one item in the array in variable
				video = item.id.videoId;
			})
			//sets the link of the iframe in the html to have the videoId of the video the api call returned
			document.getElementById('player').src = "https://www.youtube.com/embed/" + video;
			document.getElementById('player').height=390 ;
			document.getElementById('player').width=640 ;
			getTrackID();
		}
	 );
 }
 
 //in order to get the lyrics to a song you must first find the track id associated with it
 function getTrackID()
 {
	 //Gets the song and artist that the user searched for
	 song = document.getElementById('song').value;
	 artist = document.getElementById('artist').value;
	 
	 //the api request to get the track id
	 const Http = new XMLHttpRequest();
	 const url = "https://api.musixmatch.com/ws/1.1/matcher.track.get?format=jsonp&callback=callback&q_artist=" + artist + "&q_track=" + song +"&apikey=ef1982dc89d67c419079f275b5adbc7c"
	 Http.open("GET", url);
	 Http.send();
	 
	 Http.onreadystatechange=function(){
		 if(this.readyState==4 && this.status==200)
		 {
			 var response = Http.responseText;
			 var trackId = response.substring(response.indexOf("track_id")+10, response.indexOf("track_name")-2);
			 getLyrics(trackId);
			 
		 }
	 }
	 
 }
 
 //now that we have the track id we can then make the api call to get the lytics for the song
 function getLyrics(trackId)
 {
	 console.log(trackId);
	 //prepares the api call to get the song lyrics
	 const Http = new XMLHttpRequest();
	 const url = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + trackId + "&apikey=ef1982dc89d67c419079f275b5adbc7c";
	 Http.open("GET", url);
	 Http.send();
	 
	 Http.onreadystatechange=function(){
		 if(this.readyState==4 && this.status==200)
		 {
			 var response = Http.response;
			 console.log(response);
			 //checks to make sure the musixmatch has the lyrics to display otherwise it gives an error message
			 if(response.includes("Lyrics powered by www.musixmatch.com"))
			 {
				var lyrics = response.substring(response.indexOf("lyrics_body")+14, response.indexOf("This Lyrics is NOT for Commercial use")-2);
				//replaces \n with <br> so it will actually move to the next line when it is supposed to.
				lyrics = lyrics.replace(/\\n/g, "<br>");
				console.log(lyrics);
				outbox = document.getElementById('lyrics');
				outbox.innerHTML = "Lyrics:<br>" + lyrics;
			 }
			//if musixmatch doesnt have the lyrics it show this error message
			 else
			 {
				outbox = document.getElementById('lyrics');
				outbox.innerHTML = "Unable to get lyrics";
				document.getElementById("table").style= "border:2px solid black";
			 }

		 }
	 }
 }

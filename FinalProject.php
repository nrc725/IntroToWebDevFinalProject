<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <title>Final Project </title>
    <meta charset="utf-8"/>
    <script src="FinalProject.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="FinalProject.css" />
	<link rel="stylesheet" type="text/css" href="FinalProject2.css" />


</head>
  <body>
    
    <div id="top">Search for your favorite songs and add them to your favorites list!</div>
	
    <iframe id="player" width="640" height="390" src="about:blank"></iframe>
    
    <form name="add_song" action="add_song.php">
      <table id="add_song">
        <tr>
          <td>Song:</td>
          <td><input type="text" name="song" id="song"/></td>
          <td>Artist:</td>
          <td><input type="text" name="artist" id="artist"/></td>
          <td><input type ="button" value="Search" onclick="getVideo();"></td>
          <td><input type="submit" value="Add Favorite Song"></td>	
      </tr>
     </table>
    </form>	


	<span id="lyrics"></span>
	
	
<?php

# list_songs.php - list all the cores
   
require_once('Connect.php');
require_once('debughelp.php');
 
$dbh = ConnectDB();
 
try {
	$query = 'select * from songs';
	$stmt = $dbh->prepare($query);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_OBJ);
    $stmt = null;
}
catch(PDOException $e)
{
    die ('PDO error listing people": ' . $e->getMessage() );
}


echo "<pre id='fav_songs'>Your Favorite Songs: \n";
foreach ($result as $song_info) 
{
	echo "ID: ", $song_info->song_id .
		"\tSong: ", $song_info->song_name .
		"\tArtist: ", $song_info->artist_name , "\n";
}
echo "</pre>\n";

?>
	

  <footer id = "bottombar" style="border-top: 1px solid midnightblue">
    <a href="http://elvis.rowan.edu/~currien5/" 
       title="Link to my home page">
      N. Currie
    </a>

    <span style="float: right;">
      <a href="http://validator.w3.org/check/referer">HTML5</a> /
      <a href="http://jigsaw.w3.org/css-validator/check/referer?profile=css3">
        CSS3 </a>
    </span>
  </footer>
  
  </body>
</html>
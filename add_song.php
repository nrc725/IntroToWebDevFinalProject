<?php
# add_song.php - add the core from the form to the table

require_once('debughelp.php');
require_once('Connect.php');

$dbh = ConnectDB();

if ( empty($_REQUEST['artist']) || empty($_REQUEST['song'])) {
	die('not enough info to add song');
}

if ( strlen($_REQUEST['artist']) < 2 ) {
	die ('artist name too short');
}

try {
	{
		$query = "insert into songs " .
		         "set song_name=:song, artist_name=:artist";
		$stmt = $dbh->prepare($query);
		
		$stmt->bindValue(':song', $_REQUEST['song']);
		$stmt->bindValue(':artist', $_REQUEST['artist']);
        $stmt->execute();
        $stmt = null;
	}
}
catch(PDOException $e)
{
    die ('PDO error adding song": ' . $e->getMessage() );
}

header("Location: ./FinalProject.php");

?>


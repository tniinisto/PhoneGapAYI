<?php
include 'config.php';

$sql =	"SELECT p.playerID, p.name, p.photourl
    	FROM areyouin.players p";
		
	
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	

	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	$players = $stmt->fetchAll(PDO::FETCH_OBJ);

	$dbh = null;

	echo '{"items":'. json_encode($players) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>
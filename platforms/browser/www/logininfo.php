<?php
	
	//include( $_SERVER['DOCUMENT_ROOT'] . '/config/config.php' );
	include('config.php');

    session_start();

    if($_SESSION['ChromeLog']) {
        require_once 'ChromePhp.php';
        ChromePhp::log('logininfo.php, start');
    }
        
	//$pl=$_GET["p"];
	//$te=$_GET["t"];
    
    $pl=$_SESSION['myplayerid'];
	$te=$_SESSION['myteamid'];
    //$ad=$_SESSION['myAdmin'];
    

	//$con = mysql_connect('eu-cdbr-azure-north-a.cloudapp.net', 'bd3d44ed2e1c4a', '8ffac735');
	$con = mysql_connect($dbhost, $dbuser, $dbpass);
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }

	mysql_select_db($dbname, $con);

	//$sql="SELECT p.name, t.teamName FROM players p, team t where p.playerID = " . $pl . " and t.teamID = " . $te;
	$sql="SELECT p.name, p.photourl, t.teamName, r.teamAdmin FROM players p, team t, playerteam r where p.playerID = " . $pl . " and t.teamID = " . $te . " and r.Players_playerID = " . $pl;

	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
  
    //echo $sql;
	//echo "<font color=\"#ccc\">Welcome: </font>" . $row[name] . " <font color=\"#ccc\">Team: </font>" . $row[teamName] . "<font color=\"#0d1424\">#" . $row[teamAdmin] . "</font><a href='http://localhost:18502/' onclick=\"logout.php\">logout</a>";
	//echo "<font color=\"#ccc\">Welcome: </font>" . $row[name] . " <font color=\"#ccc\">Team: </font>" . $row[teamName] . " <a href='http://localhost:18502/' onclick=\"logout.php\"><span  style=\"color:red\">logout</span></a>";
    //echo "<span style=\"color:#ccc\">Welcome: </span>" . $row['name'] . "<span style=\"color:#ccc\"> Team: </span>" . $row['teamName'] . "</p>";
    echo "". $row['name'] . " in team " . $row['teamName'] ."";
    		
	mysql_close($con);
	
?>

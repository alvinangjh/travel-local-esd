<?php 

include_once '../includes/autoload.php';

// $decoded = array();

// //Decode the JSON string and convert it into a PHP associative array.
// $decoded = $_POST["custom_loc"];

// echo "<script>console.log('Debug Objectbbaasssss: " . $decoded["locTitle"] . "' );</script>";
$new_location = new Location("", $_POST["locTitle"], $_POST["locAddress"], $_POST["locPostalCode"], $_POST["locDesc"], $_POST["categories"],  $_POST["rating"], $_POST["imageUrl"], "", $_POST["latitude"], $_POST["longitude"], $_POST["venueType"], $_POST["businessContact"], $_POST["businessEmail"], $_POST["startTime"], $_POST["endTime"], $_POST["businessWeb"]);
// echo "<script>console.log('Debug Objects: " .  $decoded["latitude"] . "' );</script>";
// (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)

//$new_user = new User("", $decoded->getFirstName(), )
$location = new LocationDAO();
$status = $location->add($new_location);

echo $status;

?>
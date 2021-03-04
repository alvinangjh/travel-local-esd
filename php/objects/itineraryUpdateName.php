<?php 

include_once '../includes/autoload.php';

$itineraryID = $_POST["itinerary_id"];
$name = $_POST["name"];

$itinerary = new itineraryDAO();

$status = $itinerary->updateItineraryName($itineraryID, $name);

echo $status;

?>
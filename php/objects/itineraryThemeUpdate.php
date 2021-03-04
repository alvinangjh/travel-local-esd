<?php 

include_once '../includes/autoload.php';

$itineraryID = $_POST["itinerary_id"];
$itineraryTheme = $_POST["itinerary_theme"];

$itinerary = new itineraryDAO();

$status = $itinerary->updateType($itineraryID, $itineraryTheme);

return $status;

?>
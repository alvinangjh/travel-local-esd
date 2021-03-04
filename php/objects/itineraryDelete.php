<?php 

include_once '../includes/autoload.php';

$itinerary = file_get_contents('php://input');

$itinerary_decoded = array();

$itinerary_decoded = json_decode($itinerary, true);

$itinerary = new itineraryDAO();

$status = $itinerary->deleteItinerary($itinerary_decoded["itineraryID"]);

return $status;

?>
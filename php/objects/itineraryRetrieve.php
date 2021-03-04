<?php 

include_once '../includes/autoload.php';

$itinerary_ID = $_POST["itinerary_id"];

$itinerary = new itineraryDAO();

$retrieved_itinerary = $itinerary->retrieveByItineraryID($itinerary_ID);

echo json_encode($retrieved_itinerary);

?>
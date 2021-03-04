<?php 

include_once '../includes/autoload.php';

$itinerary = file_get_contents('php://input');

$itinerary_decoded = array();

$itinerary_decoded = json_decode($itinerary, true);

$startDate = str_replace('/', '-', $itinerary_decoded["startDate"]);
$endDate = str_replace('/', '-', $itinerary_decoded["endDate"]);

$itinerary = new itineraryDAO();

$status = $itinerary->updateItinerary($itinerary_decoded["itineraryID"], $itinerary_decoded["name"], 
date('Y-m-d', strtotime($startDate)), date('Y-m-d', strtotime($endDate)));

return $status;

?>
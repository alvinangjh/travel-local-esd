<?php 

include_once '../includes/autoload.php';

$itinerary = file_get_contents('php://input');

$itinerary_decoded = array();

$itinerary_decoded = json_decode($itinerary, true);

$startDate = str_replace('/', '-', $itinerary_decoded["startDate"]);
$endDate = str_replace('/', '-', $itinerary_decoded["endDate"]);

$new_itinerary = new Itinerary($itinerary_decoded["itineraryID"], $itinerary_decoded["name"], date('Y-m-d', strtotime($startDate)), 
date('Y-m-d', strtotime($endDate)), $itinerary_decoded["userID"]);

$itinerary = new itineraryDAO();

$status = $itinerary->add($new_itinerary);

return $status;

?>
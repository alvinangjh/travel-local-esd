<?php 

include_once '../includes/autoload.php';

$itinerary_ID = $_POST["itinerary_id"];

$activity = new activityDAO();

$retrieved_activity = $activity->retrieveByItineraryID($itinerary_ID);

echo json_encode($retrieved_activity);

?>
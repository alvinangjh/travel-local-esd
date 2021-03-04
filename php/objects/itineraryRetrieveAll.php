<?php 

include_once '../includes/autoload.php';

$userID = $_POST["userID"];


$itinerary = new itineraryDAO();

$retrieved_itinerary = $itinerary->retrieveByUserID($userID);

echo json_encode($retrieved_itinerary);

?>
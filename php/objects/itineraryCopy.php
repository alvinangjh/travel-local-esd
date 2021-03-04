
<?php

include_once '../includes/autoload.php';


$id = $_POST["itinerary_id"];
$userID = $_POST["userID"];

$itinerary = new itineraryDAO();

$result = $itinerary->copyItinerary($id, $userID);

echo $result;

?>

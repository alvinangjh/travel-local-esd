
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();

$data = file_get_contents("php://input");
$new = array();
$new = json_decode($data,true);

$itineraryID = $new['itineraryID'];

$result = json_encode($dao->delete_itinerary($itineraryID));


echo $result;

?>

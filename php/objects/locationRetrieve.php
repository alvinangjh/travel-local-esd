<?php 

include_once '../includes/autoload.php';

$locID = $_POST["location_id"];

$location = new locationDAO();

$retrieved_location = $location->retrieveByLocationID($locID);

echo json_encode($retrieved_location);

?>
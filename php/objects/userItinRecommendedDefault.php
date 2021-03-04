
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();

$userID = $_POST['userID'];
$jsonData = json_encode($dao->getRecommendedDefault($userID));

echo $jsonData;

?>

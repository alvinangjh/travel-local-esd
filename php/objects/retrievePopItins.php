
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();

$jsonData = json_encode($dao->getPopItins());

echo $jsonData;

?>

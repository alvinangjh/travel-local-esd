
<?php
#MY API KEY = 2DeahNNW3hdNmHNNpsUFv0BH7mQeZm63
require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();


$jsonData = json_encode($dao->getItineraries());
// echo "<script>console.log('Debug Objects: " . $jsonData . "' );</script>";
echo json_encode($dao->getItineraries());;
?>


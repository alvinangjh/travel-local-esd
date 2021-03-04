
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();

// header('Content-Type: application/json');
$userID = $_POST['userID'];
$jsonData = json_encode($dao->getItineraries($userID));
// // echo "<script>alert('Debug Objects: " . $userID . "' );</script>";
// echo $userID;
echo $jsonData;

?>

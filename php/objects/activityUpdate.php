<?php 

include_once '../includes/autoload.php';

// $activity = file_get_contents('php://input');

// $activity_decoded = array();

// $activity_decoded = json_decode($activity, true);


// echo "<script>console.log('Debug Objects: " . $obj . "' );</script>";

$activity = new activityDAO();

$status = $activity->updateActivity($_POST["activityID"], $_POST["activityDate"], $_POST["startTime"], $_POST["endTime"]);

// $status = $activity->updateActivity($activity_decoded["activityID"], $activity_decoded["startTime"], $activity_decoded["endTime"]);


echo $status;

?>
<?php 

include_once '../includes/autoload.php';

$activity = file_get_contents('php://input');

$activity_decoded = array(); 

$activity_decoded = json_decode($activity, true);

$activityDate = str_replace('/', '-', $activity_decoded["activityDate"]);

$new_activity = new Activity($activity_decoded["activityID"], $activity_decoded["poiUUID"], $activity_decoded["startTime"], $activity_decoded["endTime"], date('Y-m-d', strtotime($activityDate)), $activity_decoded["locType"], $activity_decoded["locDataset"], $activity_decoded["itineraryID"] );

$activity = new activityDAO();

$status = $activity->add($new_activity);

echo $status;

?>
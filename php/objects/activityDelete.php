<?php 

include_once '../includes/autoload.php';

$activity_id = $_POST["activity_id"];

$activity = new activityDAO();

$status = $activity->deleteActivity($activity_id); 
// date('Y-m-d', strtotime($startDate)), date('Y-m-d', strtotime($endDate)));

echo $status;

?>
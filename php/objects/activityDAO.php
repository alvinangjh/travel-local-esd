<?php


include_once '../includes/autoload.php';

class ActivityDAO {

    public function retrieveByItineraryID($itineraryID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM activity WHERE itineraryID = :itineraryID";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        $activities = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {
            $activity = new Activity(
                $row["activityID"],
                $row["poiUUID"],
                $row["startTime"],
                $row["endTime"],
                $row["activityDate"],
                $row["locType"],
                $row["locDataset"],
                $row["itineraryID"]
            );
            $activities[] = $activity;
        }


        $stmt = null;
        $conn = null;

        return $activities;
    }

    public function updateActivity($activityID, $activityDate, $startTime, $endTime) {
        // STEP 1
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        // STEP 2
        $sql = "UPDATE activity SET activityDate = :activityDate, startTime = :startTime, endTime = :endTime WHERE activityID = :activityID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':activityID', $activityID, PDO::PARAM_INT);
        $stmt->bindParam(':activityDate', $activityDate, PDO::PARAM_STR);
        $stmt->bindParam(':startTime', $startTime, PDO::PARAM_STR);
        $stmt->bindParam(':endTime', $endTime, PDO::PARAM_STR);
        

        // STEP 3
        if( $stmt->execute() ) {
            // STEP 4
            $stmt = null;
            $conn = null;
            return true;
        }

        // STEP 4
        return false;
    }

    public function deleteActivity($activityID){
        $conn = new Connection();
        $pdo = $conn->getConnection();

        $sql = "DELETE from activity where activityID = :activityID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':activityID', $activityID, PDO::PARAM_INT);

        $isOK = $stmt->execute();
        $stmt=null;
        $pdo = null;

        return $isOK;
    }

    public function add($activity) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO activity (activityID, poiUUID, startTime, endTime, activityDate, locType, locDataset, itineraryID)
                VALUES (null, :poiUUID, :startTime, :endTime, :activityDate, :locType, :locDataset, :itineraryID)';
        $stmt = $pdo->prepare($sql); 

        //$activityID = $activity->getActivityID();
        $poiUUID = $activity->getPOIUUID();
        $startTime = $activity->getStartTime();
        $endTime = $activity->getEndTime();
        $activityDate = $activity->getActivityDate();
        $locType = $activity->getLocType();
        $locDataset = $activity->getLocDataset();
        $itineraryID = $activity->getItineraryID();


        //$stmt->bindParam(':activityID', $itineraryID, PDO::PARAM_INT);
        $stmt->bindParam(':poiUUID', $poiUUID, PDO::PARAM_STR);
        $stmt->bindParam(':startTime', $startTime, PDO::PARAM_STR);
        $stmt->bindParam(':endTime', $endTime, PDO::PARAM_STR);
        $stmt->bindParam(':activityDate', $activityDate, PDO::PARAM_STR);
        $stmt->bindParam(':locType', $locType, PDO::PARAM_STR);
        $stmt->bindParam(':locDataset', $locDataset, PDO::PARAM_STR);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }
}
?>
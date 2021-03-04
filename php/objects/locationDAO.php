<?php

include_once '../includes/autoload.php';

class LocationDAO {
    
    //locID	locTitle	locAddress	locPostalCode	locDesc	recDuration	rating	imageUrl	createdBy
    public function add($location) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO custom_loc (locID, locTitle, locAddress, locPostalCode, locDesc, categories, rating, imageUrl, createdBy, latitude, longitude, venueType, businessContact, businessEmail, startTime, endTime, businessWeb)
        VALUES (:locID, :locTitle, :locAddress, :locPostalCode, :locDesc, :categories, :rating, :imageUrl, :createdBy, :latitude, :longitude, :venueType, :businessContact, :businessEmail, :startTime, :endTime, :businessWeb)';
        $stmt = $pdo->prepare($sql); 

        $locID = $location->getLocID(); 
        $locTitle = $location->getLocTitle(); 
        $locAddress = $location->getLocAddress(); 
        $locPostalCode = $location->getLocPostalCode(); 
        $locDesc = $location->getLocDesc(); 
        $categories = $location->getCategories(); 
        $rating = $location->getRating(); 
        $imageUrl = $location->getImageUrl(); 
        $createdBy = $location->getCreatedBy(); 
        $latitude = $location->getLatitude(); 
        $longitude = $location->getLongitude(); 
        $venueType = $location->getVenueType(); 
        $businessContact = $location->getBusinessContact(); 
        $businessEmail = $location->getBusinessEmail(); 
        $startTime = $location->getStartTime(); 
        $endTime = $location->getEndTime(); 
        $businessWeb = $location->getBusinessWeb(); 

        $stmt->bindParam(':locID', $locID, PDO::PARAM_INT);
        $stmt->bindParam(':locTitle', $locTitle, PDO::PARAM_STR);
        $stmt->bindParam(':locAddress', $locAddress, PDO::PARAM_STR);
        $stmt->bindParam(':locPostalCode', $locPostalCode, PDO::PARAM_INT);
        $stmt->bindParam(':locDesc', $locDesc, PDO::PARAM_STR);
        $stmt->bindParam(':categories', $categories, PDO::PARAM_STR);
        $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
        $stmt->bindParam(':imageUrl', $imageUrl, PDO::PARAM_STR);
        $stmt->bindParam(':createdBy', $createdBy, PDO::PARAM_INT);
        $stmt->bindParam(':latitude', $latitude, PDO::PARAM_STR);
        $stmt->bindParam(':longitude', $longitude, PDO::PARAM_STR);
        $stmt->bindParam(':venueType', $venueType, PDO::PARAM_STR);
        $stmt->bindParam(':businessContact', $businessContact, PDO::PARAM_INT);
        $stmt->bindParam(':businessEmail', $businessEmail, PDO::PARAM_STR);
        $stmt->bindParam(':startTime', $startTime, PDO::PARAM_STR);
        $stmt->bindParam(':endTime', $endTime, PDO::PARAM_STR);
        $stmt->bindParam(':businessWeb', $businessWeb, PDO::PARAM_STR);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }

    public function retrieveByLocationID($locID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM custom_loc WHERE locID = :locID";
        
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':locID', $locID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        $locations = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {
            $location = new Location(
                $row["locID"],
                $row["locTitle"],
                $row["locAddress"],
                $row["locPostalCode"],
                $row["locDesc"],
                $row["categories"],
                $row["rating"],
                $row["imageUrl"],
                $row["createdBy"],
                $row["latitude"],
                $row["longitude"],
                $row["venueType"],
                $row["businessContact"],
                $row["businessEmail"],
                $row["startTime"],
                $row["endTime"],
                $row["businessWeb"]
            );

            $locations[] = $location;
        }


        $stmt = null;
        $conn = null;

        return $locations;
    }
}

?>
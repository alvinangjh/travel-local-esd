<?php

include_once '../includes/autoload.php';



$connMgr = new Connection();
$conn = $connMgr->getConnection();
$locID = $_GET['locID'];

$sql = "SELECT * FROM custom_loc WHERE locID = :locID" ;



$stmt = $conn->prepare($sql);
$stmt->bindParam(':locID', $locID, PDO::PARAM_INT);
$status = $stmt->execute();

$custom_locations = [];
$stmt->setFetchMode(PDO::FETCH_ASSOC);
while( $row = $stmt->fetch() ) {
    $custom_loc = [
        'locID' => $row["locID"],
        'locTitle' => $row["locTitle"],
        'locAddress' => $row["locAddress"],
        'locPostalCode' => $row["locPostalCode"],
        'locDesc' => $row["locDesc"],
        'categories' => $row["categories"],
        'rating' => $row["rating"],
        'imageUrl' => $row["imageUrl"],
        'createdBy' => $row["createdBy"],
        'latitude' => $row["latitude"],
        'longitude' => $row["longitude"],
        'venueType' => $row["venueType"],
        'businessContact' => $row["businessContact"],
        'businessEmail' => $row["businessEmail"],
        'startTime' => $row["startTime"],
        'endTime' => $row["endTime"],
        'businessWeb' => $row["businessWeb"]
    ];
    $custom_locations[] = $custom_loc;
}

$stmt = null;
$conn = null;

// echo json_encode($custom_locations);


echo json_encode($custom_locations[0]);

       
    
// echo json_encode($hello);

    // $result = $conn->query($sql);
    // echo json_encode($result);
?>
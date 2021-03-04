<?php

include_once '../includes/autoload.php';



if($_GET['categories'] == [""]){
    $categories = [];
}
else{
    $categories = $_GET['categories'];
}

if($_GET['title'] == 'empty'){
    $title = "";
}
else{
    $title = $_GET['title'];
}

$connMgr = new Connection();
$conn = $connMgr->getConnection();

if($categories == []){
    $sql = "SELECT * FROM custom_loc WHERE locTitle LIKE CONCAT('%', :title, '%')" ;
}
else{
    $sql = "SELECT * FROM custom_loc WHERE locTitle LIKE CONCAT('%', :title, '%') AND categories IN ('".implode("','",$categories)."')" ;
}

$stmt = $conn->prepare($sql);
$stmt->bindParam(':title', $title, PDO::PARAM_STR);
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



echo json_encode($custom_locations);

       
    
// echo json_encode($hello);

    // $result = $conn->query($sql);
    // echo json_encode($result);
?>
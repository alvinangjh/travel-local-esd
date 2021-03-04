<?php

include_once '../includes/autoload.php';

class itineraryDAO {
    
    // This public function is callable from OUTSIDE 'ItineraryDAO' class
    // By calling this function, the caller can retrieve ALL rows from 'Itinerary' Database table
    // It returns an Indexed Array of Itinerary objects
    public function getItineraries($userID) {
        
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection(); // PDO object
        
        $sql = "SELECT
                    *
                FROM
                    itinerary
                WHERE
                    userID = :userID";
                    
        $stmt = $pdo->prepare($sql); // SQLStatement object
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute(); // RUN SQL
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $itineraries = [];
        while ( $row = $stmt->fetch() ) {
            $itinerary = new itinerary( 
                        $row['itineraryID'], 
                        $row['name'], 
                        $row['startDate'], 
                        $row['endDate'], 
                        $row['itineraryType'],
                        $row['userID'],
                        $row['shared'] 
                    ); // new itinerary object
            $itineraries[] = $itinerary; // add itinerary object to ret array
        }
        // $itineraryID; $name; $startDate; $endDate; $userID;

        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        return $itineraries;
    }

    public function retrieveByItineraryID($itineraryID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM itinerary WHERE itineraryID = :itineraryID";
        $stmt = $conn->prepare($sql);
        
        // echo "<script>console.log('Debug Objects: " . $itineraryID . "' );</script>";

        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        // $activity = [];
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // while( $row = $stmt->fetch() ) {
        //     $activity[] = ["activityID" => $row["activityID"], 
        //         "poiUUID" => $row["poiUUID"],
        //         "itineraryID" => $row["itineraryID"]];
        // }

        $itineraries = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {

            $timestamp = strtotime($row["startDate"]);
            $startDate = date('d M Y', $timestamp);

            $timestamp = strtotime($row["endDate"]);
            $endDate = date('d M Y', $timestamp);

            $itinerary = new Itinerary(
                $row["itineraryID"],
                $row["name"],
                $startDate,
                $endDate,
                $row["itineraryType"],
                $row["userID"],
                $row["shared"]
            );
            $itineraries[] = $itinerary;
        }
        
        $stmt = null;
        $conn = null;

        return $itineraries;
    }

    public function retrieveByUserID($userID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM itinerary WHERE userID = :userID";
        $stmt = $conn->prepare($sql);
        
        // echo "<script>console.log('Debug Objects: " . $itineraryID . "' );</script>";

        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        // $activity = [];
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // while( $row = $stmt->fetch() ) {
        //     $activity[] = ["activityID" => $row["activityID"], 
        //         "poiUUID" => $row["poiUUID"],
        //         "itineraryID" => $row["itineraryID"]];
        // }

        $itineraries = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {

            $timestamp = strtotime($row["startDate"]);
            $startDate = date('d M Y', $timestamp);

            $timestamp = strtotime($row["endDate"]);
            $endDate = date('d M Y', $timestamp);

            $itinerary = new Itinerary(
                $row["itineraryID"],
                $row["name"],
                $startDate,
                $endDate,
                $row["itineraryType"],
                $row["userID"],
                $row["shared"]
            );
            $itineraries[] = $itinerary;
        }
        
        $stmt = null;
        $conn = null;

        return $itineraries;
    }

    public function getPopItins() {
        
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection(); // PDO object
        
        $sql = "SELECT * FROM itinerary ORDER BY shared desc LIMIT 4
                ";
                    
        $stmt = $pdo->prepare($sql); // SQLStatement object
        $stmt->execute(); // RUN SQL
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $itineraries = [];
        while ( $row = $stmt->fetch() ) {
            $itinerary = new itinerary( 
                        $row['itineraryID'], 
                        $row['name'], 
                        $row['startDate'], 
                        $row['endDate'], 
                        $row['itineraryType'],
                        $row['userID'],
                        $row['shared'] 
                    ); // new itinerary object
            $itineraries[] = $itinerary; // add itinerary object to ret array
        }
        $stmt = null;
        $pdo = null; 
        
        return $itineraries;
    }

    public function add_itinerary( $name, $startDate, $endDate, $itineraryType, $userID) {        

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        // STEP 2 - Prepare SQL Query
        $sql = "
            INSERT INTO
                itinerary
            VALUES
                (null, :name, :startDate, :endDate, :itineraryType, :userID, 0)
        ";
        $stmt = $pdo->prepare($sql);
        // $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
        $stmt->bindParam(':itineraryType', $itineraryType, PDO::PARAM_STR);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        $isOk = $stmt->execute();
        
        $stmt = null;
        $pdo = null;        
        
        return $isOk; //result of insertion, True or False
    }
    
    public function delete_itinerary($itineraryID) {        

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        // STEP 2 - Prepare SQL Query
        $sql = "
            DELETE FROM
                itinerary
            WHERE
                itineraryID = :itineraryID
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
 

        $isOk = $stmt->execute();
        
        $stmt = null;
        $pdo = null;        
        
        return $isOk; //result of deletion, True or False
    }
   


    // Returns an Indexed Array of cats with a given 'gender' AND a given 'status'
    public function getCatsByGenderStatus($gender, $status) {

        // STEP 1
        $connMgr = new Connection();
        $pdo = $connMgr->connect(); // PDO object
        
        // STEP 2
        // Prepare SQL statement
        $sql = "SELECT *
                FROM
                    cat
                WHERE
                    gender = :gender
                    AND
                    status = :status ";       

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);


        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // Retrieve each row as an Associative Array
        

        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }

        
        // STEP 5
        $stmt = null;
        $pdo = null;        
        

        // STEP 6
        return $cats;
    }


    /**
     * @param string $status '-' for any status, 'A', or 'P'
     * @param string $gender 'A' for any gender, 'M', or 'F'
     * @param string $max_age '' means any age.  Otherwise, it will be an integer >= 0
     * @return array of Cat objects that match the filter criteria.
     */
    public function getCatsFilter($status, $gender, $max_age) {

        // STEP 1
        $connMgr = new Connection();
        $pdo = $connMgr->connect(); // PDO object

        // STEP 2
        $sql = "SELECT
                    name, age, gender, status 
                FROM
                    cat
                WHERE";
        
        $have_status = False;
        $have_gender = False;
        $have_max_age = False;

        if( $status == '-' ) {
            $sql .= " status IN ('A', 'P')";
        }
        else {
            $sql .= " status = :status";
            $have_status = True;
        } // Status
        
        if( $gender == 'M' || $gender == 'F' ) {
            $sql .= " AND gender = :gender";
            $have_gender = True;
        } // Gender

        if( $max_age != '' ) { 
            $sql .= " AND age <= :max_age";
            $have_max_age = True;
        } // Max Age

        $stmt = $pdo->prepare($sql);

        if( $have_status )
            $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        if( $have_gender )
            $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
        if( $have_max_age )
            $stmt->bindParam(':max_age', $max_age, PDO::PARAM_INT);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // Retrieve each row as an Associative Array
        
        // STEP 4
        $cats = [];
        while ($row = $stmt->fetch() ) {
            $cat = new Cat( 
                    $row['name'], 
                    $row['age'], 
                    $row['gender'], 
                    $row['status'] 
                );
            $cats[] = $cat;
        }
        
        // STEP 5
        $stmt = null;
        $pdo = null;        
        
        // STEP 6
        return $cats;
    }


    // Find a cat by $name
    // Return TRUE (if the cat is found) or FALSE (otherwise)
    public function isCatFound($name) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "SELECT 
                *
                FROM
                cat
                WHERE
                name = :name

        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // STEP 4 - Is this cat found in cat table?
        $isFound = False;
        if ($stmt->RowCount() == 1) {
            $isFound = True;
        }
        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        // STEP 6
        return $isFound;
    }

    

    // Find a cat by $name
    // If he/she is found in database,
    //    Return a new Cat object
    // Else
    //    Return NULL
    public function getCatByName($name) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->connect();
        
        $sql = "SELECT * FROM cat WHERE name = :name";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // STEP 4 - Is this cat found in cat table?
        $cat = null; // Null by default
            if ($row = $stmt->fetch() ) {
                $cat = new Cat( 
                        $row['name'], 
                        $row['age'], 
                        $row['gender'], 
                        $row['status'] 
                    );
            }
        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        // STEP 6
        return $cat;
    }


    // Adds a new cat
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function add($name, $age, $gender) {        
        // For new cats, default is 'A' (available)
        $status = 'A';

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            INSERT INTO
            cat
            VALUES
                (:name , :age, :gender, 'A')
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->bindParam(':gender', $gender, PDO::PARAM_STR);

        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk; //result of insertion, True or False
    }


    // Delete a cat
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function delete($name) {      

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            DELETE FROM
            cat
            WHERE
                name = :name
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk;
    }



    // Update cat's status
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function updateStatus($name, $status) {

        // STEP 1 - Connect to MySQL Database
        $connMgr = new Connection();
        $pdo = $connMgr->connect();
        // STEP 2 - Prepare SQL Query
        $sql = "
            UPDATE
            cat
            SET
            status = :status
            WHERE
                name = :name
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        // STEP 3 - Run Query
        $isOk = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $pdo = null;        
        
        // STEP 5
        return $isOk;
    }

    // Update cat's details
    // Return TRUE (if no SQL error) or FALSE (SQL error)
    public function update($name, $age, $gender, $status) {        
              
                // STEP 1 - Connect to MySQL Database
                $connMgr = new Connection();
                $pdo = $connMgr->connect();
                // STEP 2 - Prepare SQL Query
                $sql = "
                    UPDATE
                    cat
                    SET
                    status = :status,
                    age = :age,
                    gender = :gender
                    WHERE
                        name = :name
                ";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':status', $status, PDO::PARAM_STR);
                $stmt->bindParam(':name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':age', $age, PDO::PARAM_INT);
                // STEP 3 - Run Query
                $isOk = $stmt->execute();
                
                // STEP 4
                $stmt = null;
                $pdo = null;        
                
                // STEP 5
                return $isOk;
    }

    public function updateType($itineraryID, $itineraryType) {      

        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();

        $sql = "
            UPDATE itinerary SET itineraryType = :itineraryType where itineraryID = :itineraryID
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':itineraryType', $itineraryType, PDO::PARAM_STR);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_STR);

        $isOk = $stmt->execute();
        

        $stmt = null;
        $pdo = null;        
        
        return $isOk;
    }

    public function copyItinerary($itineraryID, $userID){
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();

        $sql = "
            INSERT INTO itinerary (itineraryID, name, startDate, endDate, itineraryType, userID, shared) 
            SELECT null, name, startDate, endDate, itineraryType, :userID, 0 from itinerary WHERE itineraryID = :itineraryID;

            UPDATE itinerary SET shared = ((SELECT shared WHERE itineraryID = :itineraryID) + 1) where itineraryID = :itineraryID;
            SELECT LAST_INSERT_ID() AS new_id;
            
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_STR);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_STR);
        $isOk = $stmt->execute();
        $id = $pdo->lastInsertId();

        $stmt = null;
        $pdo = $connMgr->getConnection();  

        $sql = "
        INSERT INTO activity (activityID, poiUUID, startTime, endTime, activityDate, locType, locDataset, itineraryID)
        SELECT null, poiUUID, startTime, endTime, activityDate, locType, locDataset, :new_id from activity WHERE itineraryID = :itineraryID;
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':new_id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_STR);
        $isOk = $stmt->execute();
        
        return $id;
    }

    public function updateItineraryName($itineraryID, $name) {      

        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();

        $sql = "
            UPDATE itinerary SET name = :name where itineraryID = :itineraryID
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_STR);

        $isOk = $stmt->execute();
        

        $stmt = null;
        $pdo = null;        
        
        return $isOk;
    }

    public function getRecommendedDefault($userID) {
            
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection(); // PDO object
        
        $sql = "SELECT * 
            FROM itinerary 
            WHERE itineraryType = 
            (SELECT itineraryType from itinerary WHERE userID =:userID GROUP by itineraryType ORDER by count(itineraryType) DESC 
            limit 1 ) 
            AND userID <> :userID
            ORDER BY shared DESC LIMIT 4
            ";
                    
        $stmt = $pdo->prepare($sql); // SQLStatement object
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute(); // RUN SQL
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $itineraries = [];
        while ( $row = $stmt->fetch() ) {
            $itinerary = new itinerary( 
                        $row['itineraryID'], 
                        $row['name'], 
                        $row['startDate'], 
                        $row['endDate'], 
                        $row['itineraryType'],
                        $row['userID'],
                        $row['shared'] 
                    ); // new itinerary object
            $itineraries[] = $itinerary; // add itinerary object to ret array
        }
        // $itineraryID; $name; $startDate; $endDate; $userID;

        // STEP 5
        $stmt = null; // clear memory
        $pdo = null; // clear memory
        
        return $itineraries;
    }
}
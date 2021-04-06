<?php

include_once 'autoload.php';

class UserDAO {
    
    public function create($user) {
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO user (userID, firstName, lastName, emailAddress, password)
                VALUES (:userID, :firstName, :lastName, :email, :passwordHash)';
        $stmt = $pdo->prepare($sql); 

        $userID = $user->getUserID(); 
        $firstName = $user->getFirstName(); 
        $lastName = $user->getLastName(); 
        $email = $user->getEmail(); 
        $passwordHash = $user->getPasswordHash(); 


        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
        $stmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':passwordHash', $passwordHash, PDO::PARAM_STR);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }

    public function get($email) {
        
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'SELECT userID, firstName, lastName, emailAddress, password FROM user WHERE emailAddress = :emailAddress';

        $stmt = $pdo->prepare($sql); 
        $stmt->bindParam(":emailAddress", $email, PDO::PARAM_STR);

        $user = null;
        $stmt->execute();
            
        while ( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
            $user = new User( $row["userID"], $row["firstName"], $row["lastName"], $row["emailAddress"], $row["password"] );
        };            

        $stmt = null;
        $pdo = null;

        return $user;
    }
}
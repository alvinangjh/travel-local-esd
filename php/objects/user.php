<?php

include_once 'autoload.php';

class User {
    private $userID;
    private $firstName;
    private $lastName;
    private $email;
    private $passwordHash;

    function __construct($userID, $firstName, $lastName, $email, $passwordHash) {
        $this->userID = $userID;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
    }

    public function getUserID(){
        return $this->userID;
    }

    public function getFirstName(){
        return $this->firstName;
    }

    public function getLastName(){
        return $this->lastName;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getPasswordHash(){
        return $this->passwordHash;
    }

    public function setPasswordHash($hashed){
        $this->passwordHash = $hashed;
    }

}
<?php

class itinerary implements \JsonSerializable {

    private $itineraryID;
    private $name;
    private $startDate;
    private $endDate;
    private $itineraryType;
    private $userID;
    private $shared;

    public function __construct($itineraryID, $name, $startDate, $endDate, $itineraryType, $userID, $shared) {
        $this->itineraryID = $itineraryID;
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->itineraryType = $itineraryType;
        $this->userID = $userID;
        $this->shared = $shared;
    }

    public function jsonSerialize(){
        if (!isset($json)) $json = new stdClass();
        foreach ($this as $key => $value){
            
            $json->$key = $value;
        }
        return $json;
    }

    public function getItineraryID() {
        return $this->itineraryID;
    }

    public function getName() {
        return $this->name;
    }

    public function getStartDate() {
        return $this->startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function getItineraryType() {
        return $this->itineraryType;
    }

    public function getUserID() {
        return $this->userID;
    }

    public function getSharedCount() {
        return $this->shared;
    }
}

?>
<?php

include_once '../includes/autoload.php';

    class activity {
        // object properties
        public $activityID;
        public $poiUUID;
        public $itineraryID;
            
        // constructor with $db as database connection
        public function __construct($activityID, $poiUUID, $startTime, $endTime, $activityDate, $locType, $locDataset, $itineraryID) {
            $this->activityID = $activityID;
            $this->poiUUID = $poiUUID;
            $this->startTime = $startTime;
            $this->endTime = $endTime;
            $this->activityDate = $activityDate;
            $this->locType = $locType;
            $this->locDataset = $locDataset;
            $this->itineraryID = $itineraryID;
        }

        public function getActivityID(){
            return $this->activityID;
        }

        public function getPOIUUID(){
            return $this->poiUUID;
        }

        public function getStartTime(){
            return $this->startTime;
        }

        public function getEndTime(){
            return $this->endTime;
        }
        
        public function getActivityDate(){
            return $this->activityDate;
        }

        public function getLocType(){
            return $this->locType;
        }

        public function getLocDataset(){
            return $this->locDataset;
        }

        public function getItineraryID(){
            return $this->itineraryID;
        }
    }
?>
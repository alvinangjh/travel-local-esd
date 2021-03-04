<?php

include_once 'autoload.php';

    class Location {
        // object properties
        public $locID;
        public $locTitle;
        public $locAddress;
        public $locPostalCode;
        public $locDesc;
        public $categories;
        public $rating;
        public $imageUrl;
        public $createdBy;
        public $latitude;
        public $longitude;
        public $venueType;
        public $businessContact;
        public $businessEmail;
        public $startTime;
        public $endTime;
        public $businessWeb;


        // constructor with $db as database connection
        public function __construct($locID, $locTitle, $locAddress, $locPostalCode, $locDesc, $categories, $rating, $imageUrl, $createdBy, $latitude, $longitude, $venueType, $businessContact, $businessEmail, $startTime, $endTime, $businessWeb) {
            $this->locID = $locID;
            $this->locTitle = $locTitle;
            $this->locAddress = $locAddress;
            $this->locPostalCode = $locPostalCode;
            $this->locDesc = $locDesc;
            $this->categories = $categories;
            $this->rating = $rating;
            $this->imageUrl = $imageUrl;
            $this->createdBy = $createdBy;
            $this->latitude = $latitude;
            $this->longitude = $longitude;
            $this->venueType = $venueType;
            $this->businessContact = $businessContact;
            $this->businessEmail = $businessEmail;
            $this->startTime = $startTime;
            $this->endTime = $endTime;
            $this->businessWeb = $businessWeb;
        }

        public function getLocID(){
            return $this->locID;
        }

        public function getLocTitle(){
            return $this->locTitle;
        }

        public function getLocAddress(){
            return $this->locAddress;
        }

        public function getLocPostalCode(){
            return $this->locPostalCode;
        }

        public function getLocDesc(){
            return $this->locDesc;
        }

        public function getCategories(){
            return $this->categories;
        }

        public function getRating(){
            return $this->rating;
        }

        public function getImageUrl(){
            return $this->imageUrl;
        }

        public function getCreatedBy(){
            return $this->createdBy;
        }

        public function getLatitude(){
            return $this->latitude;
        }

        public function getLongitude(){
            return $this->longitude;
        }

        public function getVenueType(){
            return $this->venueType;
        }

        public function getBusinessContact(){
            return $this->businessContact;
        }

        public function getBusinessEmail(){
            return $this->businessEmail;
        }

        public function getStartTime(){
            return $this->startTime;
        }

        public function getEndTime(){
            return $this->endTime;
        }

        public function getBusinessWeb(){
            return $this->businessWeb;
        }
    }
?>
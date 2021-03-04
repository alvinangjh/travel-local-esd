<?php

    class Connection {

        public function getConnection() {
            $dsn = "mysql:host=localhost;dbname=travel_local;port=3306";
            $pdo = new PDO($dsn, "root", ""); 
            return $pdo;
        }
    }
?>
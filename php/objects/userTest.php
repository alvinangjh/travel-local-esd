<?php 

include_once 'autoload.php';

$user = file_get_contents('php://input');

$decoded = array();
 
//Decode the JSON string and convert it into a PHP associative array.
$decoded = json_decode($user, true);

$password = $decoded["password"];
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$new_user = new User("", $decoded["firstName"], $decoded["lastName"], $decoded["email"], $passwordHash);

// $new_user = new User("", $decoded->getFirstName(), )
$userDAO = new UserDAO();
$status = $userDAO->create($new_user);

echo $status;

?>
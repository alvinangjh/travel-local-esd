<?php 

include_once 'autoload.php';

$userdao = new UserDAO();
$user = $userdao->get($_POST["email"]);
$password = $_POST["password"];

if ($user){
    // If username exists
    // get the hashed password from the database
    // Match the hashed password with the one which user entered
    // if it does not match. -> error
    $hashed = $user -> getPasswordHash();
    $status = password_verify($password,$hashed);
    //echo "<script>console.log('Debug Objects: " . $status . "' );</script>";
    // check if the plain text password is valid
    $result = array();

    if ($status){ 
        $result["status"] = "Success";
        $result["userID"] = $user->getUserID();
        echo json_encode($result);
    }

    else{
        $result["status"] = "Fail";
        $result["userID"] = 0;
        echo json_encode($result);
    }
}
else{
    $result["status"] = "Fail";
    $result["userID"] = 0;
    echo json_encode($result);
}


?>
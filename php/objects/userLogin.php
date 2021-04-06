<?php 

include_once 'autoload.php';

$userdao = new UserDAO();
$user = $userdao->get($_POST["email"]);
$password = $_POST["password"];

if ($user){
    
    $hashed = $user -> getPasswordHash();
    $status = password_verify($password,$hashed);
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
<?php
    $q = $_GET["q"];
    $user = "root";
    $passwd = "604087363";
    $host = "127.0.0.1";
    $database = "myDB";
    $response;
    
    $conn = new mysqli();
    $conn->connect($host, $user, $passwd);
    if($conn->error){
        $response = "ERROR!";
        echo $response;
        exit();
    }
    $conn->select_db($database);
    $res = $conn->query("select email from user where email = '$q" . "';");
    $flag = 0;
    while($row = $res->fetch_array()){
        $flag = 1;
    }
    if($flag){
        $response = "Email Address Already Exists!";
        echo $response;
    }
    else{
        $response = "You can use this Email!";
        echo $response;
    }
    $conn->close();
?>
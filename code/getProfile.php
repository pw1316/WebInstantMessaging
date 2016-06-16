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
        $response = "Database offline";
        echo $response;
        exit();
    }
    $conn->select_db($database);
    $res = $conn->query("select email,uname from user where email = '$q" . "';");
    $flag = 0;
    $result = array();
    while($row = $res -> fetch_array(MYSQLI_ASSOC)){
        $result[$flag] = $row;
        $flag = $flag + 1;
    }
    if($flag){
        echo json_encode($result);
    }
    else{
        echo "No such user";
    }
    $conn->close();
?>
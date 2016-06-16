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
        $response = "E";
        echo $response;
        exit();
    }
    $conn->select_db($database);
    $query = "select from_email from requestList where to_email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query);
    $result = array();
    $flag = 0;
    while($row = $res -> fetch_array(MYSQLI_ASSOC)){
        $result[$flag] = $row;
        $flag =$flag + 1;
    }
    if($flag) echo json_encode($result);
    else echo "E";
    $conn->close();
?>
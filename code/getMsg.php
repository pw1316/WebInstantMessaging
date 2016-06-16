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
    $query = "select * from message where from_email = ";
    $query = $query . "'" . $q . "' or to_email = ";
    $query = $query . "'" . $q . "' order by send_time asc;";
    $res = $conn -> query($query);
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
        echo "E";
    }
    $conn->close();
?>
<?php
    $q = $_GET["q"];
    $r = $_GET["r"];
    $s = $_GET["s"];
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
    $query = "update groups set group_name = ";
    $query = $query . "'" . $s . "' where group_id = ";
    $query = $query . "'" . $r . "' and email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query);
    echo $q . $r . $s;
    $conn->close();
?>
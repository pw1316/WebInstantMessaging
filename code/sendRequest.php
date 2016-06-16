<?php
    $q = $_GET["q"];
    $r = $_GET["r"];
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
    $query = "insert into requestList values(";
    $query = $query . "'" . $q . "',";
    $query = $query . "'" . $r . "');";
    $res = $conn->query($query);
    $conn->close();
?>
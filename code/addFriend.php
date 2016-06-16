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
        $response = "E";
        echo $response;
        exit();
    }
    $conn->select_db($database);
    $query = "insert into friends values(";
    $query = $query . "'" . $q . "',";
    $query = $query . "'" . $r . "',";
    $query = $query . "'" . "10000" . "');";
    $res = $conn->query($query);
    $query = "insert into friends values(";
    $query = $query . "'" . $r . "',";
    $query = $query . "'" . $q . "',";
    $query = $query . "'" . "10000" . "');";
    $res = $conn->query($query);
    echo $q . $r;
    $conn->close();
?>
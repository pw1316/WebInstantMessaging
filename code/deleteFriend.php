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
    $query = "delete from friends where from_email = ";
    $query = $query . "'" . $q . "' and to_email = ";
    $query = $query . "'" . $r . "';";
    $res = $conn->query($query);
    $query = "delete from friends where from_email = ";
    $query = $query . "'" . $r . "' and to_email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query);
    echo $q . $r;
    $conn->close();
?>
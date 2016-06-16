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
        echo "E";
        exit();
    }
    $conn->select_db($database);
    $query = "update user set uname = ";
    $query = $query . "'" . $r . "' where email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query);
    echo $q . $r;
    $conn->close();
?>
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
    $query = "select group_id from groups where email = ";
    $query = $query . "'" . $q . "' and group_id = ";
    $query = $query . "'" . $s . "';";
    $res = $conn->query($query);
    $row = $res -> fetch_array(MYSQLI_ASSOC);
    if(!$row){
        echo $s;
        exit();
    }
    $query = "update friends set group_id =";
    $query = $query . "'" . $s . "' where from_email = ";
    $query = $query . "'" . $q . "' and to_email = ";
    $query = $query . "'" . $r . "';";
    $res = $conn->query($query);
    echo $q . $r . $s;
    $conn->close();
?>
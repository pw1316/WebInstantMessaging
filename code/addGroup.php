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
    do{
        $newid = mt_rand(10001,99999);
        $query = "select group_id from groups where group_id = '" . $newid . "' and email = " . "'" . $q . "';";
        $res = $conn->query($query);
        $row = $res -> fetch_array(MYSQLI_ASSOC);
    }while($row);
    
    $query = "insert into groups values(";
    $query = $query . "'" . $q . "',";
    $query = $query . "'" . $r . "',";
    $query = $query . "'" . $newid . "',";
    $query = $query . "'" . "n" . "');";
    $res = $conn->query($query);
    echo $q . $r . $newid;
    $conn->close();
?>
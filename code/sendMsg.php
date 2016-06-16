<?php
    date_default_timezone_set("Etc/GMT-8");
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
    $t = date('y-m-d H:i:s',time());
    $query = "insert into message values(";
    $query = $query . "'" . $q . "',";
    $query = $query . "'" . $r . "',";
    $query = $query . "'" . $t . "',";
    $query = $query . "'" . $s . "',";
    $query = $query . "'" . "n" . "');";
    $res = $conn->query($query);
    echo "to " . $r . " at " . $t . "\n" . $s . "\n";
    $conn->close();
?>
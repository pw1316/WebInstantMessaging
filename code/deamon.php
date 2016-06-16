<?php
    date_default_timezone_set("Etc/GMT-6");
    $date = date('y-m-d H:i:s',time());
    $user = "root";
    $passwd = "604087363";
    $host = "127.0.0.1";
    $database = "myDB";
    $response;
    
    $conn = new mysqli();
    $conn->connect($host, $user, $passwd);
    if($conn->error){
        exit();
    }
    $conn->select_db($database);
    $query = "delete from message where send_time < ";
    $query = $query . "'" . $date . "';";
    $res = $conn->query($query);
    $conn->close();
?>
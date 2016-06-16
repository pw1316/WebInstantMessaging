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
    $query = "select email,uname from user where ";
    $query = $query . "email = '" . $r . "' or ";
    $query = $query . "uname = '" . $r . "';";
    $res = $conn->query($query);
    $flag = 0;
    $result = array();
    while($row = $res -> fetch_array(MYSQLI_ASSOC)){
        $query = "select to_email from friends where ";
        $query = $query . "from_email = '" . $q . "' and ";
        $query = $query . "to_email = '" . $row['email'] . "';";
        if($conn -> query($query) -> fetch_array(MYSQLI_ASSOC)){
            $row["is_friend"] = "y";
        }
        else{
            if($row['email'] == $q) $row["is_friend"] = "y";
            else $row["is_friend"] = "n";
        }
        $result[$flag] = $row;
        $flag = $flag + 1;
    }
    if($flag){
        echo json_encode($result);
    }
    else{
        echo "No such user";
    }
    $conn->close();
?>
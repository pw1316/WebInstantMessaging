<?php
    $q = $_GET["q"];
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
    $query = "select group_name,group_id from groups where email = '$q" . "' order by group_id asc;";
    $gres = $conn -> query($query);
    $flag = 0;
    $result = array();
    while($row = $gres -> fetch_array(MYSQLI_ASSOC)){
        $result[$flag] = $row;
        $flag = $flag + 1;
        $query = "select email,uname from user,friends where friends.from_email = '" . $q ."'";
        $query = $query . " and user.email = friends.to_email and friends.group_id = ";
        $query = $query . "'" . $row['group_id'] . "';";
        $fres = $conn -> query($query);
        while($frow = $fres -> fetch_array(MYSQLI_ASSOC)){
            $result[$flag] = $frow;
            $flag = $flag + 1;
        }
    }
    if($flag){
        echo json_encode($result);
    }
    else{
        echo "No such user";
    }
    $conn->close();
?>
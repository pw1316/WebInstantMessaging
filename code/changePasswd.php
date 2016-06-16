<?php
    $q = $_GET["q"];
    $r = $_GET["r"];
    $s = $_GET["s"];
    $t = $_GET["t"];
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
    $query = "select passwd from user where email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query) -> fetch_array(MYSQLI_ASSOC);
    if(!$res){
        echo "E";
        exit();
    }
    if($res['passwd'] != $r){
        echo "N";
        exit();
    }
    $flag = 1;
    if(strlen($s) < 4 || strlen($s) > 16) $flag = 0;
    else {
        $sl = strtolower($s);
        for($i = 0; $i < strlen($sl); $i++){
            if($sl[$i] >= 'a' && $sl[$i] <= 'z' || $sl[$i] >= '0' && $sl[$i] <= '9'){}
            else $flag = 0;
        }
    }
    if($flag == 0){
        echo "I";       
        exit();
    }
    $query = "update user set passwd = ";
    $query = $query . "'" . $s . "' where email = ";
    $query = $query . "'" . $q . "';";
    $res = $conn->query($query);
    if($res) echo "D";
    else echo "F";
    $conn->close();
?>
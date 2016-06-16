<?php
    session_start();
    $user = "root";
    $passwd = "604087363";
    $host = "127.0.0.1";
    $database = "myDB";
    $login_email = $_POST['login_email'];
    $login_passwd = $_POST['login_passwd'];
    $reg_email = $_POST['reg_email'];
    $reg_uname = $_POST['reg_uname'];
    $reg_passwd = $_POST['reg_passwd'];
    $reg_passwd_retype = $_POST['reg_passwd_retype'];
    $q = $_GET['q'];
    $query = "";
    $conn;
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" content="en-us">
    <title>Long May The Sunshine!</title>
</head>
<body>
    <?php
    
    
    if($q == 1){
        echo "<h1>Can not find your account back!</h1><h1>Please contact the administrator:</h1>";
        echo "<h2>QQ:604087363</h2>";
        echo "<a href=\"/index.html\">Return to homepage</a>";
    }
    else if($q == 2){
        $flag = 1;
        /*check email*/
        if(strlen($reg_email) == 0 || strlen($reg_email) > 30){
            $flag = 0;
        }
        else if(strpos($reg_email,"@") == false){
            $flag = 0;
        }
        if($flag == 0){
            echo "<h1>Invalid Email!</h1>";
            exit();
        }
        
        /*check uname*/
        if(strlen($reg_uname) == 0 || strlen($reg_uname) > 15) $flag = 0;
        else {
            $reg_uname_l = strtolower($reg_uname);
            if($reg_uname_l[0] < 'a' || $reg_uname_l[0] > 'z') $flag = 0;
            for($i = 1; $i < strlen($reg_uname_l); $i++){
                if($reg_uname_l[$i] >= 'a' && $reg_uname_l[$i] <= 'z' || $reg_uname_l[$i] >= '0' && $reg_uname_l[$i] <= '9' || $reg_uname_l[$i] == '_'){}
                else $flag = 0;
            }
        }
        if($flag == 0){
            echo "<h1>Invalid User name!</h1>";
            exit();
        }
        
        /*check pass*/
        if(strlen($reg_passwd) < 4 || strlen($reg_passwd) > 16) $flag = 0;
        else {
            $reg_passwd_l = strtolower($reg_passwd);
            for($i = 0; $i < strlen($reg_passwd_l); $i++){
                if($reg_passwd_l[$i] >= 'a' && $reg_passwd_l[$i] <= 'z' || $reg_passwd_l[$i] >= '0' && $reg_passwd_l[$i] <= '9'){}
                else $flag = 0;
            }
        }
        if($flag == 0){
            echo "<h1>Invalid Password!</h1>";
            exit();
        }
        
        /*check repass*/
        if($reg_passwd != $reg_passwd_retype) $flag = 0;
        if($flag == 0){
            echo "<h1>Two passwords not the same!</h1>";
            exit();
        }
        
        $conn = new mysqli();
        $conn->connect($host, $user, $passwd);
        if($conn->error){
            echo "<h1>Oops</h1><h1>There maybe something wrong</h1><h1>Please try again later</h1>";
            exit();
        }
        $conn->select_db($database);
        $query = "select email from user where email = '$reg_email" . "';";
        $res = $conn->query($query);
        $flag = 0;
        while($row = $res->fetch_array()){
            $flag = 1;
        }
        if($flag){
            echo "<h1>Email Address Already Exists!</h1>";
        }
        else{
            $query = "insert into user values('$reg_email','$reg_uname','$reg_passwd');";
            $res = $conn->query($query);
            if($res){
                echo "<h1>Register Successfully!</h1>";
                echo "<a href=\"/index.html\">Return to homepage</a>";
            }
            else{
                echo "<h1>Oops</h1><h1>There maybe something wrong</h1><h1>Please try again later</h1>";
            }
            $query = "insert into groups values('$reg_email','My Friends','10000','y');";
            $res = $conn->query($query);
        }
        $conn->close();
    }
    else if($q == 0){
        $flag = 1;
        /*check email*/
        if(strlen($login_email) == 0 || strlen($login_email) > 30){
            $flag = 0;
        }
        else if(strpos($login_email,"@") == false){
            $flag = 0;
        }
        if($flag == 0){
            echo "<h1>Invalid Email!</h1>";
            exit();
        }
        
        /*check pass*/
        if(strlen($login_passwd) < 4 || strlen($login_passwd) > 16) $flag = 0;
        else {
            $login_passwd_l = strtolower($login_passwd);
            for($i = 0; $i < strlen($login_passwd_l); $i++){
                if($login_passwd_l[$i] >= 'a' && $login_passwd_l[$i] <= 'z' || $login_passwd_l[$i] >= '0' && $login_passwd_l[$i] <= '9'){}
                else $flag = 0;
            }
        }
        if($flag == 0){
            echo "<h1>Invalid Password!</h1>";
            exit();
        }
        
        $conn = new mysqli();
        $conn->connect($host, $user, $passwd);
        if($conn->error){
            echo "<h1>Oops</h1><h1>There maybe something wrong</h1><h1>Please try again later</h1>";
            exit();
        }
        $conn->select_db($database);
        $query = "select email,passwd from user where email='$login_email';";
        $res = $conn ->query($query);
        $row = $res->fetch_array(MYSQLI_ASSOC);
        if(!$row){
            echo "<h1>No such user!</h1>";
            exit();
        }
        if($row['passwd'] != $login_passwd){
            echo "<h1>Wrong password!</h1>";
            exit();
        }
        $conn->close();
        $_SESSION['email'] = $login_email;
        header("Location: /home.php");
        exit();
    }
    ?>
</body>
</html>
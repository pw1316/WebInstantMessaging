<?php
    session_start();
    if(!isset($_SESSION['email'])){
      echo "<h1>Please <a href=\"/index.html\">Login</a> First!</h1>";
      exit();
    }
    $data = $_SESSION['email'];
    date_default_timezone_set("Etc/GMT-8");
?>
<!DOCTYPE html>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Language" content="en-us">
  <?php
    echo "<meta id=\"email\" content=\"$data\">";
  ?>
  <title>Long May The Sunshine!</title>
  <link rel="stylesheet" type="text/css" href="/style/home.css">
  <script type="text/javascript" src="/code/home.js"></script>
</head>
<body>
<div id="head">
  <img src="/src/home_title.jpg" width="100%">
  <?php
    echo "<div id=\"time_stamp\">" . date('Y-m-d H:i:s l',time()) . "</div>";
  ?>
</div>
<div id="body">
  <div id="body_left">
  <table cellspacing="1" cellpadding="1" id="profiletbl">
    <tr>
      <td rowspan="2" class="table_item_name">Welcome</td>
      <td class="table_item_name" height="20px">email:</td>
      <td id="myemail" class="table_item" height="20px" onclick="changePasswd(this)"></td>
    </tr>
    <tr>
      <td class="table_item_name" height="20px">user:</td>
      <td id="myuname" class="table_item" height="20px" onclick="intoUname(this)"></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align:center;" height="20px"><input type="button" value="Search" onclick="searchUser()" style="width:100%;"></td>
      <td height="20px"><input id="searchtext" type="text" maxlength="30"></td>
    </tr>
    <tr><td colspan="3" height="12px"><hr/></td></tr>
    <tr><td colspan="3">
      <div id="friendarea">
        
      </div>
    </td></tr>
  </table>
  <table id="profilectl">
    <tr>
      <td style="width:33%;"><input type="button" value="Friends" style="width:100%;" onclick="showFriends()"></td>
      <td><input type="button" value="Groups" style="width:100%;" onclick="showGroups()"></td>
      <td style="width:33%;"><input type="button" value="Msg" style="width:100%;"></td>
    </tr>
  </table>
  </div>
  <div id="body_right">
    
  </div>
</div>
<div id="tail" style="height: 18%;clear:both">
  <hr/>
  <div class="tail">CopyLeft© 2016-2016 GPA4.3,All Rights Not Reserved</div>
</div>
</body>
</html>
<script>
  refreshProfile();
  refreshTime();
  var timer_refresh_time = window.setInterval(refreshTime,1000);
  refreshFriends();
  getRequest();
  var timer_get_request = window.setInterval(getRequest,5000);
  getDialog();
  var timer_get_dialog = window.setInterval(getDialog,2000);
</script>
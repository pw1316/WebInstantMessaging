var dia = "",olddia="";

function refreshProfile(){
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var email = document.getElementById("myemail");
  var uname = document.getElementById("myuname");
  var rec;
  xmlhttp.open("GET","/code/getProfile.php?q=" + str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) !='D' && rec.charAt(0) !='D'){
    rec = eval(rec);
    rec = rec[0];
    email.innerHTML = rec.email;
    uname.innerHTML = rec.uname;
    return true;
  }
  else{
    email.innerHTML = "null";
    uname.innerHTML = "null";
  }
}

function refreshTime(){
  var xmlhttp = new XMLHttpRequest();
  var time_stamp = document.getElementById("time_stamp");
  var rec;
  xmlhttp.open("GET","/code/getTime.php",true);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      time_stamp.innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
}

function refreshFriends(){
  var xmlhttp = new XMLHttpRequest();
  var area = document.getElementById("friendarea");
  var str = document.getElementById("email").content;
  var rec;
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  xmlhttp.open("GET","/code/getFriends.php?q=" + str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) !='D' && rec.charAt(0) !='D'){
    rec = eval(rec);
    var index = -1;
    var tagclass = "g";
    for(var i=0;i < rec.length; i++){
      if(rec[i].group_id){
        index = index + 1;
        var tag = document.createElement("p");
        tag.id = tagclass + index;
        tag.className = rec[i].group_id;
        tag.style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;"
        tag.onclick = function(){
          var a = document.getElementsByClassName(this.id);
          for(var i=0;i < a.length;i++){
            if(a[i].hidden) a[i].hidden = false;
            else a[i].hidden = true;
          }
        }
        if(rec[i].group_name) tag.innerHTML = rec[i].group_name;
        else tag.innerHTML = "noname";
        area.appendChild(tag);
      }
      else{
        var tag = document.createElement("p");
        tag.id = rec[i].email;
        tag.className = tagclass + index;
        tag.style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #aa3333;"
        tag.setAttribute("onclick","javasript:showDialog(this.id)");
        tag.innerHTML = "#" + rec[i].uname;
        tag.hidden = true;
        area.appendChild(tag);
      }
    }
    return true;
  }
  else{
    var error = document.createElement("p");
    error.innerHTML = "null";
    error.id = "error";
    area.appendChild(error);
  }
}

function showDialog(email){
  var area = document.getElementById("body_right");
  var str = document.getElementById("email").content;
  document.getElementById(email).style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #aa3333;"
  var sibling = document.getElementsByClassName(document.getElementById(email).className);
  var flag = 1;
  for(var i=0;i < sibling.length;i++){
    var style = sibling[i].style;
    if(style.color == "rgb(170,170,51)") flag = 0;
  }
  if(flag) document.getElementById(document.getElementById(email).className).style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;"
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  var tbl = document.createElement("table");
  tbl.style = "height:98%;width:98%";
  var row = document.createElement("tr");
  row.style = "height:70%";
  var col = document.createElement("td");
  col.colSpan = "2";
  var tag = document.createElement("textarea");
  tag.id = "msgbox";
  tag.className = email;
  tag.style = "height:98%;width:98%;resize:none;font-size: 16px;font-family: \"Calibri\";color: #333333;";
  tag.readOnly = true;
  col.appendChild(tag);
  row.appendChild(col);
  tbl.appendChild(row);
  
  row = document.createElement("tr");
  row.style = "height:30%";
  col = document.createElement("td");
  col.style = "width:80%";
  tag = document.createElement("textarea");
  tag.id = "inputbox";
  tag.className = email;
  tag.style = "height:98%;width:98%;resize:none;font-size: 16px;font-family: \"Calibri\";color: #333333;";
  col.appendChild(tag);
  row.appendChild(col)
  
  col = document.createElement("td");
  tag = document.createElement("input");
  tag.id = "inputboxbtn";
  tag.type = "button";
  tag.value = "Send";
  tag.style = "height:98%;width:98%;";
  tag.className = email;
  tag.setAttribute("onclick","javasript:sendMsg(this.className)");
  col.appendChild(tag);
  row.appendChild(col);
  tbl.appendChild(row);
  area.appendChild(tbl);
  
  showMsg();
}

function showMsg(){
  var msgbox = document.getElementById("msgbox");
  if(!msgbox) return false;
  var to_email = msgbox.className;
  var from_email = document.getElementById("email").content;
  msgbox.value = "";
  if(dia.charAt(0) != 'E'){
    var log = eval(dia);
    for(var i=0;i < log.length;i++){
      if(log[i].from_email == from_email && log[i].to_email == to_email){
        msgbox.value = msgbox.value + "to " + log[i].to_email + " at " + log[i].send_time + "\n" + log[i].text + "\n";
      }
      else if(log[i].from_email == to_email && log[i].to_email == from_email){
        msgbox.value = msgbox.value + "from " + log[i].from_email + " at " + log[i].send_time + "\n" + log[i].text + "\n";
      }
    }
    msgbox.scrollTop = 10000;
  }
  return true;
}

function sendMsg(to_email){
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var text = document.getElementById("inputbox").value;
  var msgbox = document.getElementById("msgbox");
  var rec;
  xmlhttp.open("GET","/code/sendMsg.php?q="+str+"&r="+to_email+"&s="+text,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  document.getElementById("inputbox").value = "";
  msgbox.value = msgbox.value + rec;
  msgbox.scrollTop = 10000;
  getDialog();
}

function getDialog(){
  var xmlhttp = new XMLHttpRequest();
  var area = document.getElementById("body_right");
  var str = document.getElementById("email").content;
  var rec;
  xmlhttp.open("GET","/code/getMsg.php?q="+str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  olddia = dia;
  dia = rec;
  if(dia != olddia){
    var adia = eval(dia);
    var aolddia = eval(olddia);
    var index = 0;
    var i = 0;
    if(!aolddia){
      showMsg();
      return;
    }
    var older = 0;
    for(;i < aolddia.length && index < adia.length;){
      if(adia[index].send_time > aolddia[i].send_time){
        i++;
        older = 1;
        continue;
      }
      if(older){
        showMsg();
        older = 0;
      }
      var flag = 1;
      if(adia[index].from_email != aolddia[i].from_email) flag = 0;
      if(adia[index].to_email != aolddia[i].to_email) flag = 0;
      if(adia[index].send_time != aolddia[i].send_time) flag = 0;
      if(adia[index].text != aolddia[i].text) flag = 0;
      if(adia[index].is_read != aolddia[i].is_read) flag = 0;
      if(flag){
        index++;
        i++;
      }
      else{
        var from_email = adia[index].from_email;
        var to_email = adia[index].to_email;
        var send_time = adia[index].send_time;
        var text = adia[index].text;
        var is_read = adia[index].is_read;
        var tag = document.getElementById(from_email);
        if(!tag) tag = document.getElementById(to_email);
        if(tag && document.getElementById("msgbox")){
          if(document.getElementById("msgbox").className == tag.id) showMsg();
          else{
            tag.style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
            document.getElementById(tag.className).style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
          }
        }
        else if(tag){
          tag.style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
          document.getElementById(tag.className).style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
        }
      }
    }
    for(; index < adia.length;index++){
      var from_email = adia[index].from_email;
      var to_email = adia[index].to_email;
      var send_time = adia[index].send_time;
      var text = adia[index].text;
      var is_read = adia[index].is_read;
      var tag = document.getElementById(from_email);
      if(!tag) tag = document.getElementById(to_email);
      if(tag && document.getElementById("msgbox")){
        if(document.getElementById("msgbox").className == tag.id) showMsg();
        else{
          tag.style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
          document.getElementById(tag.className).style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
        }
      }
      else if(tag){
        tag.style = "font-size: 12px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
        document.getElementById(tag.className).style = "font-size: 14px;font-family: \"Calibri\";font-style: \"italic\";color: #666633;"
      }
    }
  }
}

function showFriends(){
  var xmlhttp = new XMLHttpRequest();
  var area = document.getElementById("body_right");
  var str = document.getElementById("email").content;
  var rec;
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  xmlhttp.open("GET","/code/getFriends.php?q="+str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) !='D' && rec.charAt(0) !='N'){
    rec = eval(rec);
    var index = -1;
    var tagclass = "s#g";
    for(var i=0;i < rec.length; i++){
      if(rec[i].group_id){
        index = index + 1;
        var tag = document.createElement("p");
        tag.id = tagclass + index;
        tag.className = "s#" + rec[i].group_id;
        tag.innerHTML = rec[i].group_name;
        tag.hidden = true;
        area.appendChild(tag);
      }
      else{
        var tag = document.createElement("div");
        tag.id = "s#" + rec[i].email;
        tag.className = tagclass + index;
        tag.style = "border:1px #989797 solid;margin:0 auto;width:98%;";
        area.appendChild(tag);
        
        var p = document.createElement("p");
        p.className = "s#" + rec[i].email;
        p.style = "font-size: 18px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;"
        p.innerHTML = "->" + rec[i].email + ":" + rec[i].uname;
        tag.appendChild(p);
        
        p = document.createElement("input");
        p.id = "s#" + rec[i].email + "#btn";
        p.className = "s#" + rec[i].email;
        p.type = "button";
        p.value = "Delete";
        p.setAttribute("onclick","javasript:deleteFriend(this.className)");
        tag.appendChild(p);
        
        p = document.createElement("select");
        p.id = "s#" + rec[i].email + "#select";
        p.className = "s#" + rec[i].email;
        p.setAttribute("onchange","javasript:changeGroup(this.className,this.value)");
        tag.appendChild(p);
      }
    }
    var tag = area.getElementsByTagName("div");
    for(var i=0;i < tag.length;i++){
      var sel = document.getElementById(tag[i].id + "#select");
      for(var j=0;j <= index;j++){
        var opt = document.createElement("option");
        opt.value = document.getElementById(tagclass + j).className.substring(2);
        opt.innerHTML = document.getElementById(tagclass + j).innerHTML;
        if(tag[i].className == tagclass + j) opt.selected="selected";
        sel.appendChild(opt);
      }
    }
    return true;
  }
  else{
    var error = document.createElement("p");
    error.innerHTML = "null";
    error.id = "error";
    area.appendChild(error);
  }
}

function deleteFriend(email){
  email = email.substring(2);
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var rec;
  xmlhttp.open("GET","/code/deleteFriend.php?q="+str+"&r="+email,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  refreshFriends();
  showFriends();
}

function changeGroup(email,gid){
  email = email.substring(2);
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var rec;
  xmlhttp.open("GET","/code/changeGroup.php?q="+str+"&r="+email+"&s="+gid,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  refreshFriends();
  showFriends();
}

function showGroups(){
  var xmlhttp = new XMLHttpRequest();
  var area = document.getElementById("body_right");
  var str = document.getElementById("email").content;
  var rec;
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  xmlhttp.open("GET","/code/getGroups.php?q="+str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) !='D' && rec.charAt(0) !='N'){
    rec = eval(rec);
    for(var i=0;i < rec.length;i++){
      var tag = document.createElement("table");
      tag.id = "s#" + rec[i].group_id;
      tag.className = "grouplist";
      tag.style = "border:1px #989797 solid;margin:0 auto;width:100%;";
      area.appendChild(tag);
      var row = document.createElement("tr");
      var col = document.createElement("td");
      col.colSpan = "3";
      col.innerHTML = "Group name:" + rec[i].group_name;
      col.style = "font-size: 18px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;";
      row.appendChild(col);
      tag.appendChild(row);
      
      row = document.createElement("tr");
      col = document.createElement("td");
      col.style = "width:33%;";
      var input = document.createElement("input");
      input.id = tag.id + "text";
      input.type = "text";
      input.className = tag.id;
      input.maxLength = "15";
      input.style = "width:98%;";
      col.appendChild(input);
      row.appendChild(col);
      
      col = document.createElement("td");
      input = document.createElement("input");
      input.id = tag.id + "btn_rename";
      input.type = "button";
      input.value = "Rename";
      input.className = tag.id;
      input.setAttribute("onclick","javasript:renameGroup(this.className)");
      input.style = "width:98%;";
      col.appendChild(input);
      row.appendChild(col);
      
      col = document.createElement("td");
      col.style = "width:34%;";
      input = document.createElement("input");
      input.id = tag.id + "btn_delete";     
      input.type = "button";
      input.value = "Delete";
      input.className = tag.id;
      input.style = "width:98%;";
      if(input.className.substring(2) == "10000") input.disabled = true;
      input.setAttribute("onclick","javasript:deleteGroup(this.className)");
      col.appendChild(input);
      row.appendChild(col);
      tag.appendChild(row);
    }
    var tag = document.createElement("table");
    tag.id = "s#add";
    tag.className = "grouplist";
    tag.style = "border:1px #989797 solid;margin:0 auto;width:100%;";
    area.appendChild(tag);
    
    var row = document.createElement("tr");
    var col = document.createElement("td");
    col.style = "width:60%;";
    var input = document.createElement("input");
    input.id = tag.id + "text";
    input.type = "text";
    input.maxLength = "15";
    input.className = tag.id;
    input.style = "width:98%;";
    col.appendChild(input);
    row.appendChild(col);
    
    col = document.createElement("td");
    input = document.createElement("input");
    input.id = tag.id + "btn";
    input.type = "button";
    input.value = "Add";
    input.className = tag.id;
    input.style = "width:100%;";
    input.setAttribute("onclick","javasript:addGroup(this.className)");
    col.appendChild(input);
    row.appendChild(col);
    tag.appendChild(row);
  }
  else{
    var error = document.createElement("p");
    error.innerHTML = "null";
    error.id = "error";
    area.appendChild(error);
  }
}

function renameGroup(gid){
  gid = gid.substring(2);
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var newname = document.getElementById("s#" + gid + "text").value;
  var rec;
  xmlhttp.open("GET","/code/renameGroup.php?q="+str+"&r="+gid+"&s="+newname,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  refreshFriends();
  showGroups();
}

function deleteGroup(gid){
  gid = gid.substring(2);
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var rec;
  xmlhttp.open("GET","/code/deleteGroup.php?q="+str+"&r="+gid,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  refreshFriends();
  showGroups();
}

function addGroup(gid){
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var newname = document.getElementById(gid + "text").value;
  var rec;
  xmlhttp.open("GET","/code/addGroup.php?q="+str+"&r="+newname,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  refreshFriends();
  showGroups();
}

function searchUser(){
  var xmlhttp = new XMLHttpRequest();
  var area = document.getElementById("body_right");
  var str = document.getElementById("email").content;
  var searchtext = document.getElementById("searchtext").value;
  var rec;
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  xmlhttp.open("GET","/code/getUser.php?q="+str+"&r="+searchtext,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) !='D' && rec.charAt(0) !='D'){
    rec = eval(rec);
    for(var i=0;i < rec.length;i++){
      var tag = document.createElement("table");
      tag.id = "s#" + rec[i].email;
      tag.className = "friendlist";
      tag.style = "border:1px #989797 solid;margin:0 auto;width:100%;";
      area.appendChild(tag);
      var row = document.createElement("tr");
      var col = document.createElement("td");
      col.colSpan = "2";
      col.innerHTML = "email:" + rec[i].email;
      col.style = "font-size: 18px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;";
      row.appendChild(col);
      tag.appendChild(row);
      row = document.createElement("tr");
      col = document.createElement("td");
      col.innerHTML = "uname:" + rec[i].uname;
      col.style = "font-size: 18px;font-family: \"Calibri\";font-style: \"italic\";color: #333333;width:50%;";
      row.appendChild(col);
      col = document.createElement("td");
      var input = document.createElement("input");
      input.type = "button";
      input.value = "Add";
      input.style = "width:100%;";
      input.className = rec[i].email;
      input.setAttribute("onclick","javasript:sendRquest(this.className)");
      if(rec[i].is_friend == "y") input.disabled = true;
      else input.disabled = false;
      col.appendChild(input);
      row.appendChild(col);
      tag.appendChild(row);
    }
  }
  else{
    var error = document.createElement("p");
    error.innerHTML = "null";
    error.id = "error";
    area.appendChild(error);
  }
}

function sendRquest(email){
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var reqstr = email;
  xmlhttp.open("GET","/code/sendRequest.php?q="+str+"&r="+reqstr,true);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  alert("request sent");
}

function getRequest(){
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var flag = 0;
  var rec;
  xmlhttp.open("GET","/code/getRequest.php?q="+str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  if(rec.charAt(0) != 'E'){
    rec = eval(rec);
    for(var i = 0;i < rec.length;i++){
      var aaa = window.confirm("" + rec[i].from_email + " wants to make friends with you.Agree?");
      if(aaa){
        flag = 1;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","/code/addFriend.php?q="+str +"&r=" + rec[i].from_email,false);
        xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          }
        }
        xmlhttp.send();
      }
      else{
      }
    }
  }
  
  xmlhttp = new XMLHttpRequest();
  str = document.getElementById("email").content;
  rec = "";
  xmlhttp.open("GET","/code/flushRequest.php?q="+str,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
    }
  }
  xmlhttp.send();
  if(flag) refreshFriends();
}

function intoUname(tag){
  if(document.getElementById("myunameinput")) return;
  var input = document.createElement("input");
  input.id = "myunameinput";
  input.type = "text";
  input.maxLength = "15";
  input.value = tag.innerHTML;
  input.setAttribute("onblur","changeUname(this)");
  input.focus();
  input.style = "width 98%";
  while(tag.childNodes.length>0){
    tag.removeChild(tag.childNodes[0]);
  }
  tag.appendChild(input);
}

function changeUname(text){
  var newname = text.value;
  var tag = document.getElementById("myuname");
  while(tag.childNodes.length>0){
    tag.removeChild(tag.childNodes[0]);
  }
  tag.innerHTML = newname;
  
  var xmlhttp = new XMLHttpRequest();
  str = document.getElementById("email").content;
  xmlhttp.open("GET","/code/changeUname.php?q="+str+"&r="+tag.innerHTML,true);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
    }
  }
  xmlhttp.send();
}

function changePasswd(tag){
  var area = document.getElementById("body_right");
  while(area.childNodes.length>0){
    area.removeChild(area.childNodes[0]);
  }
  var tag = document.createElement("table");
  tag.id = "s#pass";
  tag.className = "s#pass";
  tag.style = "border:1px #989797 solid;margin:0 auto;width:100%;";
  area.appendChild(tag);
  
  var row = document.createElement("tr");
  var col = document.createElement("td");
  col.innerHTML = "Old Pass:";
  col.className = "table_item_name";
  col.style = "width: 20%;";
  row.appendChild(col);
  
  col = document.createElement("td");
  var input = document.createElement("input");
  input.id = "s#oldpass";
  input.type = "password";
  input.maxLength = "16";
  input.setAttribute("onkeyup","javasript:checkOldpass()");
  input.style = "width:98%";
  col.appendChild(input);
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.id = "s#oldpass_err";
  col.className = "error";
  col.colSpan = "2";
  col.innerHTML = "&nbsp";
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.innerHTML = "New Pass:";
  col.className = "table_item_name";
  col.style = "width: 20%;";
  row.appendChild(col);
  
  col = document.createElement("td");
  input = document.createElement("input");
  input.id = "s#newpass";
  input.type = "password";
  input.maxLength = "16";
  input.setAttribute("onkeyup","javasript:checkNewpass()");
  input.style = "width:98%";
  col.appendChild(input);
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.id = "s#newpass_err";
  col.className = "error";
  col.colSpan = "2";
  col.innerHTML = "&nbsp";
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.innerHTML = "Confirm Pass:";
  col.className = "table_item_name";
  col.style = "width: 20%;";
  row.appendChild(col);
  
  col = document.createElement("td");
  input = document.createElement("input");
  input.id = "s#repass";
  input.type = "password";
  input.maxLength = "16";
  input.setAttribute("onkeyup","javasript:checkRepass()");
  input.style = "width:98%";
  col.appendChild(input);
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.id = "s#repass_err";
  col.className = "error";
  col.colSpan = "2";
  col.innerHTML = "&nbsp";
  row.appendChild(col);
  tag.appendChild(row);
  
  row = document.createElement("tr");
  col = document.createElement("td");
  col.colSpan = "2";
  input = document.createElement("input");
  input.id = "s#btn_change";
  input.type = "button";
  input.value = "Change";
  input.setAttribute("onclick","javasript:changePass()");
  input.style = "width:100%";
  col.appendChild(input);
  row.appendChild(col);
  tag.appendChild(row);
}

function checkOldpass(){
  var pass = document.getElementById("s#oldpass");
  var msg = document.getElementById("s#oldpass_err");
  var str = pass.value;
  if(str.length < 4 || str.length>16){
    msg.innerHTML="Not the right length!";
    return false;
  }
  else{
    str = str.toLowerCase();
    for(var i = 0;i < str.length;i++){
      if(str.charAt(i) >= 'a' && str.charAt(i) <= 'z' || str.charAt(i) >= '0' && str.charAt(i) <= '9'){
              
      }
      else{
        msg.innerHTML="Invalid password!";
        return false;
      }
    }
    msg.innerHTML="&nbsp";
    return true;
  }
}

function checkNewpass(){
  var pass = document.getElementById("s#newpass");
  var msg = document.getElementById("s#newpass_err");
  var str = pass.value;
  if(str.length < 4 || str.length>16){
    msg.innerHTML="Not the right length!";
    return false;
  }
  else{
    str = str.toLowerCase();
    for(var i = 0;i < str.length;i++){
      if(str.charAt(i) >= 'a' && str.charAt(i) <= 'z' || str.charAt(i) >= '0' && str.charAt(i) <= '9'){
              
      }
      else{
        msg.innerHTML="Invalid password!";
        return false;
      }
    }
    msg.innerHTML="&nbsp";
    return true;
  }
}

function checkRepass(){
  var pass = document.getElementById("s#newpass");
  var repass = document.getElementById("s#repass");
  var msg = document.getElementById("s#repass_err");
  var str = pass.value;
  var restr = repass.value;
    for(var i = 0;i < str.length;i++){
        if(str.charAt(i) != restr.charAt(i)){
            msg.innerHTML="Not equal to your password!";
            return false;
        }
    }
    msg.innerHTML="&nbsp";
    return true;
}

function changePass(){
  if(!checkOldpass()) return false;
  if(!checkNewpass()) return false;
  if(!checkRepass()) return false;
  var oldp = document.getElementById("s#oldpass").value;
  var newp = document.getElementById("s#newpass").value;
  var rep = document.getElementById("s#repass").value;
  
  var xmlhttp = new XMLHttpRequest();
  var str = document.getElementById("email").content;
  var rec;
  xmlhttp.open("GET","/code/changePasswd.php?q="+str+"&r="+oldp+"&s="+newp+"&t="+rep,false);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      rec = xmlhttp.responseText;
    }
  }
  xmlhttp.send();
  document.getElementById("s#oldpass").value = "";
  document.getElementById("s#newpass").value = "";
  document.getElementById("s#repass").value = "";
  if(rec == "E") alert("Error!");
  else if(rec == "N") alert("Old password not right!");
  else if(rec == "I") alert("Invalid password!");
  else if(rec == "F") alert("Change Failed!");
}
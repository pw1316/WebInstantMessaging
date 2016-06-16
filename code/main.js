function checkEMAIL() {
    var email = document.getElementById("reg_email");
    var msg = document.getElementById("reg_email_error_msg");
    var str = email.value;
    var index = str.indexOf("@");
    var xmlhttp = new XMLHttpRequest();
    var rec;
    if(email.value.length==0){
        msg.innerHTML="E-mail cannot be empty!";
        return false;
    }
    else if(index<0){
        msg.innerHTML="Wrong E-mail format!(e.g. xxx@xxx)";
        return false;
    }
    else if(email.value.length>30){
        msg.innerHTML="Too long!";
        return false;
    }
    else{
        xmlhttp.open("GET","/code/email_exists.php?q=" + str,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                rec = xmlhttp.responseText;
            }
        }
        xmlhttp.send();
        if(rec.charAt(0) == 'E'){
            msg.innerHTML = rec;
            return false;
        }
        else{
            msg.innerHTML = "&nbsp";
            return true;
        }
    }
}

function checkNAME() {
    var name = document.getElementById("reg_uname");
    var msg = document.getElementById("reg_uname_error_msg");
    var str = name.value;
    if(str.length==0){
        msg.innerHTML="User name cannot be empty!";
        return false;
    }
    else if(str.length>15){
        msg.innerHTML="Too long!";
        return false;
    }
    else{
        str = str.toLowerCase();
        if(str.charAt(i) < 'a' || str.charAt(i) > 'z'){
            msg.innerHTML="Invalid name!";
            return false;
        }
        for(var i=1;i<str.length;i++){
            if(str.charAt(i) >= 'a' && str.charAt(i) <= 'z' || str.charAt(i) >= '0' && str.charAt(i) <= '9' || str.charAt(i) == '_'){
                
            }
            else{
                msg.innerHTML="Invalid name!";
                return false;
            }
        }
        msg.innerHTML="&nbsp";
        return true;
    }
}

function checkPASS(){
    var pass = document.getElementById("reg_passwd");
    var msg = document.getElementById("reg_passwd_error_msg");
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

function checkPASS_AGAIN(){
    var pass = document.getElementById("reg_passwd");
    var repass = document.getElementById("reg_passwd_retype");
    var msg = document.getElementById("reg_passwd_retype_error_msg");
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

function checkLOGIN(){
    var email = document.getElementById("login_email").value;
    var pass = document.getElementById("login_passwd").value;
    var theForm = document.getElementById("form");
    var index = email.indexOf("@");
    var xmlhttp = new XMLHttpRequest();
    var flag = 1;
    
    if(email.length == 0) flag = 0;
    else if(index < 0) flag = 0;
    else if(email.length > 30) flag = 0;
    if(!flag){
        alert("Invalid Email!");
        return false;
    }
    
    if(pass.length < 4 || pass.length > 16) flag = 0;
    else{
        pass = pass.toLowerCase();
        for(var i = 0;i < pass.length;i++){
            if(pass.charAt(i) >= 'a' && pass.charAt(i) <= 'z' || pass.charAt(i) >= '0' && pass.charAt(i) <= '9'){
                
            }
            else{
                flag = 0;
                break;
            }
        }
    }
    if(!flag){
        alert("Invalid Password!");
        return false;
    }
    
    theForm.action = "/code/login.php?q=0";
    theForm.submit();
    return true;
}

function checkFORGET(){
    var theForm = document.getElementById("form");
    theForm.action = "/code/login.php?q=1";
    theForm.submit();
}

function checkREGISTER(){
    var theForm = document.getElementById("form");
    if(!checkEMAIL()) return false;
    if(!checkNAME()) return false;
    if(!checkPASS()) return false;
    if(!checkPASS_AGAIN()) return false;
    theForm.action = "/code/login.php?q=2";
    theForm.submit();
    return true;
}
$( "#loginBtn" ).click(function() {
    var mail = $( "#mailField" ).val();
    var pwd = $( "#passwordField" ).val();
    console.log( mail + " " + pwd );
try{
    $.post({
        url: 'http://localhost:8087/login',
        type: "POST", /* or type:"GET" or type:"PUT" */
        contentType: 'application/json',
        data: JSON.stringify({email: mail, password: pwd}),
        success: function (data, textStatus, request) {
            console.log(request.getResponseHeader("Authorization"));
            Cookies.set('username', mail);
            console.log(Cookies.get('username'));
            location.replace('home.html');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.statusText);
        }
    });
}catch(error){
    console.log(error.message);
}
});

$( "#signBtn" ).click(function() {
    var user = $("#userSign").val();
    var mail = $("#mailSign").val();
    var name = $("#nameSign").val();
    var surname = $("#surnameSign").val();
    var date = $("#birthSign").val();
    var pwdVal = $("#passwordSign").val() == $("#repeatPasswordSign").val() ? $("#passwordSign").val() : false;
    console.log("registration: " + user + " " + mail + " " + name + " " + surname + " " + date + " " + pwdVal);

    if (pwdVal == false) {
        console.log("Errore - pwd non uguali");
    }else{
    $.ajax({
        url: 'http://localhost:8083/submit',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({"username":user,"email": mail,"name": name,"surname": surname,"birthdate": date,"password": pwdVal}),
        success: function (result) {
            //$.cookie('token', data.Authorization)
            Cookies.set('username', mail);
            console.log(Cookies.get('username'));
            location.replace('home.html');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.statusText);
            console.log(thrownError);
        }
    });
    }
});
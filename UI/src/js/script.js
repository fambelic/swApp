$( "#loginBtn" ).click(function() {

    var mail = $( "#mailField" ).val();
    var pwd = $( "#passwordField" ).val();
    console.log( mail + " " + pwd );
try{
    $.post({
        url: "http://localhost:8087/login",
        //url: "http://mascorra/swapp-gateway",
        type: "POST", /* or type:"GET" or type:"PUT" */
        contentType: 'application/json',
        Accept: '*/*',

        data: JSON.stringify({"email": mail, "password": pwd}),
        success: function (data, textStatus, request) {
            //console.log(request.getResponseHeader("Authorization"));
            auth = request.getResponseHeader("Authorization");
            Cookies.set('auth', request.getResponseHeader("Authorization"));
            Cookies.set('username', mail);
            location.replace('home.html');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Attenzione!", "Informazioni di login non corrette!", "error");
            console.log(xhr.statusText);
            console.log(Cookies.get('auth'));
            console.log(Cookies.get('username'));
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
        swal("Attenzione!", "Le password non coincidono!", "error");
    }else{
    $.ajax({
        url: "http://localhost:8087/registration/submit",
        //url: 'http://localhost:8082/submit',
        type: "POST",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify({"username":user,"email": mail,"name": name,"surname": surname,"birthdate": date,"password": pwdVal}),
        success: function (result) {
            swal("Perfetto!", "La registrazione è avvenuta con successo, verrai reindirizzato al login!", "success")
                .then((value) => {
                    location.replace('index.html');
                });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal("Attenzione!", "Controlla le informazioni e riprova!", "error");
        }
    });
    }
});


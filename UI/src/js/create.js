$( document ).ready(function() {
    console.log(Cookies.get('username'))
    if(!Cookies.get('username')){
        location.replace('index.html');
    }else{;
        console.log(Cookies.get('username'))
    }
});

$("#confirmBtn").click(function() {
    var checkboxes = document.getElementsByName('categories');
    var title= $("#titolo").val();
    var foto= $("#foto");
    console.log(foto);
    var description= $("#description").val();
    var base64image = convertToBase64(foto);
    var categories = Array();
    console.log("title" + title + " - foto: " + base64image + " - description: " + description + " - categories: " + categories)
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            categories.push(checkboxes[i].value);
        }
    }

    try{
        $.post({
            url: 'http://localhost:8087/login',
            type: "POST", /* or type:"GET" or type:"PUT" */
            contentType: 'application/json',
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W10sImlhdCI6MTY3NTYwOTgzOCwiZXhwIjoxNjc1Njk2MjM4fQ.R4VjHYjfjBhcoHa8ThPJ4Lw20oAqhQfLwoihqZk5wkw",
              username: Cookies.get('username')
            },
            data: JSON.stringify({email: mail, password: pwd}),
            success: function (data, textStatus, request) {
                //console.log(request.getResponseHeader("Authorization"));
                //Cookies.set('username', mail);
                console.log(request);
                //location.replace('home.html');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.statusText);
            }
        });
    }catch(error){
        console.log(error.message);
    }
    console.log(categories);
});

$("#logoutBtn").click(function(){
console.log("culo");
});
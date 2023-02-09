$( document ).ready(function() {
    console.log(Cookies.get('username'))
    if(!Cookies.get('username')){
        location.replace('index.html');
    }else{;
        console.log(Cookies.get('username'))
    }
});

$("#logoutBtn").click(function(){
    Cookies.remove('username');
    location.replace('index.html');
});
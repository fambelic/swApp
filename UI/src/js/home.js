$( document ).ready(function() {
    if(Cookies.get('auth') == undefined || Cookies.get('username') == undefined){
        Cookies.remove();
        location.replace('index.html');
    }else{

        console.log(Cookies.get('username'));
        console.log(Cookies.get('auth'))
    }

    $("#openModalButton").click(function() {
        $('#myModal').modal('show');
    });
    $("#closeModalButton").click(function() {
        $('#myModal').modal('hide');
    });

    $("#closeModal").click(function() {
        $('#myModal').modal('hide');
    });

});

$("#logoutBtn").click(function(){
    Cookies.remove();
    location.replace('index.html');
});









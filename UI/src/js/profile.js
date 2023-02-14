$(document).ready(function() {

    try{
        $.get({
            url: 'http://localhost:8083/ads',
            type: "GET", /* or type:"GET" or type:"PUT" */
            contentType: 'application/json',
            headers: {
                Authorization: Cookies.get('auth'),
                username: Cookies.get('username')
            },
            success: function (data, textStatus, request) {
                var mainbody = $("#mainbody");
                mainbody.append(printAds(data));
                $('.card-title').click(function() {
                    var name = $(this).attr("name");
                    $('#modal-title').html(data[name].titolo);
                    $('#modal-description').html(data[name].descrizione);
                    $("#image-modal").attr("src",data[name].image);
                    //$('#modal-image').html("<img src = \"" + data[name].image + "\"class = \"img-fluid w-100\" alt = \"Responsive image\" >");
                    $('#myModal').modal('show');
                    $('#heart').click(function() {
                        $('#heart').addClass("heartclicked")
                    });
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.statusText);
                swal("Attenzione!", "Controlla le informazioni e riprova!", "error");
            }
        });
    }catch(error){
        console.log(error.message);
    }

});

$("#logoutBtn").click(function(){
    Cookies.remove();
    location.replace('index.html');
});

$("#openModalButton").click(function() {
    $('#myModal').modal('show');
});
$("#closeModalButton").click(function() {
    $('#myModal').modal('hide');
});

$("#closeModal").click(function() {
    $('#myModal').modal('hide');
});
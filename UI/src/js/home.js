$( document ).ready(function() {

    if(Cookies.get('auth') == undefined || Cookies.get('username') == undefined){
        Cookies.remove();
        location.replace('index.html');
    }else{
        try{
            $.get({
                url: 'http://localhost:8087/annunci/ads',
                type: "GET", /* or type:"GET" or type:"PUT" */
                contentType: 'application/json',
                Accept: '*/*',
                headers: {
                    Authorization: Cookies.get('auth'),
                    username: Cookies.get('username')
                },
                success: function (data, textStatus, request) {
                    var mainbody = $("#mainbody");
                    mainbody.append(printAds(data));
                    $('.card-title').click(function() {
                        var name = $(this).attr("name");
                        var splitted = name.split(";");
                        var index = splitted[0];
                        var id = splitted[1];
                        $('#modal-title').html(data[index].titolo);
                        $('#modal-description').html(data[index].descrizione);
                        $("#image-modal").attr("src",data[index].image);
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

    $("#logoutBtn").click(function(){
        Cookies.remove();
        location.replace('index.html');
    });
});










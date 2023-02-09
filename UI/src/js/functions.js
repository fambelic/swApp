function convertToBase64(input) {
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = function () {
        const base64 = reader.result;
        console.log(base64);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

$("#logoutBtn").click(function(){
    Cookies.remove('username');
    location.replace('index.html');
});
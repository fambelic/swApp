$("#logoutBtn").click(function(){
    Cookies.remove();
    location.replace('index.html');
});


function printAds(data){
    var result = "<div class=\"row\">";
    for (let i = 0; i < data.length; i++) {
        if (i % 3 == 0) {result += "<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
            "        <div class=\"card\">\n" +
            "          <div class=\"bg-image hover-zoom ripple ripple-surface ripple-surface-light\"\n" +
            "               data-mdb-ripple-color=\"light\">\n" +
            "            <img src=" + data[i].image +
            "                 class=\"w-100\" />\n" +
            "            <a href=\"#!\">\n" +
            "            </a>\n" +
            "          </div>\n" +
            "          <div class=\"card-body\">\n" +
            "            <a  class=\"text-reset text-decoration-none\">\n" +
            "              <h5 name = "+ i + " class=\"card-title mb-3\"  >"+ data[i].titolo +  "</h5>\n" +
            "            </a>\n" +
            "            <a class=\"text-reset text-decoration-none\">\n" +
            "              <p>" + data[i].categorie + "</p>\n" +
            "            </a>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "      </div>"
            //mainbody.append("<div class=\"row\">");
        }else if (i % 3 != 0) {
            result += "<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
                "        <div class=\"card\">\n" +
                "          <div class=\"bg-image hover-zoom ripple ripple-surface ripple-surface-light\"\n" +
                "               data-mdb-ripple-color=\"light\">\n" +
                "            <img src=" + data[i].image + " id = "+ data[i].id +
                "                 class=\"w-100\" />\n" +
                "            <a>\n" +
                "            </a>\n" +
                "          </div>\n" +
                "          <div class=\"card-body\">\n" +
                "            <a class=\"text-reset text-decoration-none\">\n" +
                "              <h5 name = "+ i + " class=\"card-title mb-3\"  >"+ data[i].titolo +  "</h5>\n" +
                "            </a>\n" +
                "            <a href=\"\" class=\"text-reset text-decoration-none\">\n" +
                "              <p>" + data[i].categorie + "</p>\n" +
                "            </a>\n" +
                "          </div>\n" +
                "        </div>\n" +
                "      </div>";
        }
    }
    return result;
}


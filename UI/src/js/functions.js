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
            "              <h5 name = "+ i + ";" + data[i].id + " class=\"card-title mb-3\"  >"+ data[i].titolo +  "</h5>\n" +
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
                "              <h5 name = "+ i + ";" + data[i].id + " class=\"card-title mb-3\"  >"+ data[i].titolo +  "</h5>\n" +
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


function printRelatedAds(data){
    var result = "<div  class=\"row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center\">";
    for (let i = 0; i < data.length; i++) {
        if (i % 3 == 0) {
            result += "<div className=\"col mb-5\">\n" +
                "                <div className=\"card h-100\">\n" +
                "                    <!-- Product image-->\n" +
                "                    <img className=\"card-img-top\" src=\"" + data[i].image + " \"/>" +
                "                    <div className=\"card-body p-4\">\n" +
                "                        <div className=\"text-center\">\n" +
                "                            <h5 className=\"fw-bolder\">"+ data[i].titolo +"</h5>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div className=\"card-footer p-4 pt-0 border-top-0 bg-transparent\">\n" +
                "                        <div className=\"text-center\"><a className=\"btn btn-outline-dark mt-auto\" href=\"#\">Apri</a></div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>"

            //mainbody.append("<div class=\"row\">");
        }else if (i % 3 != 0) {
            result += "<div className=\"col mb-5\">\n" +
                "                <div className=\"card h-100\">\n" +
                "                    <!-- Product image-->\n" +
                "                    <img className=\"card-img-top\" src=\"" + data[i].image +" \"/>"+
                "                    <!-- Product details-->\n" +
                "                    <div className=\"card-body p-4\">\n" +
                "                        <div className=\"text-center\">\n" +
                "                            <!-- Product name-->\n" +
                "                            <h5 className=\"fw-bolder\">"+ data[i].titolo +"</h5>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <!-- Product actions-->\n" +
                "                    <div className=\"card-footer p-4 pt-0 border-top-0 bg-transparent\">\n" +
                "                        <div className=\"text-center\"><a className=\"btn btn-outline-dark mt-auto\" href=\"#\">Apri</a></div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>";
        }
    }
    return result;
}



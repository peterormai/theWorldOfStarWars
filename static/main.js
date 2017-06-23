var url = "http://swapi.co/api/planets/";
$.get({
    url: url,
    success: function(returnData) {

    var name = returnData.results;
    firstTenPlanets = name;

    },
    dataType: "json"
}).done(function() {
    var firstOne = firstTenPlanets[0].name
    document.getElementById("tableDiv").innerText = firstOne;
});





// https://api.jquery.com/jquery.get/
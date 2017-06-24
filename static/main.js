var url = "http://swapi.co/api/planets/";
$.get({
    url: url,
    success: function(returnData) {

    var name = returnData.results;
    firstTenPlanets = name;

    },
    dataType: "json"
}).done(function() {
    for(var i = 0; i < 10; i++) {
        var name = firstTenPlanets[i].name;
        var diameter = firstTenPlanets[i].diameter;
        var climate = firstTenPlanets[i].cllimate;
        var terrain = firstTenPlanets[i].terrain;
        var surface = firstTenPlanets[i].surface;
        var population = firstTenPlanets[i].population;

        var planetDataList = [name, diameter, climate, terrain, surface, population];

        generateElement(planetDataList, i);
    }
    

    // document.getElementById("tableDiv").innerText = firstOne;
});





// https://api.jquery.com/jquery.get/
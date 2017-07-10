function getPlanets(url) {
    allPlanets = [];
    allResidentsUrlList = [];
    nextPlanets = "";
    prevPlanets = "";
    $.get({
        url: url,
        success: function(returnData) {
        chosenPlanets = returnData.results;
        nextPlanets = returnData.next;
        prevPlanets = returnData.previous;
        },
        dataType: "json"

    }).done(function() {
        for(var i = 0; i < chosenPlanets.length; i++) {
            var name = chosenPlanets[i].name;
            var diameter = chosenPlanets[i].diameter;
            var climate = chosenPlanets[i].climate;
            var terrain = chosenPlanets[i].terrain;
            var surface = chosenPlanets[i].surface_water;
            var population = chosenPlanets[i].population;
            var residentsUrlList = chosenPlanets[i].residents;
            var resident = '';

            if (residentsUrlList.length === 0){
                resident = 'No known residents';
            } else {
                resident = residentsUrlList.length + ' residents';
            }

            var planetDataList = [name, diameter, climate, terrain, surface, population, resident];
            allPlanets.push(planetDataList);  
            allResidentsUrlList.push(residentsUrlList); 
        }
        generateElement(allPlanets);  
    })
}


function getResidentDatas (buttonId) {
    var async_request=[];
    var chosenPlanetResidentsDatas=[];
    var residentsUrlList = allResidentsUrlList[buttonId];
    for (var k = 0; k < residentsUrlList.length; k++) {
        var residentUrl = residentsUrlList[k];
        async_request.push($.ajax({
            url:residentUrl, 
            method:'get', 
            success: function(data){
                chosenPlanetResidentsDatas.push(data);
            }
        }));
    }
    $.when.apply(null, async_request).done( function(){
        for (var y = 0; y < async_request.length; y++) {
            var residentDatas = chosenPlanetResidentsDatas[y]

            var name = residentDatas.name;
            var height = residentDatas.height;
            var mass  = residentDatas.mass;
            var skinColor = residentDatas.skin_color;
            var hairColor = residentDatas.hair_color;
            var eyeColor = residentDatas.eye_color;
            var birthYear = residentDatas.birth_year;
            var gender = residentDatas.gender;

            planetDataList = [name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender];
            generateElementToResidents(planetDataList, y)
        }
    });
}


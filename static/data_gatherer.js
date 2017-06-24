function getPlanets() {
    var url = "http://swapi.co/api/planets/";

    $.get({
        url: url,
        success: function(returnData) {
        var firstTenPlanets = returnData.results;
        },
        dataType: "json"

    }).done(function() {
        for(var i = 0; i < 10; i++) {
            var name = firstTenPlanets[i].name;
            var diameter = firstTenPlanets[i].diameter;
            var climate = firstTenPlanets[i].climate;
            var terrain = firstTenPlanets[i].terrain;
            var surface = firstTenPlanets[i].surface_water;
            var population = firstTenPlanets[i].population;
            var residentsUrlList = firstTenPlanets[i].residents;
            var resident = ''

            if (residentsUrlList.length === 0){
                resident= 'No known residents';
            } else {
                resident = residentsUrlList.length + ' residents';
            }

            var planetDataList = [name, diameter, climate, terrain, surface, population, resident];

            generateElement(planetDataList, i);
        }
    });
}


function getPlanetResidentsDatas(residentsUrlList) {
    for(var j = 0; 0 < residentsUrlList.length; i++) {
        var url = residentUrlList[j]

        $.get({
            url: url,
            success: function(returnData) {
                var residentDatas = returnData.results;
                },
            dataType: "json"

        }).done(function() {
            name = residentDatas.name;
            height = residentDatas.height;
            mass  = residentDatas.mass;
            skinColor = residentDatas.skin_color;
            hairColor = residentDatas.hair_color;
            eyeColor = residentDatas.eye_color;
            birthYear = residentDatas.birth_year;
            gender = residentDatas.gender;

            var planetDataList = [name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender];
            generateElement(planetDataList, i);
        })
        
        }
    });
}
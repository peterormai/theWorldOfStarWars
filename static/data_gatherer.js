function getPlanets() {
    var url = "http://swapi.co/api/planets/";
    allPlanets = []
    $.get({
        url: url,
        success: function(returnData) {
        firstTenPlanets = returnData.results;
        },
        dataType: "json"

    }).done(function() {
        var async_request=[];
        var allPlanetResidentsDatas=[];
        for(var i = 0; i < 10; i++) {
            var name = firstTenPlanets[i].name;
            var diameter = firstTenPlanets[i].diameter;
            var climate = firstTenPlanets[i].climate;
            var terrain = firstTenPlanets[i].terrain;
            var surface = firstTenPlanets[i].surface_water;
            var population = firstTenPlanets[i].population;
            var residentsUrlList = firstTenPlanets[i].residents;
            var resident = '';

            if (residentsUrlList.length === 0){
                resident = 'No known residents';
            } else {
                resident = residentsUrlList.length + ' residents';
            }

            var planetDataList = [name, diameter, climate, terrain, surface, population, resident];
            allPlanets.push(planetDataList);

            for (var k = 0; k < residentsUrlList.length; k++) {
                var residentUrl = residentsUrlList[k];
                async_request.push($.ajax({
                    url:residentUrl, 
                    method:'get', 
                    success: function(data){
                        allPlanetResidentsDatas.push(data);
                    }
                }));
            }
        }
        generateElement(allPlanets);


        

        $.when.apply(null, async_request).done( function(){
            for (var y = 0; y < 10; y++) {
                var residentDatas = allPlanetResidentsDatas[y]

                var name = residentDatas.name;
                var height = residentDatas.height;
                var mass  = residentDatas.mass;
                var skinColor = residentDatas.skin_color;
                var hairColor = residentDatas.hair_color;
                var eyeColor = residentDatas.eye_color;
                var birthYear = residentDatas.birth_year;
                var gender = residentDatas.gender;
                debugger;

                planetDataList = [name, height, mass, skinColor, hairColor, eyeColor, birthYear, gender];
                generateElementToResidents(planetDataList, y)
            }
        });
    })
}
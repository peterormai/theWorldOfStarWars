function main() {
    var url = "https://swapi.co/api/planets/";
    getPlanets(url);

    $("#next").click( function () {
        if (nextPlanets != null) {
            clearPlanets();
            var url = nextPlanets;
            getPlanets(url);
        }
    })

    $("#previous").click( function () {
        if (prevPlanets != null) {
            clearPlanets();
            var url = prevPlanets;
            getPlanets(url);
        }
    })
}

$(document).ready(main);

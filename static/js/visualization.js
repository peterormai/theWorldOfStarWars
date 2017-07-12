function visualization(buttonId) {
    clearModal();
    var residentsModal = $('#residentsModal').get(0);
    
    $( "#" + buttonId ).click(function() {
        residentsModal.style.display = "block";
        getResidentDatas(buttonId);
    })

    $( ".residentsClose" ).click(function() {
        residentsModal.style.display = "none";
        clearModal();
    })

    $( window ).click(function() {
        if (event.target === residentsModal) {
            residentsModal.style.display = "none";
            clearModal();
        }
    })
}


function clearModal() {
    $("#residents").empty();
}


function clearPlanets() {
    $("#planets").empty();
}
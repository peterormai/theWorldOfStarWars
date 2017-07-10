function visualization(buttonId) {
    clearModal()
    var residentsModal = document.getElementById('residentsModal');
    var residentsButton = document.getElementById(buttonId);
    var residentsClose = document.getElementsByClassName("residentsClose")[0];
    residentsButton.onclick = function() {
        residentsModal.style.display = "block";
        getResidentDatas (buttonId)
    }
    residentsClose.onclick = function() {
        residentsModal.style.display = "none";
        clearModal()
    }
    window.onclick = function(event) {
        if (event.target === residentsModal) {
            residentsModal.style.display = "none";
            clearModal()
        }
    }
}

function clearModal() {
    $("#residents").empty();
}

function clearPlanets() {
    $("#planets").empty();
}
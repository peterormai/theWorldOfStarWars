function visualization(buttonId) {
    var residentsModal = document.getElementById('residentsModal');
    var residentsButton = document.getElementById(buttonId);
    var residentsClose = document.getElementsByClassName("residentsClose")[0];
    residentsButton.onclick = function() {
        residentsModal.style.display = "block";
    }
    residentsClose.onclick = function() {
        residentsModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target === residentsModal) {
            residentsModal.style.display = "none";
        }
    }
}
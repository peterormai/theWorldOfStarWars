function generateElement(allDataList){
    for(var i = 0; i < allDataList.length; i++) {
        var dataList = allDataList[i];
        var rowId = "row" + i;
        var newTr = `<tr id="${rowId}"></tr>`;        
        $('#planets').append(newTr);

        for(var j = 0; j < dataList.length; j++) {

            if (j !== dataList.length - 1) {
                var newTd = `<td>${dataList[j]}</td>`;        
                $('#' + rowId).append(newTd);

            } else {
                var tdId = 'residents' + i;
                var newTd = `<td id="${tdId}"></td>`;        
                $('#' + rowId).append(newTd);
                
                if(dataList[j] === 'No known residents') {
                    $("#" + tdId).html(dataList[j]);

                } else {
                    var residentButton = `<button id="${i}" class="btn btn-default"> ${dataList[j]} </button>`;
                    $("#" + tdId).html(residentButton);
                    visualization(i);
                }
            }
        }
    }
}


function generateElementToResidents(dataList, rowNumber){
    var trId = 'resident' + rowNumber;
    var newTr = `<tr id="${trId}"></tr>`;        
    $('#residents').append(newTr);

    for(var l = 0; l < dataList.length; l++) {
        var newTd = `<td>${dataList[l]}</td>`;        
        $('#' + trId).append(newTd);
    }
}

 
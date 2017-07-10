function generateElement(allDataList){
    for(var i = 0; i < allDataList.length; i++) {
        var dataList = allDataList[i];
        var createdTr = document.createElement("TR");
        createdTr.setAttribute("id", "row" + i);
        document.getElementById("planets").appendChild(createdTr); 

        for(var j = 0; j < dataList.length; j++) {
            if (j !== dataList.length - 1) {
                var tdTextToInsert = document.createTextNode(dataList[j]);  
                var createdTd = document.createElement("TD");
                createdTd.appendChild(tdTextToInsert);                            
                document.getElementById("row" + i).appendChild(createdTd);
            } else {
                var createdTd = document.createElement("TD");                          
                createdTd.setAttribute("id", 'residents' + i);
                document.getElementById("row" + i).appendChild(createdTd);
                if(dataList[j] === 'No known residents') {
                    document.getElementById('residents' + i).innerHTML = dataList[j]
                } else {
                    buttonId = i;
                    document.getElementById('residents' + i).innerHTML = 
                                        '<button id=' + buttonId + ' class="btn btn-default">' + dataList[j] + '</button>';
                    visualization(buttonId) 
                }
            }
        }
    }
}


function generateElementToResidents(dataList, rowNumber){
    var createdTr = document.createElement("TR");
    createdTr.setAttribute("id", 'resident' + rowNumber);
    document.getElementById("residents").appendChild(createdTr); 

    for(var l = 0; l < dataList.length; l++) {
        tdToInsert = '<td>' + dataList[l] + '</td>';                         
        document.getElementById('resident' + rowNumber).innerHTML += tdToInsert;
    }
}

 
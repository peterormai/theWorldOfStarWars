function generateElement(allDataList){
    for(var i = 0; i < allDataList.length; i++) {
        var dataList = allDataList[i];

        var createdTr = document.createElement("TR");
        createdTr.setAttribute("id", i);
        document.getElementById("planets").appendChild(createdTr); 
        for(var j = 0; j < dataList.length; j++) {
                if (j !== dataList.length - 1) {
                    var tdTextToInsert = document.createTextNode(dataList[j]);  
                    var createdTd = document.createElement("TD");
                    createdTd.appendChild(tdTextToInsert);                            
                    document.getElementById(i).appendChild(createdTd);
                } else {
                    var createdTd = document.createElement("TD");                          
                    createdTd.setAttribute("id", 'residents' + i);
                    document.getElementById(i).appendChild(createdTd);
                    if(dataList[j] === 'No known residents') {
                        document.getElementById('residents' + i).innerHTML = dataList[j]
                    } else {
                        buttonId = "residentsButton" + i;
                        document.getElementById('residents' + i).innerHTML = 
                                            '<button id=' + buttonId + ' class="w3-button w3-circle w3-green">' + dataList[j] + '</button>';
                        visualization(buttonId) 
                    }
                }
            }

    }
}

function generateElementToResidents(dataList, rowNumber){
    debugger;
    var createdTr = document.createElement("TR");
    createdTr.setAttribute("id", 'resident' + rowNumber);
    document.getElementById("residents").appendChild(createdTr); 

    for(var j = 0; j < dataList.length; j++) {
        // var tdTextToInsert = document.createTextNode(dataList[j]);  
        // var createdTd = document.createElement("TD");
        // createdTd.appendChild(tdTextToInsert);   
        tdToInsert = '<td>' + dataList[j] + '</td>';                         
        document.getElementById('resident' + rowNumber).innerHTML = tdToInsert;
        }
}
function generateElement(dataList, rowNumber){
    var createdTr = document.createElement("TR");
    createdTr.setAttribute("id", rowNumber);
    document.getElementById("planets").appendChild(createdTr); 

    for(var j = 0; j < dataList.length; j++) {
            if (j !== dataList.length - 1) {
                var tdTextToInsert = document.createTextNode(dataList[j]);  
                var createdTd = document.createElement("TD");
                createdTd.appendChild(tdTextToInsert);                            
                document.getElementById(rowNumber).appendChild(createdTd);
            } else {
                var createdTd = document.createElement("TD");                          
                createdTd.setAttribute("id", 'residents' + rowNumber);
                document.getElementById(rowNumber).appendChild(createdTd);
                if(dataList[j] === 'No known residents') {
                    document.getElementById('residents' + rowNumber).innerHTML = dataList[j]
                } else {
                    buttonId = "residentsButton" + rowNumber;
                    document.getElementById('residents' + rowNumber).innerHTML = 
                                        '<button id=' + buttonId + ' class="w3-button w3-circle w3-green">' + dataList[j] + '</button>';
                    visualization(buttonId) 
                }
            }
        }
}


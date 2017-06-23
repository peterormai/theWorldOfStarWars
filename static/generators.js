function generateElement(dataList, rowNumber){
    debugger;
    var createdTr = document.createElement("TR");
    createdTr.setAttribute("id", rowNumber);
    document.getElementById("planets").appendChild(createdTr); 

    for(var j = 0; j < dataList.length; j++) {
        var tdTextToInsert = document.createTextNode(dataList[j]);  
        var createdTd = document.createElement("TD");
        createdTd.appendChild(tdTextToInsert);                            
        document.getElementById(rowNumber).appendChild(createdTd);
    }   
}

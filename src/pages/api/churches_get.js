function defineStructure() {

    addColumn("church");
    addColumn("States");
    addColumn("address");
    addColumn("balance");
    addColumn("language"); 
    
    setKey(["church","States","address","balance","language"]);
    addIndex(["church","States","address","balance","language"]);

}

function getDados() {

    var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("church");
    newDataset.addColumn("States");
    newDataset.addColumn("address");
    newDataset.addColumn("balance");
    newDataset.addColumn("language"); 

    for (var i = 0; i < oRetorno.churches.length; i++) {
        newDataset.addRow(new Array(
            oRetorno.churches[i].church,
            Retorno.churches[i].States,
            Retorno.churches[i].address,
            Retorno.churches[i].balance,
            Retorno.churches[i].language             
        ));
    }

}
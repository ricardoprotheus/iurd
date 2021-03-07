function defineStructure() {

    addColumn("states");
    addColumn("secretary");
    addColumn("stateleader");
    addColumn("spkspan");
    addColumn("spkengl");
    addColumn("spkport");

    setKey(["states","secretary","stateleader","spkspan","spkengl","spkport"]);
    addIndex(["states","secretary","stateleader","spkspan","spkengl","spkport"]);

}

function getDados() {

    try {
        var clientService = fluigAPI.getAuthorizeClientService();

        var compID = getValue("WKCompany");

        var data = {
            companyId: compID + '',
            serviceCode: 'roles',
            endpoint: '/WSROLES',
            method: 'get',                  // delete, patch, post, get
            timeoutService: '100',          // secounds
        };

        var response = clientService.invoke(JSON.stringify(data));
        log.info("<<< " + response);

        var newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("states");
        newDataset.addColumn("secretary");
        newDataset.addColumn("stateleader");
        newDataset.addColumn("spkspan");
        newDataset.addColumn("spkengl");
        newDataset.addColumn("spkport");
    
        
        for (var i = 0; i < oRetorno.roles.length; i++) {
            newDataset.addRow(new Array(
                oRetorno.roles[i].states,
                oRetorno.roles[i].secretary,
                oRetorno.roles[i].stateleader,
                oRetorno.roles[i].spkspan,
                oRetorno.roles[i].spkengl,
                oRetorno.roles[i].spkport        
            ));        
        }
    
    }

}
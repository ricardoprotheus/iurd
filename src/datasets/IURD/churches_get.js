function defineStructure() {

    addColumn("church");
    addColumn("States");
    addColumn("address");
    addColumn("balance");
    addColumn("idiom");
    
    setKey(["church", "States", "address", "balance", "idiom"]);
    addIndex(["church", "States", "address", "balance", "idiom"]);
}

function getDados() {
	
    try {

        var clientService = fluigAPI.getAuthorizeClientService();

        var compID = getValue("WKCompany");

        var data = {
            companyId: compID + '',
            serviceCode: 'churches',
            endpoint: '/WSGETCHURCH',
            method: 'get', 						// 'delete', 'patch', 'post', 'get'                                        
            timeoutService: '100', 					// segundos
            
        }
        
        var response = clientService.invoke(JSON.stringify(data));
        
        log.info("<<< " + response);

        /*
        var newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("status");
        newDataset.addColumn("message");
        newDataset.addRow(new Array("AE","AEE"));	
        */

        var newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("church");
        newDataset.addColumn("States");
        newDataset.addColumn("address");
        newDataset.addColumn("balance");
        newDataset.addColumn("idiom");

        if (response.getResult() == null || response.getResult().isEmpty()) {
            newDataset.addRow(new Array("Error", "It was not possible to connect to Rest", ""));
        } else {
            log.info("<<<+ " + response.getResult());
            var oRetorno = JSON.parse(response.getResult());

            for (var i = 0; i < oRetorno.churches.length; i++) {
                newDataset.addRow(new Array(
                        oRetorno.churches[i].church, 
                        oRetorno.churches[i].state, 
                        oRetorno.churches[i].address, 
                        oRetorno.churches[i].balance,
                        oRetorno.churches[i].idiom
                ));
            }

        }

        return newDataset;

    } catch (e) {
        // TODO: handle exception
        log.info('<<< FRE ### ERRO: ' + e)
    }
}

function onSync(lastSyncDate) {

    return getDados();
}

function createDataset(fields, constraints, sortFields) {

    return getDados();
}

function defineStructure() {

    addColumn("code");
    addColumn("descri");

    setKey(["code", "descri"]);
    addIndex(["code", "descri"]);
}

function getDados() {

    try {

        var clientService = fluigAPI.getAuthorizeClientService();
	
	var compID = getValue("WKCompany");
	
	var data = {
			companyId :  compID + '',
			serviceCode : 'classes',
			endpoint : '/WSCLASSES',
			method : 'get', 						// 'delete', 'patch', 'post', 'get'                                        
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
	newDataset.addColumn("code");
	newDataset.addColumn("descri");
	
	if(response.getResult()== null || response.getResult().isEmpty()){
		newDataset.addRow(new Array("Error","It was not possible to connect to Rest",""));			
	}else{			
		log.info("<<<+ " + response.getResult());
		var oRetorno = JSON.parse(response.getResult());
		
		for (var i = 0; i < oRetorno.classes.length; i++) {
			newDataset.addRow(new Array(oRetorno.classes[i].code,oRetorno.classes[i].descri));
		}
			
	}
	
	
	return newDataset;

    } catch (e) {
        // TODO: handle exception
        log.info('FRE ### ERRO: ' + e)
    }
}

function onSync(lastSyncDate) {

    return getDados();
}

function createDataset(fields, constraints, sortFields) {

    return getDados();
}

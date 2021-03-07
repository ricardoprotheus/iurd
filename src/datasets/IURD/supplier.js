function defineStructure() {

	addColumn("code");
	addColumn("unit");
	addColumn("name");

	setKey(["code","unit","name"]);
	addIndex(["code","unit","name"]);
}

function getDados() {

	try {

		var clientService = fluigAPI.getAuthorizeClientService();
	
		var compID = getValue("WKCompany");
		
		var data = {
				companyId :  compID + '',
				serviceCode : 'supplier',
				endpoint : '/WSSUPPLIER',
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
		newDataset.addColumn("unit");
		newDataset.addColumn("name");
		
		
		if(response.getResult()== null || response.getResult().isEmpty()){
			newDataset.addRow(new Array("Error","It was not possible to connect to Rest",""));			
		}else{			
			log.info("<<<+ " + response.getResult());
			var oRetorno = JSON.parse(response.getResult());
			
			for (var i = 0; i < oRetorno.suppliers.length; i++) {
				newDataset.addRow(new Array(oRetorno.suppliers[i].code,oRetorno.suppliers[i].unit,oRetorno.suppliers[i].name));
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

function defineStructure() {
	
	addColumn("position");
	addColumn("days");
	addColumn("description");
	
	setKey([ "description" ]);
	addIndex(["description"]);
	addIndex(["description","days"]);
}

function getDados() {

	try {

		var clientService = fluigAPI.getAuthorizeClientService();
	
		var compID = getValue("WKCompany");
		
		var data = {
				companyId :  compID + '',
				serviceCode : 'terms',
				endpoint : '/WSTERMS',
				method : 'get', 						// 'delete', 'patch', 'post', 'get'                                        
				timeoutService: '100', 					// segundos
		}
		
		var response = clientService.invoke(JSON.stringify(data));

		log.info("<<< " + response);
		
		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("position");
		newDataset.addColumn("days");
		newDataset.addColumn("description");
		
		if(response.getResult()== null || response.getResult().isEmpty()){
			newDataset.addRow(new Array("Error","It was not possible to connect to Rest",""));			
		}else{			
			log.info("<<<+ " + response.getResult());
			var oRetorno = JSON.parse(response.getResult());
			
			for (var i = 0; i < oRetorno.terms.length; i++) {
				newDataset.addRow(new Array(oRetorno.terms[i].position,oRetorno.terms[i].days,oRetorno.terms[i].description));
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



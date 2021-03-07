function defineStructure() {

	addColumn("code");
	addColumn("description");

	setKey(["code", "description"]);
	addIndex(["code", "description"]);
}

function getDados() {

	try {

		var clientService = fluigAPI.getAuthorizeClientService();
	
		var compID = getValue("WKCompany");
		
		var data = {
				companyId :  compID + '',
				serviceCode : 'products',
				endpoint : '/WSPRODUCTS',
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
		newDataset.addColumn("description");
		
		if(response.getResult()== null || response.getResult().isEmpty()){
			newDataset.addRow(new Array("Error","It was not possible to connect to Rest",""));			
		}else{			
			log.info("<<<+ " + response.getResult());
			var oRetorno = JSON.parse(response.getResult());
			
			for (var i = 0; i < oRetorno.products.length; i++) {
				newDataset.addRow(new Array(oRetorno.products[i].code,oRetorno.products[i].description));
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



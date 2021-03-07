function defineStructure() {

	addColumn("item");
	addColumn("produto");
	addColumn("valor");

	setKey(["item", "produto","valor"]);
	addIndex(["item", "produto","valor"]);
}

function getDados() {

	try {

		var clientService = fluigAPI.getAuthorizeClientService();

		var compID = getValue("WKCompany");

		var data = {
			companyId: compID + '',
			serviceCode: 'clientes',
			endpoint: '/WSRESTA1',
			method: 'get', 						// 'delete', 'patch', 'post', 'get'                                        
			timeoutService: '100', 					// segundos
		}

		//log.info("<<< Passou aqui no cliente_rest_get.js!");

		var response = clientService.invoke(JSON.stringify(data));

		log.info("<<< " + response);

		var newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("item");
		newDataset.addColumn("produto");
		newDataset.addColumn("valor");

		if (response.getResult() == null || response.getResult().isEmpty()) {
			newDataset.addRow(new Array("Erro", "Nao foi possivel conectar no Rest", ""));
		} else {
			log.info("<<<+ " + response.getResult());
			var oRetorno = JSON.parse(response.getResult());

			for (var i = 0; i < oRetorno.clients.length; i++) {
				newDataset.addRow(new Array(oRetorno.clients[i].unit, oRetorno.clients[i].name, oRetorno.clients[i].id));
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


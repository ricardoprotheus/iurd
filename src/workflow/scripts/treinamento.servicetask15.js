function servicetask15(attempt, message) {
	
	var clientService = fluigAPI.getAuthorizeClientService();
	
	var compID 	= getValue("WKCompany");
	var aNotas 	= new Array();
	var qtdItens= hAPI.getCardValue("linha_produto"); //verificando a quantidade de linhas do grid
	var filial	= hAPI.getCardValue("filial"); //verificando a quantidade de linhas do grid
	/*
	 * começa na linha 1, porque nao grid nao tem linha zero.
	 */
	for (var i = 1; i <= qtdItens; i++) {
		var produto = hAPI.getCardValue("produto___"+i);
		//verificamos se produto é null, porque a linha pode ter sido apagada.
		if(produto != null){
			var oItem = {
					DOC: filial + '', 		//sempre colocar + e aspas simples depois da variavel 
			        PRODUTO: produto + ''
			};
			
			aNotas.push(oItem);
		}
	}
	
	var data = {
			companyId :  compID + '',
			serviceCode : 'clientes',
			endpoint : '/NOTAENTRADA',
			method : 'post', 						// 'delete', 'patch', 'post', 'get'                                        
			timeoutService: '100', 					// segundos
			params : {
				notas:  aNotas
			}
	}
	
	var response = clientService.invoke(JSON.stringify(data));
	
	
	log.info("<<< " + response);
	
	if(response.getResult()== null || response.getResult().isEmpty()){
		throw "ERRO TESTE";			
	}else{			
		log.info("<<<+ " + response.getResult());
		var oRetorno = JSON.parse(response.getResult());
		
		var cRetorno = oRetorno.MENSAGEM; //verificando se a resposta é ok ou nao.
		if(cRetorno.trim() != "OK"){
			throw response.getResult(); //SE ERRO, PARO O PROCESSO COM O THROW.
		}
		
		//SE NAO DEU ERRO, A ATIVIDADE É MOVIDA.
		
	}
	
}
function servicetask44(attempt, message) {
	
	var clientService 	= fluigAPI.getAuthorizeClientService();
	var compID 			= getValue("WKCompany");
	var churchs			= new Array();
	var qtdChurchs		= hAPI.getCardValue("linha_church"); //verificando a quantidade de linhas do grid
	var optChurch		= hAPI.getCardValue("rateioChurch"); 
	var supplier 		= hAPI.getCardValue("txt_supplier"); //hAPI.getCardValue("zoom_company");  
	var unit			= hAPI.getCardValue("txt_unit");
	var number			= hAPI.getCardValue("invoiceNumber");
	var processFluig	= hAPI.getCardValue("hd_numProcesso"); 	
	var total 			= hAPI.getCardValue("txt_gran_total");
	var notes			= hAPI.getCardValue("comments");
	var installment		= hAPI.getCardValue("txt_installment");
	var department		= hAPI.getCardValue("txt_department_code"); //hAPI.getCardValue("zoom_department");
	var glCode			= hAPI.getCardValue("gl_code"); //hAPI.getCardValue("classes");
	var relatorio		= hAPI.getCardValue("name_report");
	var firstInstall	= hAPI.getCardValue("dataInstallment");
	var term 			= hAPI.getCardValue("txt_term_days");
	var feeValue		= hAPI.getCardValue("installfee");
	var feeDate			= hAPI.getCardValue("dataInstallFee");
	var aIgrejas		= new Array();
	var igreja 			= "";
	var percentual 		= "";
	var oItem			= new Array();
	var oTitulos		= new Array();
	var vlrParcelas		= hAPI.getCardValue("txt_amount");
	var aGlCode			= new Array();
	var oItemGlCode		= new Array();
	
	//formatando os valores, tirando a virgula - isto por causa da mascara. 
	total 		= total.replace(",","");
	feeValue	= feeValue.replace(",","");
	vlrParcelas	= vlrParcelas.replace(",","");
	
	/*
	 * começa na linha 1, porque nao grid nao tem linha zero.
	 */
	
	if (optChurch == "yes") { 
		for (var i = 1; i <= qtdChurchs; i++) {
			igreja 		= hAPI.getCardValue("requesting_church_grid___"+i);
			percentual 	= hAPI.getCardValue("txt_percent_grid___"+i);
			//verificamos se produto é null, porque a linha pode ter sido apagada.
			if(igreja != null){
				oItem = {
						CODE: igreja + '', 		//sempre colocar + e aspas simples depois da variavel 
				        PERCENTUAL: percentual + ''
				};
				
				aIgrejas.push(oItem);
			}
		}
	}else{
		igreja 		= hAPI.getCardValue("zoom_igreja");
		percentual 	= "100"; //100% quando nao tiver rateio.
		oItem = {
				CODE: igreja + '', 		//sempre colocar + e aspas simples depois da variavel 
		        PERCENTUAL: percentual + ''
		};
		
		aIgrejas.push(oItem);
	}
	
	//ALTERADO BRUNO - 20200610 - ADICIONADO OBJETO ARRAY DE GL CODE, POR CAUSA DO REPORT EXPENSES (para mantermos o consumo do mesmo endpoint). 
	percentual 	= "100"; //100% quando nao tiver rateio.
	oItemGlCode = {
			CODE: glCode + '', 		//sempre colocar + e aspas simples depois da variavel 
	        PERCENTUAL: percentual + ''
	};
	
	aGlCode.push(oItemGlCode);
	
	//ALTERADO BRUNO - 20200610 - FIM
	
	
	oTitulos = {
			SUPPLIER:supplier,
			UNIT:unit,
			NUMBER:number,
			PROCESSFLUIG:processFluig,
			TOTAL:total,
			NOTES:notes,
			INSTALLMENT:installment,
			DEPARTMENT:department,
			GLCODE:aGlCode,
			RELATORIO:relatorio,
			FIRSTINSTALL:firstInstall,
			TERM:term,
			FEEVALUE:feeValue,
			FEEDATE:feeDate,
			CHURCHES:aIgrejas,
			VLRPARCELA:vlrParcelas
	}
	
	
	var json = new org.json.JSONObject(oTitulos);
	var data = new org.json.JSONObject();

	data.put('companyId',compID + '');
	data.put('serviceCode','financial');
	data.put('endpoint','/ACCOUNTPAY');
	data.put('method','post');
	data.put('timeoutService','100');
	data.put('params',json);
	
	var response = clientService.invoke(data.toString());	
	log.info("<<< " + response);
	
	if(response.getResult()== null || response.getResult().isEmpty()){
		throw "ERRO - EMPTY RETURN - CHECK THE CONNECTION WITH THE TOTVS REST!";			
	}else{		
		log.info("<<<+ " + response.getResult());
		var oRetorno = new org.json.JSONObject(response.getResult());
		
		var cRetorno = oRetorno.getString("MENSAGEM"); //verificando se a resposta é ok ou nao.
		if(cRetorno.trim() != "OK"){
			throw response.getResult(); //SE ERRO, PARO O PROCESSO COM O THROW.
		}
		
		//SE NAO DEU ERRO, A ATIVIDADE É MOVIDA.
		
	}
	/*
	var data = {
			companyId :  compID + '',
			serviceCode : 'financial',
			endpoint : '/ACCOUNTPAY',
			method : 'post', 						// 'delete', 'patch', 'post', 'get'                                        
			timeoutService: '100', 					// segundos
			params : {
				notas:  aNotas
			}
	}
	
	var response = clientService.invoke(JSON.stringify(data));
	
	
	log.info("<<< " + response);
	
	if(response.getResult()== null || response.getResult().isEmpty()){
		
		log.info("<<< BRUNO - OCORREU ERRO NO CONSUMO DO WS >>>>");
		
		throw "ERRO TESTE";			
	}else{		
		
		
		log.info("<<< BRUNO - PASSOU PELO CONSUMO DO WS >>>>");
		
		
		log.info("<<<+ " + response.getResult());
		var oRetorno = JSON.parse(response.getResult());
		
		var cRetorno = oRetorno.MENSAGEM; //verificando se a resposta é ok ou nao.
		if(cRetorno.trim() != "OK"){
			throw response.getResult(); //SE ERRO, PARO O PROCESSO COM O THROW.
		}
		
		//SE NAO DEU ERRO, A ATIVIDADE É MOVIDA.
		
	}
	*/
	
}
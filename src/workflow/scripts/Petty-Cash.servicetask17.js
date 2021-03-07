function servicetask17(attempt, message) {
	
	var clientService 	= fluigAPI.getAuthorizeClientService();
	var compID 			= getValue("WKCompany");
	var churchs			= new Array();
	var supplier 		= hAPI.getCardValue("txt_supplier"); //hAPI.getCardValue("zoom_supplier"); 
	var unit			= hAPI.getCardValue("txt_unit");
	var processFluig	= hAPI.getCardValue("hd_numProcesso");
	var number			= ""; //hAPI.getCardValue("invoiceNumber"); //alterado 20200731 - CLIENTE SOLICITOU QUE O NUMERO DO TITULO SEJA O MESMO NUMERO DO FLUIG.
	var total 			= hAPI.getCardValue("txt_total");
	var notes			= hAPI.getCardValue("notas");
	var installment		= "1"//hAPI.getCardValue("txt_installment");
	var department		= hAPI.getCardValue("txt_department_code"); //hAPI.getCardValue("zoom_department");
	var relatorio		= hAPI.getCardValue("name_report");
	//var firstInstall	= hAPI.getCardValue("dataInstallment");
	var term 			= "1" //hAPI.getCardValue("txt_term_days");
	var feeValue		= ""; //hAPI.getCardValue("installfee");
	var feeDate			= "";//hAPI.getCardValue("dataInstallFee");
	var aIgrejas		= new Array();
	var igreja 			= "";
	var percentual 		= "";
	var oItem			= new Array();
	var oTitulos		= new Array();
	var vlrParcelas		= ""; //hAPI.getCardValue("txt_pagamentoPrograma");
	var aGlCode			= new Array();
	var oItemGlCode		= new Array();
	var glCode			= "";
	
		
	var dtNow 			= new java.util.Date();
	var sdf 			= new java.text.SimpleDateFormat("MM/dd/yyyy");
	var firstInstall 	= sdf.format(dtNow);
	
	
	//formatando os valores, tirando a virgula - isto por causa da mascara. 
	total 		= total.replace(",","");
	//feeValue	= feeValue.replace(",","");
	//vlrParcelas	= vlrParcelas.replace(",","");
	
	igreja 		= hAPI.getCardValue("zoom_igreja");
	percentual 	= "100"; //100% quando nao tiver rateio.
	oItem = {
			CODE: igreja + '', 		//sempre colocar + e aspas simples depois da variavel 
	        PERCENTUAL: percentual + ''
	};
	
	aIgrejas.push(oItem);

	
	glCode		= hAPI.getCardValue("gl_code");
	percentual 	= "100"; //100% quando nao tiver rateio.
	oItemGlCode = {
			CODE: glCode + '', 		//sempre colocar + e aspas simples depois da variavel 
	        PERCENTUAL: percentual + ''
	};
	
	aGlCode.push(oItemGlCode);

	
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
		throw "ERROR - EMPTY RETURN";			
	}else{		
		log.info("<<< response.getResult(): " + response.getResult());
		
		var cRetorno = getResposta(response.getResult());
		
		if(cRetorno.trim() != "OK"){	
			throw cRetorno; //SE ERRO, PARO O PROCESSO COM O THROW.
		}
		
		//SE NAO DEU ERRO, A ATIVIDADE É MOVIDA.
		
	}
}

function getResposta(cResult){
	var cRet	= "";
	var cMsgIT	= "Please, contact the IT Team.";
	var lValido	= true;
	
	try{
		var oRetorno = new org.json.JSONObject(cResult);
	}catch(e){
		lValido = false;
	}
	
	if (lValido){
		if(cResult.indexOf("MENSAGEM") != -1 ){
			cRet = oRetorno.getString("MENSAGEM");
		}else if(cResult.indexOf("errorMessage") != -1){
			if(cResult.indexOf("errorCode")){
				cRet	= "Rest Message: "+oRetorno.getString("errorMessage").trim() + " - Rest Code: " +oRetorno.getInt("errorCode");
			}else{
				cRet	= "Rest Message: "+oRetorno.getString("errorMessage").trim();
			}
			cRet += " - "+cMsgIT;
		}else{	
			cRet = cResult.trim() + " - " +cMsgIT;
		}
	}else{
		cRet = "It was not possible to read the Json: "+cResult;
		log.info("<<< "+cRet);
	}
	
	return cRet
}
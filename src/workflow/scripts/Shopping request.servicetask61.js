function servicetask61(attempt, message) {
	
	var clientService = fluigAPI.getAuthorizeClientService();
	var compID 	= getValue("WKCompany");
	var dados 	= hAPI.getCardValue("hd_json");
	
	var json = new org.json.JSONObject(dados);
	var data = new org.json.JSONObject();

	data.put('companyId',compID + '');
	data.put('serviceCode','NotaEntrada');
	data.put('endpoint','/NOTAENTRADA');
	data.put('method','post');
	data.put('timeoutService','100');
	data.put('params',json);

	// var data = {
	// 	companyId: compID + '',
	// 	serviceCode: 'NotaEntrada',
	// 	endpoint: '/NOTAENTRADA',
	// 	method: 'post',
	// 	timeoutService: '100',
	// 	params: JSON.parse(dados)
	// }
	
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

function getValFormated(number){
	if (number != null && number != ""){
		number	= number.replace(",","");
	}
	return number;
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
function servicetask51(attempt, message) {
	var clientService 	= fluigAPI.getAuthorizeClientService();
	var compID 			= getValue("WKCompany");
	var churchs			= new Array();
	var relatorio		= hAPI.getCardValue("name_report");
	var qtdChurchs		= hAPI.getCardValue("linha_church"); //verificando a quantidade de linhas do grid
	var optChurch		= hAPI.getCardValue("rateioChurch");
	var supplier 		= hAPI.getCardValue("hd_supplierCode"); 
	var unit			= hAPI.getCardValue("supplierUnit");
	var processFluig	= hAPI.getCardValue("hd_numProcesso");
	//var codMun			= hAPI.getCardValue("hd_issueCity");
	//var provent			= hAPI.getCardValue("hd_deliveryCity");
	var cond			= hAPI.getCardValue("hd_paymentTerm");
	var invoice			= hAPI.getCardValue("invoiceNumber");
	var payMethod		= hAPI.getCardValue("rd_check");
	var totalNF			= getValFormated(hAPI.getCardValue("txt_totalValue"));
	var church			= hAPI.getCardValue("hd_requesting_church");
	var bank			= hAPI.getCardValue("hd_bank");
	var agency			= hAPI.getCardValue("hd_branch");
	var account			= hAPI.getCardValue("hd_acc");
	var department		= hAPI.getCardValue("hd_department");	
	var valFrete		= getValFormated(hAPI.getCardValue("txt_shippingCost"));
	var notes 			= hAPI.getCardValue("txt_notes");
	var qtdProdutos		= hAPI.getCardValue("linha_produto");
	var aProducts		= new Array();
	var oItemProduto	= new Array();
	var codProduto 		= ""; 
	var quantProdut 	= ""; 
	var vUnitProd		= "";
	var valDescProd		= "";
	var taxProd			= "";
	var totItemProd		= "";
	var tesProd			= "";	
	var glCodeProd		= "";	
	var aIgrejas		= new Array();
	var igreja 			= "";
	var percentual 		= "";
	var oItem			= new Array();
	var dados			= new Array();
	var dtNow 			= new java.util.Date();
	var sdf 			= new java.text.SimpleDateFormat("MM/dd/yyyy");
	var firstInstall 	= sdf.format(dtNow);
	
	for (var i = 1; i <= qtdProdutos; i++) {
		codProduto 	= hAPI.getCardValue("hd_requesting_product___"+i);  
		quantProdut = hAPI.getCardValue("txt_quantity___"+i);  
		vUnitProd	= getValFormated(hAPI.getCardValue("txt_unitValue___"+i)); 
		valDescProd	= getValFormated(hAPI.getCardValue("txt_discount___"+i)); 
		taxProd		= getValFormated(hAPI.getCardValue("txt_tax___"+i)); 
		totItemProd	= getValFormated(hAPI.getCardValue("hd_simpleTotal___"+i)); 
		tesProd		= hAPI.getCardValue("hd_inflowType___"+i); 	
		glCodeProd	= hAPI.getCardValue("hd_classes___"+i); 	  	
		
		//verificamos se produto é null, porque a linha pode ter sido apagada.
		if(codProduto != null){
			oItemProduto = {
					COD: codProduto + '', 		//sempre colocar + e aspas simples depois da variavel 
					QUANT: quantProdut + '',
					VUNIT: vUnitProd + '',
					VALDESC: valDescProd + '',
					TAX: taxProd + '',
					TOTALITEM: totItemProd + '',
					TES: tesProd + '',
					GLCODE: glCodeProd + ''
			};
			
			aProducts.push(oItemProduto);
		}
	}
	
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
	
	/*
	dados = {
			SUPPLIER:supplier,
			UNIT:unit,
			CODMUN:codMun,
			PROVENT:provent,
			COND:cond,
			INVOICE:invoice,
			PAYMETHOD:payMethod,
			PROCESSFLUIG:processFluig,
			TOTALNF:totalNF,
			CHURCH:church,
			BANK:bank,
			AGENCY:agency,
			ACCOUNT:account,
			DEPARTMENT:department,
			VALFRETE:valFrete,	
			NOTES:notes,
			RELATORIO:relatorio,
			PRODUCTS:aProducts,
			CHURCHES:aIgrejas
	}
	*/
	
	dados = {
			SUPPLIER:supplier,
			UNIT:unit,
			COND:cond,
			INVOICE:invoice,
			PAYMETHOD:payMethod,
			PROCESSFLUIG:processFluig,
			TOTALNF:totalNF,
			CHURCH:church,
			BANK:bank,
			AGENCY:agency,
			ACCOUNT:account,
			DEPARTMENT:department,
			VALFRETE:valFrete,	
			NOTES:notes,
			RELATORIO:relatorio,
			PRODUCTS:aProducts,
			CHURCHES:aIgrejas
	}
	
	var json = new org.json.JSONObject(dados);
	var data = new org.json.JSONObject();

	data.put('companyId',compID + '');
	data.put('serviceCode','NotaEntrada');
	data.put('endpoint','/NOTAENTRADA');
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
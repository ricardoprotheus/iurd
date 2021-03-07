function validateForm(form){
	
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_DPT_HEAD				= form.getValue("ATIV_DPT_HEAD");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_DPT_HEADER_FIM			= form.getValue("ATIV_DPT_HEADER_FIM");
	var tipoFormulario				= form.getValue("txt_tipoRequisicao");
	var dptHeadApproval				= form.getValue("rd_aprovGestor_dpt_head");
	
	if(enviar=="true"){
		if((activity == ATIV_INICIAL) || activity == "0"){
			erro += validSecretary(form);
		}else if(activity == ATIV_STATE_LEADER){
			erro += validStateLeader(form);
		}else if(ATIV_NATIONAL_LEADER.indexOf(activity) != -1){
			erro += validNationalLeader(form);
		}else if(activity == ATIV_DPT_HEAD){
			erro += validDptHead(form);
		}else if (ATIV_DIVISION.indexOf(activity) != -1){
			erro += validDivision(form);
		}else if (ATIV_VP.indexOf(activity) != -1){
			erro += validVP(form);
		}else if(activity == ATIV_DPT_HEADER_FIM){
			if(tipoFormulario == "novo" || tipoFormulario == "recisaoAntecip"){
				erro += validDptHead(form);
				if(dptHeadApproval == "sim"){
					erro += validDptHeadFim(form);
				}
			}else{
				erro += validDptHeadFim(form);
			}
		}
		
		//validando se as datas dos titulos (due dates) sao maiores do que a data atual.
		erro += validateDates(form);
		
		if(erro != ""){
			throw erro;
		}
	}
	
}


function validSecretary(form){
	
	var erro 				= "";
	
	if(form.getValue("zoom_state") == "" || form.getValue("zoom_state") == null){
        erro += "Please, fill in the field <b>State</b>!" + "<br/>";
    }
	
	if(form.getValue("txt_address") == "" || form.getValue("txt_address") == null){
		erro += "Please, fill in the field <b>Apartment / House Address</b>!" + "<br/>";
	}
	
	/*
	if(form.getValue("pastor_residing") == "" || form.getValue("pastor_residing") == null){
		erro += "Please, fill in the field <b>The Pastor Residing/ Who Will Reside</b>!" + "<br/>";
	}
	*/
	if(form.getValue("zoom_supplier") == "" || form.getValue("zoom_supplier") == null){
        //erro += "Please, fill in the field <b>Pastor/Employee</b>!" + "<br/>";
		erro += "Please, fill in the field <b>The Pastor Residing/ Who Will Reside</b>!" + "<br/>";
    }
	
	
	
	var fieldDescription = 'What type of lease is this?';
	if(form.getValue("txt_tipoRequisicao") == "" || form.getValue("txt_tipoRequisicao") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	//}else if(form.getValue("txt_tipoRequisicao") == "tranfer" || form.getValue("txt_tipoRequisicao") == "renovacao"){
	}else if(form.getValue("txt_tipoRequisicao") != "novo"){	
		fieldDescription = 'The original process was generated on fluig?';
		if(form.getValue("rd_orig_proc_gener_fluig") == "" || form.getValue("rd_orig_proc_gener_fluig") == null){
			erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
		}else{
			fieldDescription = 'Original Fluig Process';
			if(form.getValue("rd_orig_proc_gener_fluig") == "sim" ){
				if(form.getValue("fluig_process_zoom") == "" || form.getValue("fluig_process_zoom") == null){
					erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
				}
				if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){
					fieldToVld = "aux_rent_orig_proc_val";
					fieldDescription = 'Original Rental Value';
					
					if (!isVlrOk(form.getValue(fieldToVld))){
				        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				    }
				}
				
				//ALTERADO BRUNO - 20200901
				fieldDescription = "Do you want to cancel the financial for the original process on Protheus?";
				if(form.getValue("rd_cancel_original") == "" || form.getValue("rd_cancel_original") == null){
					erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
				}else{
					if(form.getValue("rd_cancel_original") == "sim" ){
						fieldDescription = 'Date to cancel the Financial';
						if(form.getValue("date_cancel_financial") == "" || form.getValue("date_cancel_financial") == null){
							erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
						}
					}
				}	
				//ALTERADO BRUNO - 20200901
				
				
			}else{
				if(form.getValue("original_fluig_process") == "" || form.getValue("original_fluig_process") == null){
					erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
				}	
				
				
				if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){
					fieldToVld = "rental_orig_process_value";
					fieldDescription = 'Original Rental Value';
					
					if (!isVlrOk(form.getValue(fieldToVld))){
				        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				    }
				}
			}
			
			
		}
		
	}
	
	fieldDescription = 'Does the complex accept Commercial Checks?';
	if(form.getValue("comercial_checks") == "" || form.getValue("comercial_checks") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	}
	
	fieldDescription = 'Payee Name';
	if(form.getValue("payee_name") == "" || form.getValue("payee_name") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	}
	
	fieldDescription = 'Payee Address';
	if(form.getValue("payee_address") == "" || form.getValue("payee_address") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	}
	
	fieldDescription ='Does the landlord require a certificate of insurance?';
	if(form.getValue("certificate_insurance") == "" || form.getValue("certificate_insurance") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	}
	
	fieldDescription = 'How many bedrooms are in the apartment?';
	if(form.getValue("bedroom_qtd") == "" || form.getValue("zoom_igreja") == null){
		erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
	}
	
	
	
	
	
	
	/*
	log.info("<<< fee_application: " + form.getValue('fee_application'));
	log.info("<<< fee_administrative: " + form.getValue('fee_administrative'));
	log.info("<<< amenity_fee_value: " + form.getValue('amenity_fee_value'));
	log.info("<<< fee_none: " + form.getValue('fee_none'));
	*/
	
	
	
	if (form.getValue("fee_none") == "" && form.getValue("fee_application") == "" && form.getValue("fee_administrative") == "" && form.getValue("fee_amenity") == "") {
		erro += "Please, <b>select one of the options for the fees</b>!" + "<br/>";
	}else{
		
		var campoCheckBox	= "fee_none";
		var checkSelecionado = form.getValue(campoCheckBox) == "on" ? true : false;
		if(!checkSelecionado){
			
			campoCheckBox	= "fee_application";
			if(form.getValue(campoCheckBox) == "on"){
				fieldCheckBox	= "application_fee_value";
				fieldDescription = 'Application Fee ($)';
				if(!isVlrOk(form.getValue(fieldCheckBox))){
					 erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				}
			}
			
			campoCheckBox	= "fee_administrative";
			if(form.getValue(campoCheckBox) == "on"){
				fieldCheckBox	= "administrative_fee_value";
				fieldDescription = 'Administrative Fee ($)';
				if(!isVlrOk(form.getValue(fieldCheckBox))){
					 erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				}
			}
			
			campoCheckBox	= "fee_amenity";
			if(form.getValue(campoCheckBox) == "on"){
				fieldCheckBox	= "amenity_fee_value";
				fieldDescription = 'Amenity Fee ($)';
				if(!isVlrOk(form.getValue(fieldCheckBox))){
					 erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				}
			}
			
			fieldDescription = 'Fee Due Date';
			if(form.getValue("due_date_fee") == "" || form.getValue("due_date_fee") == null){
				 erro += "Please, check the field <b>"+fieldDescription+"</b>! " + "<br/>";
			}
			
		}
	}
	
	if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){
		var fieldToVld = "start_lease_date";
		fieldDescription = 'Lease Start Date';
		if(form.getValue(fieldToVld) == "" || form.getValue(fieldToVld) == null){
			erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
		}
		
		fieldToVld = "end_lease_date";
		fieldDescription = 'Lease End Date';
		if(form.getValue(fieldToVld) == "" || form.getValue(fieldToVld) == null){
			erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
		}
		
		fieldToVld = "qtd_installments";
		fieldDescription = 'Terms in Months';
		if (!isVlrOk(form.getValue(fieldToVld))){
	        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
	    }
		
		fieldToVld = "due_date";
		fieldDescription = 'Due Date';
		if (!isVlrOk(form.getValue(fieldToVld))){
	        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
	    }
	}else{
		/*
		var fieldToVld = "termination_lease_date";
		fieldDescription = 'Lease Termination Date';
		if(form.getValue(fieldToVld) == "" || form.getValue(fieldToVld) == null){
			erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
		}
		*/
	}
	
	//rent value é obrigatorio para new / renew / Transfer. Nao é obrigatorio para Termination / Non Renewal
	if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){ 
		fieldToVld = "rent_value";
		fieldDescription = 'Monthly Rent Amount ($)';
		if (!isVlrOk(form.getValue(fieldToVld))){
	        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
		}
		if(form.getValue("rd_deposit") == ""){
			erro += 'enter the <b>Do you want to split the deposit amount?</b> field.<br>';
		}else{
			if(form.getValue("rd_deposit") == "sim"){
				var deposits    		= form.getChildrenIndexes("table_deposit");
				if (deposits.length > 0) {	
					for (var i = 0; i < deposits.length; i++) { 
						valueDeposit = form.getValue('grid_deposit_value___' + deposits[i]);
						dateDeposit	 = form.getValue('grid_deposit_date___' + deposits[i]);
		            	if(!isVlrOk(valueDeposit)){
		                    erro += "Please, fill in the field <b>Deposit Value</b>! Line ("+(i+1)+")" + "<br/>";
		                }
		            	if(dateDeposit == "" || dateDeposit == null){
		            		erro += "Please, fill in the field <b>Deposit Due Date</b>! Line ("+(i+1)+")" + "<br/>";
		            	}
					}	
				}else{
					erro += "Please, enter <b>at least one deposit!</b>" + "<br/>";
				}
			}	
		}
		if (!isVlrOk(form.getValue("grand_total"))){
	        erro += "Please, check the field <b>Grand Total Expense</b>! The value can not be 0." + "<br/>";
	    }
	}
    if(form.getValue("rd_documentos") == ""){
		erro += 'Please, select the field <b>Are there any documents that come attatched with this form?</b> field.<br>';
	}
    
	return erro;
}

function validStateLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovacaoGestor") == "" || form.getValue("rd_aprovacaoGestor") == null){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovacaoGestor") == "nao"){
		if(form.getValue("descricao") == null || form.getValue("descricao") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validNationalLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_national_leader") == "nao"){
		if(form.getValue("descricao_national_leader") == null || form.getValue("descricao_national_leader") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_national_leader") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}

function validDptHead(form){
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_dpt_head") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}

	if(form.getValue("rd_aprovGestor_dpt_head") == "nao"){
		if(form.getValue("descricao_dpt_head") == ""){
			erro += 'enter the <b>Feedback</b> field.<br>';
		}
	}
	
	return erro;
}


function validDivision(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_division") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovGestor_division") == "nao"){
		if(form.getValue("descricao_division") == null || form.getValue("descricao_division") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validVP(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_vp") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovGestor_vp") == "nao"){
		if(form.getValue("descricao_vp") == null || form.getValue("descricao_vp") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validDptHeadFim(form){
	
	var erro 		= "";
	
	if(form.getValue("classes") == "" || form.getValue("classes") == null){
		erro += "Please, enter the <b> GL Code <b/>." + "<br/>";
    }
	
	if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
		erro += "Please, enter the <b> Department </>." + "<br/>";
    }

	if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
        erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
    }
	
	
	return erro;
}


function isVlrOk(field){
	
	var lRet	= true;
	
	if(field == "" || field == null || parseFloat(field) == 0){
		lRet = false;
	}
	
	return lRet;
	
}

function formatarMoeda(numero) {

	if (isNaN(numero)) return "0.0";

	// Descobre se o valor é negativo e extrai o sinal.
	var negativo = numero < 0;
	numero = Math.abs(numero);

	// Usado para produzir a resposta, caractere por caractere.
	var resposta = "";

	// Converte o número para string.
	var numero 	= numero.toString();
	
	//procurando pelo ponto, para verificar os decimais.
	var ponto 	= numero.indexOf(".");
	if (ponto < 0){
		numero += ".00";
	}else{
		var posPonto	= numero.substr(ponto+1,numero.length);
		while(posPonto.length < 2){
			numero 		+= "0";
			ponto 		= numero.indexOf(".");
			posPonto	= numero.substr(ponto+1,numero.length);
		}
	}
	
	return numero;
}

function validateDates(form){
	
	var erro			= "";
	
	var dtNow 			= new java.util.Date();
	var sdf 			= new java.text.SimpleDateFormat("MM/dd/yyyy");
	var data 			= sdf.format(dtNow);
	//formatamos a data para que a data atual nao pegue hora / minuto e segundos atuais, ou a logica acaba ficando errada, pois verificamos em milisegundos.
	//criando a mascara acima, setamos a data sem hora / minuto / segundo, da mesma maneira que é feito no evento displayFields.
	var currentDate 	= new Date(data);
	var leaseDate 		= new Date(form.getValue("start_lease_date"));	//new Date();
	var depositDate 	= new Date(form.getValue("deposit_date"));	//new Date();
	var feeDate 		= new Date(form.getValue("due_date_fee"));	//new Date();
	var isTermination	= (form.getValue("txt_tipoRequisicao") == "recisaoAntecip");
	var msgPadrao		= "Due date cannot be earlier than issue date.";
	
	if(!isTermination){
		if( leaseDate.getTime() < currentDate.getTime()){
			erro += "Please, check the field <b>Lease Start Date</b>! Lease " + msgPadrao + "<br/>";
		}
	}
	
	if(feeDate.getTime() < currentDate.getTime()){
		erro += "Please, check the field <b>Fee Due Date</b>! Fee " + msgPadrao + "<br/>";
	}
	
	if(!isTermination){
		if(form.getValue("rd_deposit") == "sim"){ 
			var deposits    		= form.getChildrenIndexes("table_deposit");
			if (deposits.length > 0) {	
				for (var i = 0; i < deposits.length; i++) { 
					depositDate	 = new Date(form.getValue('grid_deposit_date___' + deposits[i]));
	            	
					if(depositDate.getTime() < currentDate.getTime() ){
						erro += "Please, check the field <b>Deposit Value</b>! Line ("+(i+1)+"). Deposit " + msgPadrao + "<br/>";
					}
				}	
			}
		}else{
			if(form.getValue("deposit_date") != "" && form.getValue("deposit_date") != null){
				if(depositDate.getTime() < currentDate.getTime()){
					erro += "Please, check the field <b>Deposit Value</b>! Deposit " + msgPadrao + "<br/>";
				}
			}	
		}	
	}
	return erro;
	
} 
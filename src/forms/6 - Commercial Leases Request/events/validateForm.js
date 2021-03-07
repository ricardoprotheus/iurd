function validateForm(form){
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity					= form.getValue("atividade") ;
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	//var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_COMMERCIAL_APPROVAL	= form.getValue("ATIV_COMMERCIAL_APPROVAL");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_COMMERCIAL_FIM			= form.getValue("ATIV_COMMERCIAL_FIM");  
	 
	if(enviar!="false"){
		if((activity == ATIV_INICIAL) || activity == "0"){
			erro = validSecretary(form);
		}else if (activity == ATIV_STATE_LEADER){
			erro = validStateLeader(form);
		//}else if (activity == ATIV_NATIONAL_LEADER){
			//erro = validNationalLeader(form);
		}else if (activity == ATIV_COMMERCIAL_APPROVAL){
			erro = validCommercialLease(form);
		}else if (activity == ATIV_DIVISION){
			erro = validDivision(form);
		}else if (activity == ATIV_VP){
			erro = validVP(form);
		}else if (activity == ATIV_COMMERCIAL_FIM){
			erro = validCommercialFim(form);
		}
	}	
	
	//validando se as datas dos titulos (due dates) sao maiores do que a data atual.
	erro += validateDates(form);
	
	if(erro != ""){
		throw erro;
	}
}

function validSecretary(form){
	
	var erro 						= "";
    var churchGrid					= "";
    var proratingChurch    			= form.getChildrenIndexes("table_prorating_church");
    var proratImprov 				= form.getChildrenIndexes("table_prorat_improv");
    var dataInicio					= "";
    var dataFim						= "";
    var vlrUnit						= 0;
    var dueDate						= 0;
    var qtdParcelas					= 0;
    var totalLinha					= 0;	
    var percentImprov				= 0;
    var valueImprov					= 0;
    var isRecisaoAntecip			= (form.getValue("txt_tipoRequisicao") == "recisaoAntecip");
    
    
	if(form.getValue("txt_tipoRequisicao") == ""){
		erro += 'enter the <b>type of lease</b> field.<br>';
	}
	
	if(form.getValue("zoom_state") == ""){
	    erro 		+= 'enter the <b>State</b> field.<br>';
    }
	
	if(form.getValue("txt_address") == ""){
		erro += 'enter the <b>Address</b> field.<br>';
	}
	
	if(!isRecisaoAntecip){
		if(form.getValue("txt_propriedade") == ""){
			erro += 'enter the <b>square ft does the property consist</b> field.<br>';
		}
    }
	
	if(form.getValue("txt_tipoAplicacao") == ""){
		erro += 'enter the <b>Specify this lease</b> field.<br>';
	}else if (form.getValue("txt_tipoAplicacao") == "igreja"){
		if(!isRecisaoAntecip){
			if(form.getValue("txt_confirmACO") == ""){
				erro += 'enter the <b>building have a CO</b> field.<br>';
			}else if(form.getValue("txt_confirmACO") == "no"){
				if(form.getValue("co_reason") == ""){
					erro += 'enter the <b>If not, please explain it(why this building does not have a CO)</b> field.<br>';
				}
			}
			if(form.getValue("txt_confirArea") == ""){
				erro += 'enter the <b>secretary confirmed with the city</b> field.<br>';
			}else{
				if(form.getValue("txt_confirArea")== "no"){
					if(form.getValue("zone_area_reason") == ""){
						erro += 'enter the <b>If not, please explain it(Has secretary confirmed with the city if this building is in Zoning Area to open as a church?)</b> field.<br>';
					}
				}
			}
			if(form.getValue("mudancaCO") == ""){
				erro += 'enter the <b>Will there be any fees for the change of CO</b> field.<br>';
			}
			if(form.getValue("txt_taxaMudanca") == ""){
				erro += 'enter the <b>Please include the Fee for the Change of CO</b> field.<br>';
			}
			/*
			if(form.getValue("ck_confirm") == ""){
				erro += 'confirm the <b>Please obtain NL Approval for the CO and Submit a WEBFORM through Maintenance.</b> field.<br>';
			}
			if(form.getValue("clausulaCO") == ""){
				erro += 'enter the <b>Is the CO & Violation clause added</b> field.<br>';
			}else{
				if(form.getValue("clausulaCO") == "nao"){
					throw 'You may not proceed to the next step <b>IN ORDER TO AVOID DELAYS THE CO & VIOLATION CLAUSE NEEDS TO BE INCLUDED ON THE AGREEMENT BEFORE SUBMITTING THE WEBFORM</b>.<br>';
				}
			}
			*/
			if(form.getValue("agendamento") == ""){
				erro += 'enter the <b>Was the lease negotiated with the landlord</b> field.<br>';
			}else{
				if(form.getValue("agendamento") == "sim"){
					if(form.getValue("concessions_qtd_months") == ""){
						erro += 'enter the <b>How many months?</b> field.<br>';
					}
				//}else{
					//throw 'You may not proceed to the next step <b>PLEASE NEGOTIATE WITH THE LANDLORD BEFORE PROCEEDING</b>.<br>';
				}
			}
			if(form.getValue("possiveisMelhorias") == ""){
				erro += 'enter the <b>Are there any improvements that need to be done</b> field.<br>';
			}
		}	
	}
	
	if(!isRecisaoAntecip){
		if(form.getValue("txt_valorPago") == ""){
			erro += 'enter the <b>How much will The Owner be paying</b> field.<br>';
		}
	
		if(form.getValue("responsavelMelhorias") == ""){
			erro += 'enter the <b>Who will be responsible to pay</b> field.<br>';
		}else if(form.getValue("responsavelMelhorias") == "shared"){
			var totalPercentage = 0;
			for (var i = 0; i < proratImprov.length; i++) { // percorre os campos Pai x Filho
	        	
				percentImprov	= parseFloat(form.getValue('pror_improv_percent___' + proratImprov[i])); 
				valueImprov		= parseFloat(form.getValue('pror_improv_value___' + proratImprov[i]));
	            
				if(!isNaN(percentImprov)){
					totalPercentage+= percentImprov;
				}
	            if( (percentImprov == null || percentImprov == 0 || isNaN(percentImprov)) && (valueImprov == null || valueImprov == 0 || isNaN(valueImprov))) {
	                erro += "Please, check the field <b>Percentage or Value</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	            /*
	            if(valueImprov == null || valueImprov == 0 || isNaN(valueImprov)) {
	                erro += "Please, check the field <b>Value</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	        	*/   
			}	
			//log.info("<<< Total Percentage" + totalPercentage.toString());
			if(totalPercentage > 0){
	        	if(totalPercentage != 100){
	        		if(isNaN(totalPercentage)){
	        			totalPercentage = 0;
	            	}
	        		erro += "Please, check the <b>Total of Percentage (table Responsible for Improvements)</b>! The value needs to be 100%! Total at the moment: "+ totalPercentage + "." + "<br/>";
	        	}
	        }
		}
		if(form.getValue("contratoMensal") == ""){
			erro += 'enter the <b>Is this a month-to-month lease</b> field.<br>';
		}else if(form.getValue("contratoMensal") == "no"){
			if(form.getValue("txt_data_contrato_inicio") == ""){
				erro += 'enter the <b>What is the start date of this New M-M lease?</b> field.<br>';
			}
			/*
			if(form.getValue("txt_data_contrato_fim") == ""){
				erro += 'enter the <b>What is the end date of this New M-M lease?</b> field.<br>';
			}
			*/
		}
	}
	
	if(form.getValue("application_fee_value") != "" && form.getValue("application_fee_value") != null && form.getValue("application_fee_value") > 0){
		if(form.getValue("due_date_fee") == "" || form.getValue("due_date_fee") == null){
			 erro += "Please, check the field <b>Fee Due Date</b>! " + "<br/>";
		}
		if(form.getValue("desc_fee") == "" || form.getValue("desc_fee") == null){
			 erro += "Please, check the field <b>Description (Fee)</b>! " + "<br/>";
		}
	}
	
	if(!isRecisaoAntecip){
	
		if(form.getValue("txt_depositoSeguranca") != "" && form.getValue("txt_depositoSeguranca") != null && parseFloat(form.getValue("txt_depositoSeguranca")) > 0){
			if(form.getValue("txt_data_deposit") == "" || form.getValue("txt_data_deposit") == null){
				erro += 'enter the <b>Deposit Due Date</b> field.<br>';
			}
		}
		if (proratingChurch.length > 0) {
			var dataAtual		= new Date();
			var currentYear 	= dataAtual.getFullYear();
	        for (var i = 0; i < proratingChurch.length; i++) { // percorre os campos Pai x Filho
	        	
	            dataInicio					= form.getValue('prorating_start_date___' + proratingChurch[i]); 
	            dataFim						= form.getValue('prorating_end_date___' + proratingChurch[i]);
	            qtdParcelas					= parseInt(form.getValue('prorating_qtd_installments___' + proratingChurch[i]));
	            dueDate						= parseInt(form.getValue('prorating_due_date___' + proratingChurch[i]));
	            vlrUnit						= parseFloat(form.getValue('prorating_church_value___' + proratingChurch[i]));
	            totalLinha					= parseFloat(form.getValue('prorating_total___' + proratingChurch[i]));	
	               	            	
	        	if(dataInicio == null || dataInicio == "") {
	                erro += "Please, fill in the field <b>Start Date</b>! Line ("+(i+1)+")" + "<br/>";
	            }
	        	if(dataFim == null || dataFim == "") {
	                erro += "Please, fill in the field <b>End Date</b>! Line ("+(i+1)+")" + "<br/>";
	            }
	        	if(qtdParcelas == null || isNaN(qtdParcelas)) {
	                erro += "Please, check the field<b> Terms in Months</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	        	if(dueDate == null || isNaN(dueDate)) {
	        		erro += "Please, check the field<b> Due Date</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	        	if(vlrUnit == null || vlrUnit == 0 || isNaN(vlrUnit)) {
	                erro += "Please, check the field<b> Monthly Value</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	        	if(totalLinha == null || totalLinha == 0 || isNaN(totalLinha)) {
	                erro += "Please, check the field<b> Total</b>! Line ("+(i+1)+")" + "<br/>";
	        	}
	        }
		}else{
			erro += "<b>You must enter at least one Monthly Payment!</b>" + "<br/>";
		}
	}	
	/*
	if(form.getValue("rd_documentos") == ""){
		erro += 'enter the <b>documents that come attatched with this form</b> field.<br>';
	}
	*/
	return erro;
}

function validCommercialFim(form){
	
	var erro = "";
	
	if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
        erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
	}
	
	if(form.getValue("zoom_supplier") == "" || form.getValue("zoom_supplier") == null){
        erro += "Please, fill in the field <b>Supplier</b>!" + "<br/>";
    }
	if(form.getValue("classes") == "" || form.getValue("classes") == null){
        erro += "Please, fill in the field <b>GL Code</b>!" + "<br/>";
    }
	if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
        erro += "Please, fill in the field <b>Department</b>!" + "<br/>";
    }
	if(form.getValue("txt_tipoRequisicao") == ""){
		erro += 'enter the <b>type of lease</b> field.<br>';
	}else if(form.getValue("txt_tipoRequisicao") != "novo"&form.getValue("txt_tipoRequisicao") !="renovacao"){	
		fieldDescription = 'The original process was generated on fluig?';
		if(form.getValue("rd_orig_proc_gener_fluig") == "" || form.getValue("rd_orig_proc_gener_fluig") == null){
			erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
		}else{
			fieldDescription = 'Original Fluig Process';
			if(form.getValue("rd_orig_proc_gener_fluig") == "sim" ){
				if(form.getValue("fluig_process_zoom") == "" || form.getValue("fluig_process_zoom") == null){
					erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
				}
				/*
				if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){
					fieldToVld = "aux_rent_orig_proc_val";
					fieldDescription = 'Original Rental Value';
					
					if (!isVlrOk(form.getValue(fieldToVld))){
				        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				    }
				}
				*/
				
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
				
			}else{
				if(form.getValue("original_fluig_process") == "" || form.getValue("original_fluig_process") == null){
					erro += "Please, fill in the field <b>"+fieldDescription+"</b>!" + "<br/>";
				}	
				/*
				if(form.getValue("txt_tipoRequisicao") != "recisaoAntecip"){
					fieldToVld = "rental_orig_process_value";
					fieldDescription = 'Original Rental Value';
					
					if (!isVlrOk(form.getValue(fieldToVld))){
				        erro += "Please, check the field <b>"+fieldDescription+"</b>! The value can not be 0." + "<br/>";
				    }
				}
				*/
			}	
		}	
	}
	
	return erro;
}

function validStateLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovacaoGestor") == "nao"){
		if(form.getValue("motivoRecusa") == null || form.getValue("motivoRecusa") == "" ){
			erro += "enter the <b>Notes Denied</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovacaoGestor") == ""){
		erro += 'enter the <b>Request Status</b> field.<br>';
	}
	
	
	return erro;
}

function validNationalLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_national_leader") == "nao"){
		if(form.getValue("descricao_national_leader") == null || form.getValue("descricao_national_leader") == "" ){
			erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_national_leader") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}

function validDivision(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_division") == "nao"){
		if(form.getValue("descricao_division") == null || form.getValue("descricao_division") == "" ){
			erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_division") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}

function validVP(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_vp") == "nao"){
		if(form.getValue("descricao_vp") == null || form.getValue("descricao_vp") == "" ){
			erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_vp") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}

function validCommercialLease(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovGestor_cl") == "nao"){
		if(form.getValue("descricao_cl") == null || form.getValue("descricao_cl") == "" ){
			erro += "enter the <b>Inform the reason for Denied - Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_cl") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	
	return erro;
}


//criando a mascara acima, setamos a data sem hora / minuto / segundo, da mesma maneira que é feito no evento displayFields.
	var currentDate 	= new Date(data);
	var depositDate 	= new Date(form.getValue("txt_data_deposit"));	//new Date();
	//var feeDate 		= new Date(form.getValue("due_date_fee"));	//new Date();
	var msgPadrao		= "due date cannot be earlier than issue date.";
	var feeDate 		= new Date(form.getValue("due_date_fee"));	//new Date();
	var isTermination	= (form.getValue("txt_tipoRequisicao") == "recisaoAntecip");
	
	if(!isTermination){
		var rentals    		= form.getChildrenIndexes("table_prorating_church");
		if (rentals.length > 0) {	
			for (var i = 0; i < rentals.length; i++) { 
				rentalDate	 = new Date(form.getValue('prorating_start_date___' + rentals[i]));
	        	
				if(rentalDate.getTime() < currentDate.getTime() ){
					erro += "Please, check the field <b>Start Date</b>! Line ("+(i+1)+"). Rental " + msgPadrao + "<br/>";
				}
			}	
		}
			
		if(form.getValue("txt_data_deposit") != "" && form.getValue("txt_data_deposit") != null){
			if(depositDate.getTime() < currentDate.getTime()){
				erro += "Please, check the field <b>Deposit Due Date</b>! Deposit " + msgPadrao + "<br/>";
			}
		}	
	}
	
	if(form.getValue("due_date_fee") != "" && form.getValue("due_date_fee") != null){
		if(feeDate.getTime() < currentDate.getTime()){
			erro += "Please, check the field <b>Fee Due Date</b>! Fee " + msgPadrao + "<br/>";
		}
	}
	
	return erro;
	
} 
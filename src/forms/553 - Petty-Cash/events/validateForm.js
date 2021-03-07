function validateForm(form){
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEADER_APPROVAL	= form.getValue("ATIV_DPT_HEADER_APPROVAL");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_DPT_HEADER_FIM			= form.getValue("ATIV_DPT_HEADER_FIM");
	
	if(enviar=="true"){
		if((activity == ATIV_INICIAL) || activity == "0"){
			erro += validSecretary(form);
		}else if(activity == ATIV_STATE_LEADER){
			erro += validStateLeader(form);
		}else if(activity == ATIV_DPT_HEADER_APPROVAL){
			erro += validDptHeadApproval(form);
		}else if(activity == ATIV_DIVISION){
			erro += validDivision(form);
		}else if(activity == ATIV_VP){
			erro += validVp(form);
		}else if(ATIV_DPT_HEADER_FIM){
			erro += validDptHeadFim(form);
		}
		if(erro != ""){
			throw erro;
		}
	}
}


function validSecretary(form){
	
	var erro 				= "";
	var indexes     		= form.getChildrenIndexes("table_items");
	
	if(form.getValue("zoom_supplier") == "" || form.getValue("zoom_supplier") == null){
        erro += "Please, fill in the field <b>Pastor/Employee</b>!" + "<br/>";
    }
	
	if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
        erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
    }
	
	//if(form.getValue("current_amount_petty_cash") == "" || form.getValue("current_amount_petty_cash") == null){
	if (!isVlrOk(form.getValue("current_amount_petty_cash"))){
        erro += "Please, fill in the field <b>petty cash amount you <u>currently have</u></b>!" + "<br/>";
    }
	
	var valPettyCash 	= parseFloat(form.getValue("current_amount_petty_cash"));
	var totalItems		= parseFloat(form.getValue("txt_total"));
	var maximumPettyCash= parseFloat(form.getValue("amount_authorized"));
	
	if((totalItems + valPettyCash) > maximumPettyCash){
		erro += "Please, <b>check the values</b>!" + "<br/>";
		erro += "	Maximum Petty Cash: "+ formatarMoeda(maximumPettyCash) +"<br/>";
		erro += "	Petty Cash currently have: "+ formatarMoeda(valPettyCash) +"<br/>";
		erro += "	Sum of the Items: " + formatarMoeda(totalItems) +"<br/>";
		erro += "	Balance: -" + formatarMoeda(maximumPettyCash - (totalItems + valPettyCash) ) +"<br/>"+"<br/>";
	}
    
	if (indexes.length == 0){
        erro += "Please, enter <b>at least one item</b>!" + "<br/>";
    }else if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
            if(form.getValue('item_date___' + indexes[i]) == null || form.getValue('item_date___' + indexes[i]) == '') {
                erro += "Please, fill in the field <b>Date</b> for Line "+(i+1)+" (ITEMS)" + "<br/>";
            }

            if(form.getValue('item_description___' + indexes[i]) == null || form.getValue('item_description___' + indexes[i]) == '') {
            	erro += "Please, fill in the field <b>Brief Description</b> for Line "+(i+1)+" (ITEMS)" + "<br/>";
            }

            if(form.getValue("item_debit___" + indexes[i]) == null || form.getValue("item_debit___" + indexes[i]) == ""){
            	erro += "Please, fill in the field <b>Debit</b> for Line "+(i+1)+" (ITEMS)" + "<br/>";
            }
        }
    }
	
	if (!isVlrOk(form.getValue("txt_total"))){
        erro += "Please, check the field <b>Grand Total Expense</b>! The value can not be 0." + "<br/>";
    }
	
    if(form.getValue("rd_documentos") == ""){
		erro += 'Please, select the field <b>Are there any documents that come attatched with this form?</b> field.<br>';
	}
    
	return erro;
}

function validStateLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_approveState") == "" || form.getValue("rd_approveState") == null){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_approveState") == "nao"){
		if(form.getValue("txt_feedbackState") == null || form.getValue("txt_feedbackState") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}

function validDptHeadFim(form){
	
	var erro 		= "";
	var indexes     = form.getChildrenIndexes("table_items");
	
	if(form.getValue("classes") == "" || form.getValue("classes") == null){
		erro += "Please, enter the <b> GL Code </>." + "<br/>";
    }
	
	if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
		erro += "Please, enter the <b> Department </>." + "<br/>";
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

function validDptHeadApproval(form){
	
	var erro 		= "";
	
	if(form.getValue("rd_aprovGestor_dpt_head") == "nao"){
		if(form.getValue("descricao_dpt_head") == null || form.getValue("descricao_dpt_head") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_dpt_head") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	return erro;
	
}

function validDivision(form){
	
	var erro 		= "";
	
	if(form.getValue("rd_aprovGestor_division") == "nao"){
		if(form.getValue("descricao_division") == null || form.getValue("descricao_division") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_division") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	return erro;
	
}

function validVp(form){
	
	var erro 		= "";
	
	if(form.getValue("rd_aprovGestor_vp") == "nao"){
		if(form.getValue("descricao_vp") == null || form.getValue("descricao_vp") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}

	if(form.getValue("rd_aprovGestor_vp") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}
	
	return erro;
	
}
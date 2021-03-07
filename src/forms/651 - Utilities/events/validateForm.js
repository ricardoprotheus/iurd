function validateForm(form){
	
	var ativAtual   				= getValue("WKNumState");
	var ativProx   	 				= getValue("WKNextState");
	var erro        				= "";
    var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
    var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEADER				= form.getValue("ATIV_DPT_HEADER");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_DPT_HEADER_FIM			= form.getValue("ATIV_DPT_HEADER_FIM");
	
	if((ativAtual == ATIV_INICIAL) || ativAtual == "0"){
		erro += validSecretary(form);
    }else if(ativAtual == ATIV_STATE_LEADER){
    	erro += validStateLeader(form);
    }else if(ativAtual == ATIV_DPT_HEADER){
    	erro += validDptHead(form);    	
    }else if(ativAtual == ATIV_DIVISION){
    	erro += validDivision(form); 
    }else if(ativAtual == ATIV_DPT_HEADER_FIM){
    	erro += validFimDptHead(form); 
    }
    	
	if( erro != ""){
		throw erro;
	}

}

function validSecretary(form){
	var erro 				= "";
	var churches    		= form.getChildrenIndexes("table_church");
    var totalPercent 		= 0;
    var percentLinha 		= 0;
    var churchGrid			= "";
    var churchGridHidden	= "";
    
    if(form.getValue("rateioChurch") == "" || form.getValue("rateioChurch") == null){ 
		erro += "Please, select if there is prorating of expenses in the form (church)!" + "<br/>";
	}else{
		if(form.getValue("rateioChurch") == "yes" ){
			if (churches.length > 0) {
	            for (var i = 0; i < churches.length; i++) { // percorre os campos Pai x Filho
	            	percentLinha = parseFloat(form.getValue('txt_percent_grid___' + churches[i]));
	            	churchGrid	 = form.getValue('requesting_church_grid___' + churches[i]);    	            	
	            	if(churchGrid == null || churchGrid == "") {
	                    erro += "Please, fill in the field <b>Church</b>! Line ("+(i+1)+")" + "<br/>";
	                }
	            	if(percentLinha == null || percentLinha == 0 || isNaN(percentLinha)) {
	                    erro += "Please, fill in the field <b>Percentage</b>! Line ("+(i+1)+")" + "<br/>";
	                }else{
	                	totalPercent += percentLinha;
	                }
	            }
	            if(totalPercent != 100){
	            	if(isNaN(totalPercent)){
	            		totalPercent = 0;
	            	}
	            	erro += "Check the percentage for the churches. The total must be 100%! Total at the moment: "+ totalPercent + "<br/>";
	            }
			}else{
				erro += "<b>You must enter at least one church!</b>" + "<br/>";
			}     

		}else{
			if(form.getValue("zoom_igreja") == "" || form.getValue("zoom_igreja") == null){
	            erro += "Please, fill in the field <b>Requesting Church</b>!" + "<br/>";
	        }
		}
	}	
	
    if(form.getValue("zoom_department") == "" || form.getValue("zoom_department") == null){
        erro += "Please, select the <b>department</b>!" + "<br/>";
    }
    
    if(form.getValue("rd_service") == "" || form.getValue("rd_service") == null){
        erro += "Please, select the <b>type of service</b>!" + "<br/>";
    }
    
    if(form.getValue("zoom_company") == "" || form.getValue("zoom_company") == null){
        erro += "Please, select the <b>company</b>!" + "<br/>";
    }
    
    if(form.getValue("txt_term") == "" || form.getValue("txt_term") == null){
        erro += "Please, select the <b>term of contract</b>!" + "<br/>";
    }
    
    if(form.getValue("txt_installment") == "" || form.getValue("txt_installment") == null || parseInt(form.getValue("txt_installment")) == 0) {
    	erro += "Please, inform <b>how many terms will this contract consist of</b>!" + "<br/>";
    }
    
    if(form.getValue("rd_fee") == "" || form.getValue("rd_fee") == null){
        erro += "Please, inform if <b>there is an installation fee</b>!" + "<br/>";
    }
            
    if(form.getValue("txt_amount") == "" || form.getValue("txt_amount") == null){
        erro += "Please, inform <b>how much will we pay monthly in this new contract</b>!" + "<br/>";
    }
    
    if(form.getValue("rd_fee") == "sim"){
    	if(form.getValue("installfee") == "" || form.getValue("installfee") == null || parseFloat(form.getValue("installfee")) == 0){
            erro += "Please, inform the <b>installment fee</ b>!" + "<br/>";
        }
    	if(form.getValue("dataInstallFee") == "" || form.getValue("dataInstallFee") == null){
            erro += "Please, inform the <b>installment fee date</b>!" + "<br/>";
        }
    }
    
    if(form.getValue("txt_gran_total") == "" || form.getValue("txt_gran_total") == null || parseFloat(form.getValue("txt_gran_total")) == 0) {
    	erro += "Please, inform <b>how many terms will this contract consist of</b>!" + "<br/>";
    }
    
    if(form.getValue("rd_documentos") == "" || form.getValue("rd_documentos") == null){
    	erro += "Please, inform <b>if there are any attachment</b>!" + "<br/>";
    }
    return erro;
}

function validStateLeader(form){
	
	var erro 			= "";
	var aprovacao		= "";
	var motivoRecusa	= "";
			
	aprovacao	= form.getValue("rd_aprovGestor_state_leader")
	motivoRecusa= form.getValue("descricao_state_leader")
	if(aprovacao == "" || aprovacao == null){
    	erro += "Please, select one of the options: <b>approve or deny.</b>" + "<br/>";
	}else if(aprovacao == "nao"){
		if (motivoRecusa == "" || motivoRecusa == null){
			erro += "Please, inform the <b>reason for deny it (Feedback)</b>." + "<br/>";
		}
	}
	
	return erro;
}

function validDptHead(form){
	var erro 			= "";
	var aprovacao		= "";
	var motivoRecusa	= "";
	
	aprovacao	= form.getValue("rd_deptHead")
	motivoRecusa= form.getValue("txt_feedbackDeptHead")
	if(aprovacao == "" || aprovacao == null){
    	erro += "Please, select one of the options: <b>approve or deny</b>." + "<br/>";
	}else if(aprovacao == "nao"){
		if (motivoRecusa == "" || motivoRecusa == null){
			erro += "Please, inform the <b>reason for deny it (Feedback)</b>." + "<br/>";
		}
	}
	
	return erro;
}

function validDivision(form){
	var erro 			= "";
	var aprovacao		= "";
	var motivoRecusa	= "";
	
	aprovacao	= form.getValue("rd_aprovacaoGestor_division")
	motivoRecusa= form.getValue("descricao_division")
	if(aprovacao == "" || aprovacao == null){
    	erro += "Please, select one of the options: <b>approve or deny</b>." + "<br/>";
	}else if(aprovacao == "nao"){
		if (motivoRecusa == "" || motivoRecusa == null){
			erro += "Please, inform the <b>reason for deny it (Feedback)</b>." + "<br/>";
		}
	}
	
	return erro;
}

function validFimDptHead(form){
	var erro 			= "";
	
	if(form.getValue("invoiceNumber") == "" || form.getValue("invoiceNumber") == null ){
        erro += "Please, inform the <b>invoice number</b>!" + "<br/>";
    }
	if(form.getValue("classes") == "" || form.getValue("classes") == null ){
        erro += "Please, inform the <b>GL Code</b>!" + "<br/>";
    }
	
	return erro;
}
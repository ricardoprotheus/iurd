function validateForm(form){
	
	var enviar 						= getValue("WKCompletTask");
	var erro 						= "";
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEAD				= form.getValue("ATIV_DPT_HEAD");
	var ATIV_SUPERVISOR				= form.getValue("ATIV_SUPERVISOR");
		
	if(enviar=="true"){
		if((activity == ATIV_INICIAL) || activity == "0"){
			erro += validSecretary(form);
		}else if(activity == ATIV_STATE_LEADER){
			erro += validStateLeader(form);
		}else if(activity == ATIV_DPT_HEAD){
			erro += validDptHead(form);
		}else if(activity == ATIV_SUPERVISOR){
			erro += validSupervisor(form);
		}
		if(erro != ""){
			throw erro;
		}
	}
	
}

function validSecretary(form){
	
	var erro 				= "";
	var churches    		= form.getChildrenIndexes("table_church");
    var totalPercent 		= 0;
    var percentLinha 		= 0;
    var churchGrid			= "";
    var churchGridHidden	= "";
    
    	
    var cMsgCampo	= "";
    
    if(form.getValue("zoom_state") == ""){
    	cMsgCampo	= "State";
	    erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("txt_address") == ""){
    	cMsgCampo	= "Address";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("rd_requisicao") == ""){
    	cMsgCampo	= "Request";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("rd_aplicacao") == ""){
    	cMsgCampo	= "Select what applies for this request";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("txt_nomeCompleto") == ""){
    	cMsgCampo	= "Full Name of Employee";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("start_date") == ""){
    	cMsgCampo	= "Start Date";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("rd_tipoMembro") == ""){
    	cMsgCampo	= "Will the new hire be a staff member or a clergy?";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }		
    		
    		
    if(form.getValue("rd_planoSaude") == ""){		
    	cMsgCampo	= "Does the new hire wish to enroll in our Health Plan?";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    		
    if(form.getValue("rd_configurarDeposito") == ""){		
    	cMsgCampo	= "Does the new hire wish to setup direct deposit for them?";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
    if(form.getValue("rd_documentos") == ""){
    	cMsgCampo	= "Are there any documents you would like to attach to this form?";
    	erro 		+= 'enter the <b>'+cMsgCampo+'</b> field.<br>';
    }
    
	return erro;
}

function validStateLeader(form){
	
	var erro = "";
	
	if(form.getValue("rd_aprovacaoGestor") == ""){
		erro += 'enter the <b>Approval</b> field.<br>';
	}else if(form.getValue("rd_aprovacaoGestor") == "nao"){
		if(form.getValue("descricao") == null || form.getValue("descricao") == "" ){
			erro += "enter the <b>Feedback</b> field.<br>";
		}
	}
	
	return erro;
}


function validDptHead(form){
	var erro 			= "";
	var aprovacao		= form.getValue("rd_deptHead");
	var motivoRecusa	= form.getValue("txt_feedbackDeptHead");
	
	if(aprovacao == "" || aprovacao == null){
    	erro += "Please, select one of the options: <b>approve or deny</b>." + "<br/>";
	}else if(aprovacao == "nao"){
		if (motivoRecusa == "" || motivoRecusa == null){
			erro += "Please, inform the <b>reason for deny it (Feedback)</b>." + "<br/>";
		}
	}
	
	return erro;
}

function validSupervisor(form){
	var erro 			= "";
	var aprovacao		= form.getValue("rd_aprovacaoGestor_supervisor");
	var motivoRecusa	= form.getValue("descricao_supervisor");
	
	if(aprovacao == "" || aprovacao == null){
    	erro += "Please, select one of the options: <b>approve or deny</b>." + "<br/>";
	}else if(aprovacao == "nao"){
		if (motivoRecusa == "" || motivoRecusa == null){
			erro += "Please, inform the <b>reason for deny it (Feedback)</b>." + "<br/>";
		}
	}
	
	return erro;
}
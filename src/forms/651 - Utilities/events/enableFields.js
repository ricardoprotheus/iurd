function enableFields(form){ 
	
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
    var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEADER				= form.getValue("ATIV_DPT_HEADER");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_DPT_HEADER_FIM			= form.getValue("ATIV_DPT_HEADER_FIM");
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		
		/*
		
		
		supervisorEnable(form,false);
		vpEnable(form,false);
		
		*/
	}
	
	if(activity == ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		dptHeaderInfFormEnable(form,false);
		/*
		supervisorEnable(form,false);
		vpEnable(form,false);
		
		*/
	}
	
	if(activity == ATIV_DPT_HEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,true);
		divisionEnable(form,false);
		dptHeaderInfFormEnable(form,false);
		
		/*
		
		
		supervisorEnable(form,false);
		vpEnable(form,false);
		
		*/
	}
	
	if (activity == ATIV_DIVISION){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,true);
		dptHeaderInfFormEnable(form,false);
	}
	
	if (activity == ATIV_DPT_HEADER_FIM){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		dptHeaderInfFormEnable(form,true);
	}
	
}

function secretaryEnable(form,enable){
	
	var indexesChurch 	= form.getChildrenIndexes("table_church");
	
	form.setEnabled("rateioChurch",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	form.setEnabled("zoom_department",enable);
	form.setEnabled("rd_service",enable);
	form.setEnabled("zoom_company",enable);
	form.setEnabled("txt_term",enable);
	form.setEnabled("dataInstallment",enable);
	form.setEnabled("txt_installment",enable);
	form.setEnabled("txt_qtd_services",enable);
	form.setEnabled("txt_amount",enable);
	form.setEnabled("rd_fee",enable);
	form.setEnabled("installfee",enable);
	form.setEnabled("dataInstallFee",enable);
	form.setEnabled("comments",enable);
	form.setEnabled("rd_documentos",enable);
	
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i],enable);
		form.setEnabled("txt_percent_grid___"+indexesChurch[i],enable);
		form.setVisibleById("spnRemoveChild___"+indexesChurch[i],enable);
	}
	
}

function stateLeaderEnable(form,enable){
	form.setEnabled("rd_aprovGestor_state_leader",enable);
	form.setEnabled("descricao_state_leader",enable);
}

function dptHeaderApprovalEnable(form,enable){
	form.setEnabled("rd_deptHead",enable);
	form.setEnabled("txt_feedbackDeptHead",enable);
}

function divisionEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_division",enable);
	form.setEnabled("descricao_division",enable);
}

function dptHeaderInfFormEnable(form,enable){
	form.setEnabled("invoiceNumber",enable);
	form.setEnabled("classes",enable);
}

/*


function supervisorEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_supervisor",enable);
	form.setEnabled("descricao_supervisor",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_vp",enable);
	form.setEnabled("descricao_vp",enable);
}


*/
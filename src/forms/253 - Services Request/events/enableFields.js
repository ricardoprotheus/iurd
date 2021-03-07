function enableFields(form){ 
	
	var state 						= getValue("WKNumState");
	var ATIVIDADE_INICIAL			= (state==0 || state==4); 
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 17);
	var ATIV_DIVISION				= (state == 37);
	var ATIV_SUPERVISOR				= (state == 19);
	var ATIV_VP						= (state == 21);
	var ATIV_DPT_HEADER_FIM			= (state == 23);
	
	if(ATIVIDADE_INICIAL){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		supervisorEnable(form,false);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		supervisorEnable(form,false);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_DPT_HEADER_APPROVALL){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,true);
		divisionEnable(form,false);
		supervisorEnable(form,false);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_DIVISION){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,true);
		supervisorEnable(form,false);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_SUPERVISOR){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		supervisorEnable(form,true);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_VP){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		supervisorEnable(form,false);
		vpEnable(form,true);
		dptHeaderInfFormEnable(form,false);
	}
	
	if(ATIV_DPT_HEADER_FIM){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeaderApprovalEnable(form,false);
		divisionEnable(form,false);
		supervisorEnable(form,false);
		vpEnable(form,false);
		dptHeaderInfFormEnable(form,true);
	}
	
}

function secretaryEnable(form,enable){
	

	

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

function supervisorEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_supervisor",enable);
	form.setEnabled("descricao_supervisor",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_vp",enable);
	form.setEnabled("descricao_vp",enable);
}

function dptHeaderInfFormEnable(form,enable){

	var indexesChurch 	= form.getChildrenIndexes("table_church");
	
	form.setEnabled("invoiceNumber",enable);
	form.setEnabled("classes",enable);
	form.setEnabled("rateioChurch",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i],enable);
		form.setEnabled("txt_percent_grid___"+indexesChurch[i],enable);
		form.setVisibleById("spnRemoveChild___"+indexesChurch[i],enable);
	}
	
	
}
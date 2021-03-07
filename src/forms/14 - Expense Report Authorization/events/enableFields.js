function enableFields(form){
	var state 						= getValue("WKNumState");
	var ATIVIDADE_INICIAL			= (state==0 || state==4); 
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if(ATIVIDADE_INICIAL){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DPT_HEADER_APPROVALL){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeadApprovalEnable(form,true);
		divisionHeadEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DIVISION){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,true);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DPT_HEADER_FIM){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		dptHeadIntegrEnable(form,true);
	}
	
}

function secretaryEnable(form,enable){
	
	var indexesMiles 	= form.getChildrenIndexes("table_milhas");
	
	form.setEnabled("zoom_supplier",enable);
	form.setEnabled("rd_tipoSolicitacao",enable);
	form.setEnabled("rd_tipo",enable);
	form.setEnabled("txt_marcaCarro",enable);
	form.setEnabled("txt_modeloCarro",enable);
	form.setEnabled("txt_placaCarro",enable);
	form.setEnabled("spnRemoveChildMilhas",enable);
	form.setEnabled("adicionaFilho",enable);
	form.setEnabled("divTable",enable);
	//form.setEnabled("zoom_term",enable);
	//form.setEnabled("txt_installment",enable);
	form.setEnabled("dataInstallment",enable);
	form.setEnabled("txt_pagamentoPrograma",enable);
	form.setEnabled("rd_fee",enable);
	form.setEnabled("installfee",enable);
	form.setEnabled("dataInstallFee",enable);
	form.setEnabled("notas",enable);
	form.setEnabled("rd_documentos",enable);
	
	form.setVisibleById("adicionaFilho", enable); 
	form.setVisibleById("spnRemoveChildMilhas",enable);
	
	for (var i=0; i<indexesMiles.length; ++i){ 
		form.setEnabled("table_dt___"+indexesMiles[i], enable); 
		form.setEnabled("table_quantMilhas___"+indexesMiles[i], enable);
		form.setEnabled("table_pedagios___"+indexesMiles[i], enable);
		form.setEnabled("table_montante___"+indexesMiles[i], enable);
	} 
	
}

function stateLeaderEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor",enable);
	form.setEnabled("descricao",enable);
}

function dptHeadApprovalEnable(form,enable){
	form.setEnabled("rd_aprovGestor_dpt_head",enable);
	form.setEnabled("descricao_dpt_head",enable);
}

function divisionHeadEnable(form,enable){
	form.setEnabled("rd_aprovGestor_division",enable);
	form.setEnabled("descricao_division",enable);
}

function dptHeadIntegrEnable(form,enable){
	
	var indexesChurch 	= form.getChildrenIndexes("table_church");
	
	form.setEnabled("rateioChurch",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	form.setEnabled("spnRemoveChildChurch",enable);
	form.setEnabled("requesting_church_grid",enable);
	form.setEnabled("txt_percent_grid",enable);
	form.setEnabled("rateioGlCode",enable);
	form.setEnabled("invoiceNumber",enable);
	form.setEnabled("classes",enable);
	form.setEnabled("zoom_classes_grid",enable);
	form.setEnabled("txt_descrip_grid_gl_code",enable);
	form.setEnabled("txt_percent_grid_gl_code",enable);
	form.setEnabled("zoom_department",enable);
	
	form.setVisibleById("add_gl_code",enable);
	form.setVisibleById("spn_remove_child_gl_code",enable);
	
	form.setVisibleById("add_church",enable);
	form.setVisibleById("spnRemoveChildChurch",enable);
	
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i], enable); 
		form.setEnabled("txt_percent_grid___"+indexesChurch[i], enable);
	} 
	
}
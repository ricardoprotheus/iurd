function enableFields(form){
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	//var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_COMMERCIAL_APPROVAL	= form.getValue("ATIV_COMMERCIAL_APPROVAL");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_COMMERCIAL_FIM			= form.getValue("ATIV_COMMERCIAL_FIM");
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		commercialFimEnable(form,false);
	}else if(activity == ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		commercialFimEnable(form,false);
	/*
	}else if(activity == ATIV_NATIONAL_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		nationalLeaderEnable(form,true);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		commercialFimEnable(form,false);
	*/	
	}else if(activity == ATIV_COMMERCIAL_APPROVAL){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,true);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		commercialFimEnable(form,false);	
	}else if(activity == ATIV_DIVISION){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,true);
		vpEnable(form,false);
		commercialFimEnable(form,false);
	}else if(activity == ATIV_VP){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,true);
		commercialFimEnable(form,false);
	}else if(activity == ATIV_COMMERCIAL_FIM){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		//nationalLeaderEnable(form,false);
		commercialLeaseEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		commercialFimEnable(form,true);
	}
}

function secretaryEnable(form,enable){
	
	var indexesChurch 		= form.getChildrenIndexes("table_church");
	var indProratingChurch 	= form.getChildrenIndexes("table_prorating_church");
	var indProratImprov 	= form.getChildrenIndexes("table_prorat_improv");
	
	form.setEnabled("txt_address",enable);
	form.setEnabled("txt_outros",enable);
	form.setEnabled("txt_enderecoOutros",enable);
	form.setEnabled("txt_estadoOutros",enable);
	form.setEnabled("txt_propriedade",enable);
	form.setEnabled("txt_tipoRequisicao",enable);
	form.setEnabled("txt_tipoAplicacao",enable);
	form.setEnabled("txt_confirmACO",enable);
	form.setEnabled("txt_confirArea",enable);
	form.setEnabled("mudancaCO",enable);
	form.setEnabled("txt_taxaMudanca",enable);
	//form.setEnabled("ck_confirm",enable);
	//form.setEnabled("clausulaCO",enable);
	form.setEnabled("agendamento",enable);
	form.setEnabled("concessions_qtd_months",enable);
	form.setEnabled("possiveisMelhorias",enable);
	form.setEnabled("responsavelMelhorias",enable);
	form.setEnabled("txt_valorPago",enable);
	form.setEnabled("txt_address",enable);
	form.setEnabled("contratoMensal",enable);
	form.setEnabled("txt_data_contrato_inicio",enable);
	//form.setEnabled("txt_data_contrato_fim",enable);
	form.setEnabled("notes_new_lease",enable);
	form.setEnabled("txt_depositoSeguranca",enable);
	form.setEnabled("txt_data_deposit",enable);
	//form.setEnabled("txt_aluguelPrePago",enable);
	//form.setEnabled("txt_total",enable);
	form.setEnabled("comentarios",enable);
	form.setEnabled("notas",enable);
	//form.setEnabled("rd_documentos",enable);
	form.setEnabled("co_reason",enable);
	form.setEnabled("zone_area_reason",enable);
	
	form.setVisibleById("add_church",enable);
	form.setVisibleById("spnRemoveChild",enable);
	
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i], enable); 
		form.setEnabled("txt_percent_grid___"+indexesChurch[i], enable);
	} 
	
	for (var i=0; i<indProratingChurch.length; ++i){ 
		form.setEnabled("prorating_church_grid___"+indProratingChurch[i], enable); 
		form.setEnabled("prorating_church_year___"+indProratingChurch[i], enable);
		form.setEnabled("prorating_church_value___"+indProratingChurch[i], enable);
		form.setEnabled("prorating_church_day___"+indProratingChurch[i], enable);
	}
	
	for (var i=0; i<indProratImprov.length; ++i){ 
		form.setEnabled("pror_improv_percent___"+indProratImprov[i], enable); 
		form.setEnabled("pror_improv_value___"+indProratImprov[i], enable);
	}
	form.setEnabled("zoom_state",enable);
	form.setEnabled("application_fee_value",enable);
	form.setEnabled("due_date_fee",enable);
	form.setEnabled("desc_fee",enable);
	
}

function commercialFimEnable(form,enable){
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("zoom_supplier",enable);
	form.setEnabled("classes",enable);
	form.setEnabled("zoom_department",enable);
	
	form.setEnabled("fluig_process_zoom",enable);
	form.setEnabled("rd_orig_proc_gener_fluig",enable);
	form.setEnabled("original_fluig_process",enable);
	//form.setEnabled("rental_orig_process_value",enable);
	form.setEnabled("rd_cancel_original",enable);
	form.setEnabled("date_cancel_financial",enable);
	
}

function stateLeaderEnable(form,enable){ 
	form.setEnabled("rd_aprovacaoGestor",enable);
	form.setEnabled("descricao",enable);
}

function nationalLeaderEnable(form,enable){
	form.setEnabled("rd_aprovGestor_national_leader",enable);
	form.setEnabled("descricao_national_leader",enable);
}

function divisionHeadEnable(form,enable){
	form.setEnabled("rd_aprovGestor_division",enable);
	form.setEnabled("descricao_division",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_aprovGestor_vp",enable);
	form.setEnabled("descricao_vp",enable);
}

function commercialLeaseEnable(form,enable){
	form.setEnabled("rd_aprovGestor_cl",enable);
	form.setEnabled("descricao_cl",enable);
}
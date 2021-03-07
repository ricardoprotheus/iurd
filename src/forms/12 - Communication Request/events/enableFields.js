function enableFields(form){
	
	var activity 					= getValue("WKNumState");
	var ATIVIDADE_INICIAL			= (activity==0 || activity==4);
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	if(ATIVIDADE_INICIAL){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
/*	
	}else if(ATIV_NATIONAL_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		nationalLeaderEnable(form,true);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
*/	
	}else if(ATIV_DPT_HEADER_APPROVALL){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,true);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DIVISION){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,true);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_VP){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,true);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DPT_HEADER_FIM){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
//		nationalLeaderEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,true);
	}
	
}

function secretaryEnable(form,enable){
	
	form.setEnabled("rd_aplicacao",enable);
	form.setEnabled("rd_tipoContrato",enable);
	form.setEnabled("txt_dataInicio",enable);
	form.setEnabled("txt_dataFinal",enable);
	form.setEnabled("txt_pagamentoPrograma",enable);
	form.setEnabled("txt_pessoaContato",enable);
	form.setEnabled("dataInstallment",enable);
	form.setEnabled("rd_verificaDesconto",enable);
	form.setEnabled("txt_regioesBeneficiadas",enable);
	form.setEnabled("rd_fee",enable);
	form.setEnabled("installfee",enable);
	form.setEnabled("dataInstallFee",enable);
	form.setEnabled("comentarios",enable);
	form.setEnabled("rd_documentos",enable);
	form.setEnabled("zoom_term",enable);
	form.setEnabled("txt_installment",enable);
	form.setEnabled("zoom_state",enable);	
}

function stateLeaderEnable(form,enable){ 
	form.setEnabled("rd_aprovacaoGestor",enable);
	form.setEnabled("descricao",enable);
}

/*
function nationalLeaderEnable(form,enable){
	form.setEnabled("rd_aprovGestor_national_leader",enable);
	form.setEnabled("descricao_national_leader",enable);
}
*/

function dptHeadApprovalEnable(form,enable){
		
	form.setEnabled("rd_aprovGestor_dpt_head",enable);
	form.setEnabled("descricao_dpt_head",enable);
}

function divisionHeadEnable(form,enable){
	form.setEnabled("rd_aprovGestor_division",enable);
	form.setEnabled("descricao_division",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_aprovGestor_vp",enable);
	form.setEnabled("descricao_vp",enable);
}

function dptHeadIntegrEnable(form,enable){
	
	var indexesChurch 	= form.getChildrenIndexes("table_church");	
	
	//TODO - IMPLEMENTAR OS NOVOS CAMPOS. ATE ESTE MOMENTO AINDA NAO HAVIAMOS CRIADO OS CAMPOS DA ULTIMA PARTE - FORNECEDOR/LOJA, GL CODE, ETC.
	//form.setEnabled("rd_aprovGestor_dpt_head",enable);
	//form.setEnabled("descricao_dpt_head",enable);
	form.setEnabled("rateioChurch",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	form.setEnabled("spnRemoveChild",enable);
	form.setEnabled("requesting_church_grid",enable);
	form.setEnabled("txt_percent_grid",enable);
	
	form.setVisibleById("add_church",enable);
	form.setVisibleById("spnRemoveChild",enable);
	
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i], enable); 
		form.setEnabled("txt_percent_grid___"+indexesChurch[i], enable);
//		form.setVisibleById("spnRemoveChild___"+indexesChurch[i],enable);
	} 
	
	form.setEnabled("add_church",enable);
	
}
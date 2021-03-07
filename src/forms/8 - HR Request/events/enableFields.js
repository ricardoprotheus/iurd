function enableFields(form){
	
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEAD				= form.getValue("ATIV_DPT_HEAD");
	var ATIV_SUPERVISOR				= form.getValue("ATIV_SUPERVISOR");
	
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		secretaryEnable(form,true);
		stateLeaderEnable(form,false);
		dptHeadEnable(form,false);
		supervisorEnable(form,false);
	}else if(activity == ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		stateLeaderEnable(form,true);
		dptHeadEnable(form,false);
		supervisorEnable(form,false);
	}else if(activity == ATIV_DPT_HEAD){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeadEnable(form,true);
		supervisorEnable(form,false);
	}else if(activity == ATIV_SUPERVISOR){
		secretaryEnable(form,false);
		stateLeaderEnable(form,false);
		dptHeadEnable(form,false);
		supervisorEnable(form,true);
	}	
	
}

function secretaryEnable(form,enable){
	
	form.setEnabled("txt_address",enable);
	form.setEnabled("rd_requisicao",enable);
	form.setEnabled("txt_nomeCompleto",enable);
	form.setEnabled("rd_aplicacao",enable);
	form.setEnabled("rd_tipoMembro",enable);
	form.setEnabled("rd_planoSaude",enable);
	form.setEnabled("rd_configurarDeposito",enable);
	form.setEnabled("notas",enable);
	form.setEnabled("rd_documentos",enable);
	form.setEnabled("zoom_state",enable);
	form.setEnabled("start_date",enable);

}

function stateLeaderEnable(form,enable){
	form.setEnabled("txt_gestor",enable);
	form.setEnabled("txt_dataAprovacao",enable);
	form.setEnabled("rd_aprovacaoGestor",enable);
	form.setEnabled("descricao",enable);
}

function dptHeadEnable(form,enable){
	form.setEnabled("rd_deptHead",enable);
	form.setEnabled("txt_feedbackDeptHead",enable);
}

function supervisorEnable(form,enable){
	form.setEnabled("rd_aprovacaoGestor_supervisor",enable);
	form.setEnabled("descricao_supervisor",enable);
}
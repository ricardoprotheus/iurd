function displayFields(form,customHTML){ 
	
	var activity 	= getValue("WKNumState");
	var complete   	= getValue("WKCompletTask");
	var user 		= getValue("WKUser");
	var locale 		= getValue("WKUserLocale");
	var num_solic 	= getValue("WKNumProces");
	
	var mobile 		= 'false';
	
	var dtNow 		= new java.util.Date();
	var sdf 		= new java.text.SimpleDateFormat("dd/MM/yyyy");
	var data 		= sdf.format(dtNow);
	
	var hour 		= new java.text.SimpleDateFormat("kk:mm");
	var hora 		= hour.format(dtNow);
	
	var c1 			= DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var constraints = new Array(c1);
	var colleagueMap= DatasetFactory.getDataset("colleague", null, constraints, null);
	
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
    var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEADER				= form.getValue("ATIV_DPT_HEADER");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	
	var mode 						= form.getFormMode();
	
	//log.info("<<< TESTE DISPLAYFIELDS FORM UTILITIES: " + user);
	
	form.setValue("atividade",activity);
	form.setValue("hd_numProcesso", num_solic);
	
	if (form.getMobile() != null && form.getMobile()) {
		mobile = 'true';
	} 
	
	if (mode == "ADD" || mode == "MOD"){
		
		if((activity == ATIV_INICIAL) || activity == "0"){
			form.setValue("txt_solicitante", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol",data);
			form.setValue("txt_hourFirst", hora);
		}else if(activity == ATIV_STATE_LEADER){
			form.setValue("txt_gestor_state_leader", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_state_leader",data);
			form.setValue("txt_horaAprov_state_leader", hora);
		}else if(activity == ATIV_DPT_HEADER){
			form.setValue("txt_responsibleDeptHead", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dateDeptHead",data);
			form.setValue("txt_hourDeptHead", hora);
		}else if(activity == ATIV_DIVISION){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_division",data);
			form.setValue("txt_horaAprovacao_division", hora);
		}
	}	
	
	customHTML.append("<script>");
	customHTML.append("mode = '"+ form.getFormMode()+"';");
	customHTML.append("state = "+ activity + ";");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append("mobile = "+ mobile + ";");
	customHTML.append("locale = '"+ locale + "';");
	customHTML.append("num_solic = '"+ num_solic + "';");
	//customHTML.append(" exibeCampos();");
	customHTML.append("</script>");
	
}
function displayFields(form,customHTML){ 
	
	var state 		=  getValue("WKNumState");
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
	
	var ATIVIDADE_INICIAL			= (state == 0 || state == 4);
    var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 17);
	var ATIV_DIVISION				= (state == 37);
	var ATIV_SUPERVISOR				= (state == 19);
	var ATIV_VP						= (state == 21);
	var ATIV_DPT_HEADER_FIM			= (state == 23);
	
	var mode 						= form.getFormMode();
	
	form.setValue("atividade",state);
	form.setValue("hd_numProcesso", num_solic);
	
	if (form.getMobile() != null && form.getMobile()) {
		mobile = 'true';
	} 
	
	if (mode == "ADD" || mode == "MOD"){
		
		if(ATIVIDADE_INICIAL){
			form.setValue("txt_solicitante", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol",data);
			form.setValue("txt_hourFirst", hora);
			form.setValue("emailSecretary", colleagueMap.getValue(0,"mail")); //Alterado Thiago Oliveira
		}else if(ATIV_STATE_LEADER){
			form.setValue("txt_gestor_state_leader", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_state_leader",data);
			form.setValue("txt_horaAprov_state_leader", hora);
		}else if(ATIV_DPT_HEADER_APPROVALL){
			form.setValue("txt_responsibleDeptHead", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dateDeptHead",data);
			form.setValue("txt_hourDeptHead", hora);
		}else if(ATIV_DIVISION){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_division",data);
			form.setValue("txt_horaAprovacao_division", hora);
		}else if(ATIV_SUPERVISOR){
			form.setValue("txt_gestor_supervisor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_supervisor",data);
			form.setValue("txt_horaAprovacao_supervisor", hora);
		}else if(ATIV_VP){
			form.setValue("txt_gestor_vp", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_vp",data);
			form.setValue("txt_horaAprovacao_vp", hora);
		}
	}	
	
	customHTML.append("<script>");
	customHTML.append("mode = '"+ form.getFormMode()+"';");
	customHTML.append("state = "+ state + ";");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append("mobile = "+ mobile + ";");
	customHTML.append("locale = '"+ locale + "';");
	customHTML.append("num_solic = '"+ num_solic + "';");
	//customHTML.append(" exibeCampos();");
	customHTML.append("</script>");	
}
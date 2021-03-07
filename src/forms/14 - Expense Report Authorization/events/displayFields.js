function displayFields(form,customHTML){
	var user     	= getValue("WKUser");
	var state 		= getValue("WKNumState");
	var modoView 	= form.getFormMode();
	var num_solic 	= getValue("WKNumProces");
	var complete   	= getValue("WKCompletTask");
	var user 		= getValue("WKUser");
	var locale 		= getValue("WKUserLocale");
	
	form.setValue("atividade",state);
	if( modoView != "VIEW"  ){
		form.setValue("aux1",modoView);
	}
	var dtNow = new java.util.Date();
	var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var data = sdf.format(dtNow);
	
	var hour = new java.text.SimpleDateFormat("kk:mm");
	var hora = hour.format(dtNow);
	 
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var constraints = new Array(c1);
	var colleagueMap = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	var ATIVIDADE_INICIAL			= (state==0 || state==4); 
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	form.setValue("hd_numProcesso", num_solic);
	
	if(ATIVIDADE_INICIAL){
		if( modoView != "VIEW"  ){
			form.setValue("txt_solicitante", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol",data);
			form.setValue("txt_hourFirst", hora);
			form.setValue("emailSecretary", colleagueMap.getValue(0,"mail")); //Alterado Thiago Oliveira
		}
	}else if (ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao",data);
			form.setValue("txt_horaAprovacao", hora);
		}
	}else if (ATIV_DPT_HEADER_APPROVALL){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_dpt_head", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_dpt_head",data);
			form.setValue("txt_hrAprov_dpt_head", hora);
		}
	}else if (ATIV_DIVISION){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_division",data);
			form.setValue("txt_hrAprov_division", hora);
		}
	}
	
	customHTML.append("<script>");
	customHTML.append("mode = '"+ modoView+"';");
	customHTML.append("state = "+ state + ";");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append("locale = '"+ locale + "';");
	customHTML.append("num_solic = '"+ num_solic + "';");
	customHTML.append("</script>");	
	
}
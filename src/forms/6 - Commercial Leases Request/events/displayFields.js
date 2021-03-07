function displayFields(form,customHTML){ 
	var user     					= getValue("WKUser");
	var activity 					= getValue("WKNumState");
	var modoView					= form.getFormMode();
	var complete   					= getValue("WKCompletTask");
	var locale 						= getValue("WKUserLocale");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	//var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_COMMERCIAL_APPROVAL	= form.getValue("ATIV_COMMERCIAL_APPROVAL");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_COMMERCIAL_FIM			= form.getValue("ATIV_COMMERCIAL_FIM");
	var num_solic 					= getValue("WKNumProces");
	
	form.setValue("hd_numProcesso", num_solic);
	form.setValue("atividade",activity);
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
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if( modoView != "VIEW"  ){
			form.setValue("txt_solicitante", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol",data);
			form.setValue("txt_hourFirst", hora);
			form.setValue("emailSecretary", colleagueMap.getValue(0,"mail"));
		}
	}else if(activity == ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao",data);
			form.setValue("txt_horaAprovacao", hora);
		}
	}else if(activity == ATIV_COMMERCIAL_APPROVAL){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_cl", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_cl",data);
			form.setValue("txt_hrAprov_cl", hora);
		}
	}else if (activity == ATIV_VP){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_vp", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_vp",data);
			form.setValue("txt_hrAprov_vp", hora);
		}
	}else if (activity == ATIV_DIVISION){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_division",data);
			form.setValue("txt_hrAprov_division", hora);
		}
	}else if(activity == ATIV_COMMERCIAL_FIM){
		if( modoView != "VIEW"  ){
			form.setValue("txt_respons_commercial_fim", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_commercial_fim",data);
			form.setValue("txt_hour_commercial_fim", hora);
		}
	}
	
	customHTML.append("<script>");
	customHTML.append("mode = '"+ modoView+"';");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append("locale = '"+ locale + "';");
	customHTML.append("num_solic = '"+ activity + "';");
	customHTML.append("</script>");	
	
}
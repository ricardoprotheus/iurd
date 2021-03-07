function displayFields(form,customHTML){

	var user     					= getValue("WKUser");
	var activity 					= getValue("WKNumState");
	var modoView 					= form.getFormMode();
	var complete   					= getValue("WKCompletTask");
	var locale 						= getValue("WKUserLocale");
	var num_solic 					= getValue("WKNumProces");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_DPT_HEAD				= form.getValue("ATIV_DPT_HEAD");
	var ATIV_SUPERVISOR				= form.getValue("ATIV_SUPERVISOR");
	
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
	}else if(activity == ATIV_DPT_HEAD){
		if( modoView != "VIEW"  ){
			form.setValue("txt_responsibleDeptHead", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dateDeptHead",data);
			form.setValue("txt_hourDeptHead", hora);
		}	
	}else if(activity == ATIV_SUPERVISOR){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_supervisor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_supervisor",data);
			form.setValue("txt_horaAprovacao_supervisor", hora);
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
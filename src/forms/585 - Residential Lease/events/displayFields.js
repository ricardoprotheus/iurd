function displayFields(form,customHTML){ 
	var user     					= getValue("WKUser");
	var activity 					= getValue("WKNumState");
	var modoView 					= form.getFormMode();
	var complete   					= getValue("WKCompletTask");
	var locale 						= getValue("WKUserLocale");
	var num_solic 					= getValue("WKNumProces");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
	var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_DPT_HEAD				= form.getValue("ATIV_DPT_HEAD");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_DPT_HEADER_FIM			= form.getValue("ATIV_DPT_HEADER_FIM");
	var tipoFormulario				= form.getValue("txt_tipoRequisicao");
	
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
			form.setValue("emailSecretary", colleagueMap.getValue(0,"mail")); //Alterado Thiago Oliveira
		}
	}else if(activity == ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_state_leader", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_aprov_state",data);
			form.setValue("txt_hora_aprov_state", hora);
		}
	}else if (ATIV_NATIONAL_LEADER.indexOf(activity) != -1){
		//log.info("<<< entrou no ATIV_NATIONAL_LEADER" );
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_national_leader", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_nl",data);
			form.setValue("txt_horaAprov_national_leader", hora);
		}	
	}else if(activity == ATIV_DPT_HEAD){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_dpt_head", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_dpt_head",data);
			form.setValue("txt_hrAprov_dpt_head", hora);
		}
	}else if (ATIV_DIVISION.indexOf(activity) != -1){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_division",data);
			form.setValue("txt_hrAprov_division", hora);
		}
	}else if (ATIV_VP.indexOf(activity) != -1){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_vp", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_vp",data);
			form.setValue("txt_hrAprov_vp", hora);
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if( modoView != "VIEW"  ){
			form.setValue("txt_responsible_dh", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol_dh",data);
			form.setValue("txt_hourFirst_dh", hora);
			if(tipoFormulario == "novo" || tipoFormulario == "recisaoAntecip"){
				form.setValue("txt_gestor_dpt_head", colleagueMap.getValue(0,"colleagueName"));
				form.setValue("txt_dtaprov_dpt_head",data);
				form.setValue("txt_hrAprov_dpt_head", hora);
			}
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
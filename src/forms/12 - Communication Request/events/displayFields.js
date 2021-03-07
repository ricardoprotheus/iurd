function displayFields(form,customHTML){
	
	var activity					= getValue("WKNumState");
	var ATIV_INICIAL				= (activity == 0 || activity == 4);
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	var user     					= getValue("WKUser");
	var modoView 					= form.getFormMode();
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
	
	if(ATIV_INICIAL){
		if( modoView != "VIEW"  ){
			form.setValue("txt_solicitante", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_data_sol",data);
			form.setValue("txt_hourFirst", hora);
			form.setValue("emailSecretary", colleagueMap.getValue(0,"mail"));
		}
	}else if (ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao",data);
			form.setValue("txt_horaAprovacao", hora);
		}
	/*
	}else if (ATIV_NATIONAL_LEADER){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_national_leader", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao_nl",data);
			form.setValue("txt_horaAprov_national_leader", hora);
		}
	*/	
	}else if (ATIV_DPT_HEADER_APPROVALL){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_dpt_head", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_dpt_head",data);
			form.setValue("txt_hrAprov_dpt_head", hora);
		}
	}else if (ATIV_VP){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_division", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_division",data);
			form.setValue("txt_hrAprov_division", hora);
		}
	}else if (ATIV_DIVISION){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor_vp", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dtaprov_vp",data);
			form.setValue("txt_hrAprov_vp", hora);
		}
	}
	/*else if (ATIV_DPT_HEADER_FIM){
		if( modoView != "VIEW"  ){
			form.setValue("txt_gestor", colleagueMap.getValue(0,"colleagueName"));
			form.setValue("txt_dataAprovacao",data);
			form.setValue("txt_horaAprovacao", hora);
		}
		
	}*/
}
function displayFields(form,customHTML){
    var activity = getValue("WKNumState");
	var process  = getValue("WKNumProces");
	var user     = getValue("WKUser");
	var modoView = form.getFormMode();

	//DATA
	var dtNow = new java.util.Date();
	var sdf   = new java.text.SimpleDateFormat("dd/MM/yyyy");
	var data  = sdf.format(dtNow);

	//HORA
	var hour = new java.text.SimpleDateFormat("kk:mm");
	var hora = hour.format(dtNow);

	//NOME ATUAL
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var constraints = new Array(c1);
	var colleagueMap = DatasetFactory.getDataset("colleague", null, constraints, null);

	//PARÂMETROS GERAIS
	form.setValue("aux1",modoView);
	form.setValue("hd_numAtividade", activity);
	form.setValue("hd_numProcesso", process);
	form.setShowDisabledFields(true);
    form.setHidePrintLink(true)

    if(activity == 0 || activity == 4){
       form.setValue("txt_requesterFirst", colleagueMap.getValue(0,"colleagueName"));
       form.setValue("txt_dateFirst", data);
       form.setValue("txt_hourFirst", hora);
       form.setValue("emailSecretary", colleagueMap.getValue(0,"mail")); //Alterado Thiago Oliveira
	}
	
	if(activity == 5){
		form.setValue("txt_responsibleState", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateState", data);
		form.setValue("txt_hourState", hora);
	}

	if(activity == 46){
		form.setValue("txt_responsibleNational", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateNational", data);
		form.setValue("txt_hourNational", hora);
	}

	if(activity == 15){
		form.setValue("txt_responsibleIT", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateIT", data);
		form.setValue("txt_hourIT", hora);
	}

	if(activity == 19){
		form.setValue("txt_responsibleDeptHead", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateDeptHead", data);
		form.setValue("txt_hourDeptHead", hora);
	}

	if(activity == 25){
		form.setValue("txt_responsibleDivisionHead", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateDivision", data);
		form.setValue("txt_hourDivision", hora);
	}
	
	if(activity == 33){
		form.setValue("txt_responsibleVP", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateVP", data);
		form.setValue("txt_hourVP", hora);
	}

	if(activity == 53 || activity == 60){
		form.setValue("txt_responsibleDeptHead", colleagueMap.getValue(0,"colleagueName"));
		form.setValue("txt_dateDeptHead", data);
		form.setValue("txt_hourDeptHead", hora);
	}
}
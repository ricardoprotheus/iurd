function displayFields(form,customHTML){ 
	
	var state =  getValue("WKNumState");
	var complete   = getValue("WKCompletTask");
	var user = getValue("WKUser");
	var locale = getValue("WKUserLocale");
	var num_solic = getValue("WKNumProces");
	
	var mobile = 'false';
	
	if (form.getMobile() != null && form.getMobile()) {
		mobile = 'true';
	} 
	
	if (form.getFormMode() == "VIEW"){
		form.setShowDisabledFields(true);
	}else if(form.getFormMode() == "ADD"){
		form.setValue("id_solicitante", user);
	}

	customHTML.append("<script>");
	customHTML.append("mode = '"+ form.getFormMode()+"';");
	customHTML.append("state = "+ state + ";");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append("mobile = "+ mobile + ";");
	customHTML.append("locale = '"+ locale + "';");
	customHTML.append("num_solic = '"+ num_solic + "';");
	customHTML.append(" exibeCampos();");
	customHTML.append("</script>");	
}
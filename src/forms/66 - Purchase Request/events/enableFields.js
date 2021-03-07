function enableFields(form){
	var activity 					= getValue("WKNumState");
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 44);
	
	if(ATIV_INICIAL){
		secretaryEnable(form,true);
		secretDptHeadEnable(form,true);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_STATE_LEADER){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,true);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_NATIONAL){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,true);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_IT){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,true);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DPT_HEADER_APPROVALL){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,true);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DIVISION){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,true);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_VP){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,true);
		dptHeadIntegrEnable(form,false);
	}else if(ATIV_DPT_HEADER_FIM){
		secretaryEnable(form,false);
		secretDptHeadEnable(form,true);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,true);
	}else{
		secretaryEnable(form,false);
		secretDptHeadEnable(form,false);
		stateLeaderEnable(form,false);
		nationalEnable(form,false);
		itEnable(form,false);
		dptHeadApprovalEnable(form,false);
		divisionHeadEnable(form,false);
		vpEnable(form,false);
		dptHeadIntegrEnable(form,false);
	}
}

function secretaryEnable(form,enable){
	
	form.setEnabled("orderFor",enable);
	form.setEnabled("txt_store",enable);
	form.setEnabled("criteria",enable);
	form.setEnabled("computer",enable);
	form.setEnabled("networking",enable);
	form.setEnabled("studio",enable);
	form.setEnabled("surveillance",enable);
	form.setEnabled("printer",enable);
	form.setEnabled("detailFirst",enable);
	
	}

function stateLeaderEnable(form,enable){
	form.setEnabled("rd_approveState",enable);
	form.setEnabled("txt_feedbackState",enable);
}

function nationalEnable(form,enable){
	form.setEnabled("rd_approveNational",enable);
	form.setEnabled("txt_feedbackNational",enable);
}

function itEnable(form,enable){
	form.setEnabled("rd_IT",enable);
	form.setEnabled("txt_feedbackIT",enable);
}


function dptHeadApprovalEnable(form,enable){
	form.setEnabled("rd_deptHead",enable);
	form.setEnabled("txt_feedbackDeptHead",enable);
}


function divisionHeadEnable(form,enable){
	form.setEnabled("rd_division",enable);
	form.setEnabled("txt_feedbackDivision",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_VP",enable);
	form.setEnabled("txt_feedbackVP",enable);
}

function dptHeadIntegrEnable(form,enable){
	
	var indexesProduct 	= form.getChildrenIndexes("table_product");
	var indexesChurch 	= form.getChildrenIndexes("table_church");
	
	form.setEnabled("supplierCode",enable);
	form.setEnabled("invoiceNumber",enable);
	form.setEnabled("department",enable);
	form.setEnabled("rateioChurch",enable);
	form.setEnabled("requesting_church",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	form.setEnabled("spnRemoveChildChurch",enable);
	form.setEnabled("requesting_church_grid",enable);
	form.setEnabled("txt_percent_grid",enable);	
	
	for (var i=0; i<indexesProduct.length; ++i){  
		form.setEnabled("classes___"+indexesProduct[i], enable);
		form.setEnabled("txt_inflowType___"+indexesProduct[i], enable);
		form.setEnabled("txt_discount___"+indexesProduct[i], enable);
		}

		
	form.setVisibleById("add_church",enable);
	form.setVisibleById("spnRemoveChildChurch",enable);
		
	for (var i=0; i<indexesChurch.length; ++i){ 
		form.setEnabled("requesting_church_grid___"+indexesChurch[i], enable); 
		form.setEnabled("txt_percent_grid___"+indexesChurch[i], enable);
	} 
		
	 
}

function secretDptHeadEnable(form,enable){
	
	var indexesProduct 	= form.getChildrenIndexes("table_product");
	
	form.setEnabled("rd_shipping",enable);
	form.setEnabled("txt_shippingCost",enable);
	form.setEnabled("paymentTerm",enable);
	form.setEnabled("rd_check",enable);
	form.setEnabled("txt_contactName",enable);
	form.setEnabled("txt_phoneNumber",enable);
	form.setEnabled("txt_email",enable);
	form.setEnabled("txt_notes",enable);
	
	for (var i=0; i<indexesProduct.length; ++i){  
		
		form.setEnabled("requesting_product___"+indexesProduct[i], enable);
		form.setEnabled("txt_quantity___"+indexesProduct[i], enable);
		form.setEnabled("txt_unitValue___"+indexesProduct[i], enable);
		form.setEnabled("txt_tax___"+indexesProduct[i], enable);
		
		//form.setVisibleById("spnRemoveChild___"+indexesProduct[i],enable);
	} 
	
}
function enableFields(form){ 
	
	var activity 					= getValue("WKNumState");
	var modoView 					= form.getFormMode();
	var complete   					= getValue("WKCompletTask");
	var ATIV_INICIAL				= form.getValue("ATIV_INICIAL");
	var ATIV_STATE_LEADER			= form.getValue("ATIV_STATE_LEADER");
//	var ATIV_NATIONAL_LEADER		= form.getValue("ATIV_NATIONAL_LEADER");
	var ATIV_PCH_DPT_HEADER			= form.getValue("ATIV_PCH_DPT_HEADER");
	var ATIV_DIVISION				= form.getValue("ATIV_DIVISION");
	var ATIV_VP						= form.getValue("ATIV_VP");
	var ATIV_PCH_DPT_HEADER_FIM		= form.getValue("ATIV_PCH_DPT_HEADER_FIM");
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,true);
			secretDptHeadEnable(form,true); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,false);
			vpEnable(form,false);
			dptEnablrHeadFim(form,false);
		}
	}else if (activity == ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,false); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,true);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,false);
			vpEnable(form,false);
			dptEnablrHeadFim(form,false);
		}
/*
	}else if (activity == ATIV_NATIONAL_LEADER){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,false); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			nationalLeaderEnable(form,true);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,false);
			vpEnable(form,false);
			dptEnablrHeadFim(form,false);
		}
	*/	
	}else if (activity == ATIV_PCH_DPT_HEADER){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,false); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,true);
			divisionHeadEnable(form,false);
			vpEnable(form,false);
			dptEnablrHeadFim(form,false);
		}
	}else if (activity == ATIV_DIVISION){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,false); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,true);
			vpEnable(form,false);
			dptEnablrHeadFim(form,false);
		}
	}else if (activity == ATIV_VP){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,false); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,false);
			vpEnable(form,true);
			dptEnablrHeadFim(form,false);
		}
	}else if (activity == ATIV_PCH_DPT_HEADER_FIM){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			secretDptHeadEnable(form,true); //campos que tanto secretaria quanto dpt head podem alterar.
			stateLeaderEnable(form,false);
			//nationalLeaderEnable(form,false);
			dptHeadApprovalEnable(form,false);
			divisionHeadEnable(form,false);
			vpEnable(form,false);
			dptEnablrHeadFim(form,true);
		}
	}									
	
}

function secretaryEnable(form,enable){
	
	var indexesProduct 	= form.getChildrenIndexes("table_product");
		
	form.setEnabled("orderFor",enable);
	form.setEnabled("txt_store",enable);
	form.setEnabled("rd_documentos",enable);
			
}

function stateLeaderEnable(form,enable){ 
	form.setEnabled("rd_aprovacaoGestor",enable);
	form.setEnabled("descricao",enable);
}

/*
function nationalLeaderEnable(form,enable){
	form.setEnabled("rd_aprovGestor_national_leader",enable);
	form.setEnabled("descricao_national_leader",enable);
}
*/

function dptHeadApprovalEnable(form,enable){
	form.setEnabled("rd_pchDptHead",enable);
	form.setEnabled("txt_feedbackPchDptHead",enable);
}

function divisionHeadEnable(form,enable){
	form.setEnabled("rd_aprovGestor_division",enable);
	form.setEnabled("descricao_division",enable);
}

function vpEnable(form,enable){
	form.setEnabled("rd_aprovGestor_vp",enable);
	form.setEnabled("descricao_vp",enable);
}

function dptEnablrHeadFim(form,enable){
	
	var indexesProduct 	= form.getChildrenIndexes("table_product");
	var indexesChurch 	= form.getChildrenIndexes("table_church");

	form.setEnabled("rateioChurch",enable);
	form.setEnabled("zoom_igreja",enable);
	form.setEnabled("add_church",enable);
	form.setEnabled("spnRemoveChildChurch",enable);
	form.setEnabled("requesting_church_grid",enable);
	form.setEnabled("txt_percent_grid",enable);
	form.setEnabled("supplierCode",enable);
	//form.setEnabled("deliveryCity",enable);
	//form.setEnabled("issueCity",enable);
	form.setEnabled("invoiceNumber",enable);
	form.setEnabled("department",enable);
	//somente quando for falso que desabiltiamos, pois quando for falso indica que estamos em outras tarefas que nao sejam do dpt head. 
	//Na tarefa do dpt head e da secretaria, o enable é feito pela funcao blockBank()- temos uma regra para verificar o pagamento para poder habilitar / desabilitar o campo. 
	//if(!enable){
	//	form.setEnabled("bank",enable);
	//}
	
	for (var i=0; i<indexesProduct.length; ++i){  
		
		form.setEnabled("classes___"+indexesProduct[i], enable);
		form.setEnabled("txt_inflowType___"+indexesProduct[i], enable);
		form.setEnabled("txt_discount___"+indexesProduct[i], enable);
		
		//form.setVisibleById("spnRemoveChild___"+indexesProduct[i],enable);
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
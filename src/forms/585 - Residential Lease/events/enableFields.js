function enableFields(form){ 
	
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
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,true);
			dptHeadEnable(form,false);
		}
	}else if(activity == ATIV_STATE_LEADER){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,false);
		}
	}else if (ATIV_NATIONAL_LEADER.indexOf(activity) != -1){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,false);
		}	
	}else if(activity == ATIV_DPT_HEAD){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,false);
		}
	}else if (ATIV_DIVISION.indexOf(activity) != -1){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,false);
		}
	}else if (ATIV_VP.indexOf(activity) != -1){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,false);
		}
	}else if(activity == ATIV_DPT_HEADER_FIM){
		if( modoView != "VIEW"  ){
			secretaryEnable(form,false);
			dptHeadEnable(form,true);
			/*
			if(tipoFormulario == "tranfer" || tipoFormulario == "renovacao"){
				dptHeadEnable(form,false);
			}else{
				dptHeadEnable(form,true);
			}
			*/
		}
	}
}

function secretaryEnable(form,enable){
	form.setEnabled("zoom_supplier",enable);
	form.setEnabled("zoom_state",enable);
	form.setEnabled("fluig_process_zoom",enable);
}

function dptHeadEnable(form,enable){
	form.setEnabled("classes",enable);
	form.setEnabled("zoom_department",enable);
	form.setEnabled("zoom_igreja",enable);
}
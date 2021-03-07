function loadform(){
		
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_SUPERVISOR				= $("#ATIV_SUPERVISOR").val();
	
	//ajuste em razao de erro de quando cai na atividade MOVE. Fica com error log no inspect object porque nao consegue ler as bibliotecas de calendar nesta etapa.
	if (activity != "" && mode!= "VIEW")
	{
		addmascara();
		carregaData();
	}
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
			},150);
		}
	}else if(activity == ATIV_STATE_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_gestor');
				abreColapse('divAprovacao');
			},150);
		}
	}else if(activity == ATIV_DPT_HEAD){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_deptHead');
				abreColapse('divDepartmentHead');
				$("#divDepartment").hide();
			},150);
		}
	}else if(activity == ATIV_SUPERVISOR){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovacaoGestor_supervisor');
				abreColapse('divSupervisor');
				$("#divDepartment").hide();
			},150);
		}
	}
	
}

function setSelectedZoomItem(selectedItem) {
	var inputId 					= selectedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var activity					= $("#atividade").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_SUPERVISOR				= $("#ATIV_SUPERVISOR").val();
		
	if((activity == ATIV_INICIAL) || activity == "0"){
		if (zoomName == "zoom_state") {
			var selectcode		= selectedItem.code;
			var selectDescription = selectedItem.Description;
			$("#code_state").val(selectcode);
			$("#name_state").val(selectDescription);
		}
	}

}

function removedZoomItem(removedItem) {
	var activity					= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_SUPERVISOR				= $("#ATIV_SUPERVISOR").val();
		
	if((activity == ATIV_INICIAL|| activity == "0") || activity == "0"){
		if (zoomName == "zoom_state") {
			$("#name_state").val("");
		}
	}
	
}

function addmascara(){
	$("#txt_pagamento").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#txt_valorTotal").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
}

function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function carregaData(){
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#start_date',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
}

function beforeSendValidate(){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
	var ATIV_DPT_HEAD				= $("#ATIV_DPT_HEAD").val();
	var ATIV_SUPERVISOR				= $("#ATIV_SUPERVISOR").val();
	
	
if (activity == ATIV_INICIAL|| activity == "0"){
		
		//confirmando se o estado foi preenchido.
		var state = $("#code_state").val();
		if(state.trim() == "" || state.trim() == "undefined" || state.trim() == null){
			throw "Please, select the state!";
		}else{
			var state 						= $("#code_state").val();
			var mailUserLogado				= $("#emailSecretary").val();
			var mailNextResponsible			= getMailRespons(mailUserLogado,state);
			
			if(mailNextResponsible.trim() == "undefined" || mailNextResponsible.trim() == ""){
				var msgThrow = "If was not possible to find the user responsible for the next Task.";
				msgThrow	 += " Please, check with the IT Team if the register on protheus is ok (table ZRL). Secretary mail: "+mailUserLogado;
				msgThrow	 += " (Check also the state leader and state for the secretary) - State "+state.trim()+".";
				throw msgThrow;
			}else{
				var nextResponsible				= getResponsible(mailNextResponsible);
				if(nextResponsible.trim() == "undefined" || nextResponsible.trim() == ""){
					var msgThrow = "If was not possible to find the user responsible on fluig for the next Task.";
					msgThrow	 += " Please, check with the IT Team if the register on fluig for the email "+mailNextResponsible.trim() + " exists.";
					throw msgThrow;
				}else{	
					$("#nextResponsible").val(nextResponsible);
				}	
			}
		}	
	}

			
}

function getMailRespons(mailUserLogado,state){
	
	//criamos a constraint, informando que vamos filtrar o campo mail (mail é uma coluna do dataset Colleague)
	var c1 				= DatasetFactory.createConstraint("secretary", mailUserLogado, mailUserLogado, ConstraintType.MUST);
	var c2 				= DatasetFactory.createConstraint("states", state, state, ConstraintType.MUST);
	var constraints 	= new Array(c1,c2);
	
	//aqui fazemos a consulta no dataset colleague, passando nossa constraint para que retorne somente um usuario através do email.
	var colleagueMap	= DatasetFactory.getDataset("roles", null, constraints, null);
	
	//aqui pegamos o valor retornado do dataset.
	var mailStateLeader = "";
	if(colleagueMap.values.length == 1){
		//tivemos um erro que no filtro nao existia o email passado, e a funcao retornou todos os registros do dataset, ao inves de nenhum. 
		//Por isto, reforçamos a verificacao abaixo, alem do filtro da constraints.
		if (colleagueMap.values[0]["secretary"].trim() == mailUserLogado.trim()){
			mailStateLeader = colleagueMap.values[0]["stateleader"];
		}
	}
	//return "oliveira.bruno"; //chumbando um id para testes.
	return mailStateLeader;
}

function getResponsible(mailNextRespons){
	
	//criamos a constraint, informando que vamos filtrar o campo mail (mail é uma coluna do dataset Colleague)
	var c1 				= DatasetFactory.createConstraint("mail", mailNextRespons, mailNextRespons, ConstraintType.MUST);
	var constraints 	= new Array(c1);
	
	//aqui fazemos a consulta no dataset colleague, passando nossa constraint para que retorne somente um usuario através do email.
	var colleagueMap	= DatasetFactory.getDataset("colleague", null, constraints, null);
	
	//aqui pegamos o valor retornado do dataset.
	var idUserFluig = "";
	if(colleagueMap.values.length == 1){
		//tivemos um erro que no filtro nao existia o email passado, e a funcao retornou todos os registros do dataset, ao inves de nenhum. 
		//Por isto, reforçamos a verificacao abaixo, alem do filtro da constraints.
		if (colleagueMap.values[0]["mail"].trim() == mailNextRespons.trim()){
			idUserFluig 	= colleagueMap.values[0]["colleaguePK.colleagueId"];
		}
	}
	//return "oliveira.bruno"; //chumbando um id para testes.

	return idUserFluig
}

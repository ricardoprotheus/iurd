function loadform(){

	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	selectChurch();
	
	if (activity != "" && mode!= "VIEW"){
		addmascara();
		carregaData();
	}
	
	if(!(ATIV_DPT_HEADER_FIM)){
		hideButtonChurch();
	}
	
	if(ATIV_INICIAL){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba inicial
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_STATE_LEADER){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor');
				abreColapse('divAprovacao');
				$("#divDepartment").hide();
			},150);
		}
	/*
	}else if(ATIV_NATIONAL_LEADER){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_national_leader');
				abreColapse('divNationalLeader');
				$("#divDepartment").hide();
			},150);
		}
	*/	
	}else if(ATIV_DPT_HEADER_APPROVALL){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_dpt_head');
				abreColapse('divDptHead');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_DIVISION){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_division');
				abreColapse('divDivision');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_VP){
		
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				scrollFocus('txt_gestor_vp');
				abreColapse('divVP');
				$("#divDepartment").hide();
			},150);
		}
	}else if(ATIV_DPT_HEADER_FIM){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){//abre aba de Aprovação
				$("#divDepartment").show();
				scrollFocus('invoiceNumber');
				abreColapse('divDptHead');
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
	var ATIVIDADE_INICIAL			= (activity == 0 || activity == 4);
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	if(ATIVIDADE_INICIAL){
		if (zoomName == "zoom_term") {
			$("#txt_term_days").val(selectedItem.days);
		}else 	if (zoomName == "zoom_state") {
			var selectCode 			= selectedItem.code;
			var selectDescription 	= selectedItem.Description;
			$("#code_state").val(selectCode);
			$("#name_state").val(selectDescription);
		}
	}else if(ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);
		}else if (zoomName == "zoom_department") {
			$("#txt_department_code").val(selectedItem.code);
			$("#txt_department_description").val(selectedItem.descri);
		}else if (zoomName == "classes") {
			var selectCodeClasses	= selectedItem.code;
			$("#gl_code").val(selectCodeClasses);
		}else if (zoomName == "zoom_igreja") {
			 var selectEndereco = selectedItem.address;
			 var selectEstado = selectedItem.States;
			 $("#txt_endereco").val(selectEndereco);
			 $("#txt_estado").val(selectEstado); 
		}else if (zoomName == "requesting_church_grid") {
			$("#hd_requesting_church_grid___"+ idFilho).val(selectedItem.Church);
			$("#txt_state_grid___"+ idFilho).val(selectedItem.States);
			$("#txt_address_grid___"+ idFilho).val(selectedItem.address);
		}
	}	
}

function removedZoomItem(removedItem) {
	var activity					= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIVIDADE_INICIAL			= (activity == 0 || activity == 4);
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	//Alterado por Sergio Bruno -- 20201101
	if(ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
		}else if (zoomName == "requesting_church_grid") { //Limpa campos
			$("#hd_requesting_church_grid___"+ idFilho).val("");
			$("#txt_state_grid___"+ idFilho).val("");
			$("#txt_address_grid___"+ idFilho).val("");
			$("#txt_percent_grid___" + idFilho).val("0.00");
			$("#txt_percent_grid___"+idFilho).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
		}else if (removedItem.inputId == "zoom_supplier") {
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}else if (removedItem.inputId == "zoom_department") {
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");
		}else if (removedItem.inputId == "classes") {
			$("#gl_code").val("");
		}	
	}
}

function addmascara(){
	$("#txt_dataInicio").mask("99/99/9999");
	$("#txt_dataFinal").mask("99/99/9999");
	$("#txt_pagamentoPrograma").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#installfee").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	//$("#txt_total").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#txt_installment").mask('##0000', {reverse: true});
}

function carregaData(){
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#txt_dataInicio',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	var mySimpleCalendar2 = FLUIGC.calendar('#txt_dataFinal',{
		language: 'en'
	});
	mySimpleCalendar2.setMinDate(dataAtual);
	var mySimpleCalendar = FLUIGC.calendar('#dataInstallFee',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	var mySimpleCalendar = FLUIGC.calendar('#dataInstallment',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
}

function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}

function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}


function selectChurch() {
	
	var radio = $("#rateioChurch:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxRadioChurch").val(radio);
	}else{
		radio = $("#auxRadioChurch").val();
	}
	
	if (radio == "yes") {
		$("#div_table_church").show();
		$("#div_church").hide();
	} else {
		$("#div_table_church").hide();
		$("#div_church").show();
	}
}

//funcao para adicionar produtos no grid e fazer também a contagem de produtos do grid.
function addChurch(idtable){
	
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	if (activity != ""){

		var linha = wdkAddChild(idtable);
		
		if(ATIV_DPT_HEADER_FIM){
		
			
			//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
		    $('#linha_church').val(linha);
		    
		    $("#txt_percent_grid___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
		    reloadZoomFilterValues("requesting_church_grid___"+linha, "States," +  $('#code_state').val()); //filtro de Church por State no grid
		}
	}
} 

function fnCustomDelete(oElement){
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);
	
	if (activity != "")
	{
		if(ATIV_DPT_HEADER_FIM){ 
			fnWdkRemoveChild(oElement);
		}
	}
}

function sumPercent(obj) {
	
	var qtdItens 			= linha_church.value;
	var totalPercent 		= 0;
	var linhaAtual 			= obj.id.split("___")[1];
	
	//varificando a somatoria de todas as linhas do grid.
	for (var i = 1; i <= qtdItens; i++) {
		var percentLinha = parseFloat($("#txt_percent_grid___" + i).val());
		if(percentLinha != null && !isNaN(percentLinha)){
			totalPercent += percentLinha;
		}
		if(totalPercent > 100){
			alert("Check the percentage. Maximum needs to be 100.00%")
			$("#txt_percent_grid___" + linhaAtual).val("0.00");
			$("#txt_percent_grid___" + linhaAtual).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
			$("#txt_percent_grid___" + linhaAtual).focus();
		}	
	}
}

function somarTitulo(){
	var vlrParcela 	= ($("#txt_pagamentoPrograma").val());
	var qtdParcelas = ($("#txt_installment").val());
	var valorFee	= ($("#installfee").val()); 
	
	//tirando a máscara dos campos antes da conversao de string para numerico.
	vlrParcela		= vlrParcela.replace(",","");
	qtdParcelas		= qtdParcelas.replace(",","");
	valorFee		= valorFee.replace(",","");
	
	//convertendo string para numerico.
	vlrParcela 	= (parseFloat(vlrParcela*100)); //multiplicamos por 100 por causa da regra da Freedom que trata o '.'.
	qtdParcelas = parseInt(qtdParcelas);
	valorFee	= (parseFloat(valorFee*100)); //multiplicamos por 100 por causa da regra da Freedom que trata o '.'.
	
	if (isNaN(vlrParcela)){
		vlrParcela = 0;
	}
	
	if (isNaN(qtdParcelas)){
		qtdParcelas = 0;
	}
	
	if (isNaN(valorFee)){
		valorFee = 0;
	}
	
	var total 		= (vlrParcela * qtdParcelas) + valorFee;
		
	$("#txt_total").val(formatarMoeda(total));
	
}

function selectFee() {
	
	var radio = $("#rd_fee:checked").val();

	if (radio == "sim") {
		$("#installfee").attr('disabled', false);
		$("#dataInstallFee").attr('disabled', false);
		ajustarBackgroundColor('dataInstallFee','white');
	} else {
		$("#installfee").attr('disabled', true);
		$("#dataInstallFee").attr('disabled', true);
		//window["installfee"].clear()
		$("#installfee").val("0.00")
		$("#dataInstallFee").val("")
		ajustarBackgroundColor('dataInstallFee','#f2f2f2');
	}
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function formatarMoeda(numero) {

	if (isNaN(numero)) return "0.00";

	// Descobre se o valor é negativo e extrai o sinal.
	var negativo = numero < 0;
	numero = Math.abs(numero);

	// Usado para produzir a resposta, caractere por caractere.
	var resposta = "";

	// Converte o número para string.
	var t = numero + "";

	// Itera cada caractere do número, de trás para frente.
	for (var i = t.length - 1; i >= 0; i--) {
		var j = t.length - i;

		// Adiciona o caractere na resposta.
		resposta = t.charAt(i) + resposta;

		// Colocar uma vírgula ou um ponto se for o caso.
		if (j == 2) {
			resposta = "." + resposta;
		} else if (j % 3 == 2 && i != 0) {
			resposta = "," + resposta;
		}
	}

	// Preenche os zeros a esquerda para o caso de o valor ser muito pequeno (menos de um real).
	if (resposta.length < 4) {
		resposta = "0.00".substring(0, 4 - resposta.length) + resposta;
	}

	// Coloca o sinal de negativo, se necessário.
	if (negativo) resposta = "-" + resposta;

	// Coloca como prefixo a unidade da moeda.
	return resposta;
}

function hideButtonChurch(){
	
	var qtdItens 	= $("#linha_church").val();
	
	for (var i = 1; i <= qtdItens; i++) {
		var igreja = $("#requesting_church_grid___" + i).val();
		if(igreja != null){
			$("#spnRemoveChild___"+ i).hide();
		}
	}
	$("#add_church").hide();
	$("#spnRemoveChild").hide();
	
}

function beforeSendValidate(){
	
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
//	var ATIV_NATIONAL_LEADER		= (activity == 19);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 22);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 30);
	var ATIV_DPT_HEADER_FIM			= (activity == 33);	
	
	if (ATIV_INICIAL){
			
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
	return idUserFluig;
}

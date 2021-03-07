function loadform(){
	var state 						= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((state == 0 || state == 4) && state != "");
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if (state != "" && mode!= "VIEW"){
		addmascara();
		carregaData();
	}
	
	habilitaMilhas();
	showNote();
	selectChurch();
	selectGlCode();
	
	if( (!ATIV_DPT_HEADER_FIM) || state == ""){
		hideButtonChurch();
	}
	
	//if(!complete){
	
		if(ATIV_INICIAL){
			if(mode == "MOD" || mode == "ADD"){
				setTimeout(function(){
					scrollFocus('txt_solicitante');
					abreColapse('divInfoGeral');
					$("#divDepartment").hide();
				},150);
			}
		}else if(ATIV_STATE_LEADER){
			if(mode == "MOD" || mode == "ADD"){
				setTimeout(function(){
					scrollFocus('txt_gestor');
					abreColapse('divAprovacao');
					$("#divDepartment").hide();
				},150);
			}
		}else if(ATIV_DPT_HEADER_APPROVALL){
			if(mode == "MOD" || mode == "ADD"){
				setTimeout(function(){
					scrollFocus('txt_gestor_dpt_head');
					abreColapse('divDptHead');
					$("#divDepartment").hide();
				},150);
			}
		}else if(ATIV_DIVISION){
			if(mode == "MOD" || mode == "ADD"){
				setTimeout(function(){
					scrollFocus('txt_gestor_division');
					abreColapse('divDivision');
					$("#divDepartment").hide();
				},150);
			}
		}else if(ATIV_DPT_HEADER_FIM){
			reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
			if(mode == "MOD" || mode == "ADD"){
				setTimeout(function(){
					$("#divDepartment").show();
					scrollFocus('rateioGlCode');
					abreColapse('divDptHead');
				},150);
			}
		}
	//}	
}

function setSelectedZoomItem(selectedItem) {
	
	var inputId 					= selectedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var state						= $("#atividade").val();
	var ATIVIDADE_INICIAL			= (state == 0 || state == 4);
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if(ATIVIDADE_INICIAL){
		 
		 if (zoomName == "zoom_supplier") {
			$("#txt_supplier").val(selectedItem.code);
			$("#txt_unit").val(selectedItem.unit);
			$("#txt_description").val(selectedItem.name);
		 }
	}else if (ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_igreja") {
			 $("#txt_estado").val(selectedItem.States);
			 $("#txt_endereco").val(selectedItem.address);
			 $("#txt_lingua").val(selectedItem.language);
		}else if (zoomName == "requesting_church_grid") {
			$("#hd_requesting_church_grid___"+ idFilho).val(selectedItem.Church);
			$("#txt_state_grid___"+ idFilho).val(selectedItem.States);
			$("#txt_address_grid___"+ idFilho).val(selectedItem.address);
		}else if (zoomName == "zoom_classes_grid") {
			$("#hd_requesting_gl_code_grid___"+ idFilho).val(selectedItem.code);
			$("#txt_descrip_grid_gl_code___"+idFilho).val(selectedItem.descri);
		}else if (zoomName == "zoom_department"){
			$("#txt_department_code").val(selectedItem.code);
			$("#txt_department_description").val(selectedItem.descri);	
		}else if (zoomName == "classes") {
			$("#gl_code").val(selectedItem.code);
		}
	}
	 
}
function removedZoomItem(removedItem) {
	
	var state						= $("#atividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIVIDADE_INICIAL			= (state == 0 || state == 4);
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if(ATIVIDADE_INICIAL){
		if (zoomName == "zoom_supplier") { //Limpa campos
			$("#txt_supplier").val("");
			$("#txt_unit").val("");
			$("#txt_description").val("");
		}
	}else if (ATIV_DPT_HEADER_FIM){
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_estado").val("");
			$("#txt_endereco").val("");
		}else if (zoomName == "requesting_church_grid") { //Limpa campos
			$("#hd_requesting_church_grid___"+ idFilho).val("");
			$("#txt_state_grid___"+ idFilho).val("");
			$("#txt_address_grid___"+ idFilho).val("");
			$("#txt_percent_grid___" + idFilho).val("0.00");
			$("#txt_percent_grid___"+idFilho).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
		}else if (zoomName == "zoom_classes_grid") { //Limpa campos
			$("#txt_descrip_grid_gl_code___"+idFilho).val("");
			$("#hd_requesting_gl_code_grid___"+idFilho).val("");
		}else if (zoomName == "zoom_department"){
			$("#txt_department_code").val("");
			$("#txt_department_description").val("");	
		}else if (zoomName == "classes") {
			$("#gl_code").val("");
		}
	}
}
function addmascara(){
	$("#txt_total").maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#txt_pagamentoPrograma").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#installfee").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	//$("#txt_installment").mask('##0000', {reverse: true});
}

//Remove pontos, vírgulas, espaços e marcadores de moeda.
function limpar(x) {
	var resultado = x.replace(",", "").replace(/\./g, "").replace(" ", "");
	console.log(resultado);
	console.log(isNaN(resultado));
	if (!isNaN(resultado) && resultado != "" && resultado != null && resultado != undefined) {
		return resultado;
	} else {
		return 0;
	}
}

// Recebe um número inteiro (valor em centavos) e devolve uma string com o
// seu valor formatado como se fosse um valor monetário em real.
function formatarMoeda(numero) {

	if (isNaN(numero)) return "Valor não preenchido corretamente";

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
			resposta = "," + resposta;
		} else if (j % 3 == 2 && i != 0) {
			resposta = "." + resposta;
		}
	}

	// Preenche os zeros a esquerda para o caso de o valor ser muito pequeno (menos de um real).
	if (resposta.length < 4) {
		resposta = "0,00".substring(0, 4 - resposta.length) + resposta;
	}

	// Coloca o sinal de negativo, se necessário.
	if (negativo) resposta = "-" + resposta;

	// Coloca como prefixo a unidade da moeda.
	return resposta;
}

function addData(){
	$("input[id^='table_dt___']").each(function(index) {
	    var idCampo = $(this).attr("id");
	    FLUIGC.calendar('#' + idCampo);
	});
	
}

function buscaIdFilhosPorSeletor(selector) {
	var retorno = [];
	document.querySelectorAll(selector).forEach(function (element) {
		var id = element.id.split('___').pop();
		if (retorno.indexOf(id) == -1) retorno.push(id);
	});
	return retorno;
}
function addMascaraTabela(){
	
	var linha = $('#linha_milhas').val();
	
	$("#table_dt___"+linha).mask("00/00/0000");
	//$("#table_quantMilhas___"+linha).mask("000000.00", {reverse: true});
	$("#table_quantMilhas___"+linha).maskMoney({ allowZero:true, allowNegative: true, thousands:'', decimal:'.'});
	$("#table_pedagios___"+linha).maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#table_montante___"+linha).maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	$("#table_total___"+linha).maskMoney({ allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
	
}
function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}
function habilitaMilhas(){
	
	var mode = $("#aux1").val();
	
	//if($("#atividade").val() == 0 || $("#atividade").val() == 4){
	if(mode == "MOD" || mode == "ADD"){
		if($("#aux2").val() == "despesasMilhas"){
			$("#milhas").show();
			$("#div_expense").hide();
			$("#quebra_linha_miles").show();
			$("#total_expense").hide();
		}else {
			$("#milhas").hide();
			$("#div_expense").show();
			$("#quebra_linha_miles").hide();
			$("#total_expense").show();
		}
	}
}

function setValor(valor){
	if(valor == "despesasMilhas"){
		$("#aux2").val("despesasMilhas");
		habilitaMilhas();
	}else if(valor == "despesasRefeicoes"){
		$("#aux2").val("despesasRefeicoes");
		habilitaMilhas();
	}else if(valor == "outrasDespesas"){
		$("#aux2").val("outrasDespesas");
		habilitaMilhas();
	}
	somarTotalForm();
}

function showNote(){
	var approve = $("#rd_aprovacaoGestor:checked").val()

	if(approve == "nao"){
		$("#div_notes").show();
	}else{
		$("#div_notes").hide();
	}
}

function selectChurch() {
	var state 						= $("#atividade").val();
	var ATIV_INICIAL				= (state == 0 || state == 4);
	var radio 						= $("#rateioChurch:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxChurchGrid").val(radio);
	}else{
		radio = $("#auxChurchGrid").val();
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
function addFilho(idtable){
	
	var state 						= $("#atividade").val() 
	var ATIV_INICIAL				= (state == 0 || state == 4);
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if (state != ""){
		
		var linha = wdkAddChild(idtable);
		
		if(ATIV_INICIAL){
			 if(idtable == "table_milhas"){
				$('#linha_milhas').val(linha);
				addData();
				addMascaraTabela();
			}
				
		}else if(ATIV_DPT_HEADER_FIM){
			if (idtable == "table_church"){
				//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
			    $('#linha_church').val(linha);
			    
			    $("#txt_percent_grid___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
			    reloadZoomFilterValues("requesting_church_grid___"+linha, "States," +  $('#code_state').val()); //filtro de Church por State no grid
			}else if (idtable == "table_gl_code"){
				//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
			    $('#linha_gl_code').val(linha);
			    
			    $("#txt_percent_grid_gl_code___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
			}	
		}
	}
} 

function fnCustomDelete(obj){
	
	var state 						= $("#atividade").val() 
	var ATIV_INICIAL				= (state == 0 || state == 4);
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if (state != ""){
		if(ATIV_INICIAL){
			var id = obj.id.split("___")[0];
			
			if ( id == "spnRemoveChildMilhas"){
				fnWdkRemoveChild(obj);
				if (id == "spnRemoveChildMilhas"){
					somarTotalForm();
				}
			}
			
		}else if(ATIV_DPT_HEADER_FIM){
			var id = obj.id.split("___")[0];
	
			if (id == "spnRemoveChildChurch" ||id == "spn_remove_child_gl_code"){
				fnWdkRemoveChild(obj);
			}
		}
	}
}

function sumPercent(obj) {
	
	var id = obj.id.split("___")[0];
	if (id == "txt_percent_grid"){
		var qtdItens 			= linha_church.value;
	}else{
		var qtdItens 			= linha_gl_code.value;
	}
	var totalPercent 		= 0;
	var linhaAtual 			= obj.id.split("___")[1];
	
	
	//varificando a somatoria de todas as linhas do grid.
	for (var i = 1; i <= qtdItens; i++) {
		var percentLinha = parseFloat($("#"+id+"___" + i).val());
		if(percentLinha != null && !isNaN(percentLinha)){
			totalPercent += percentLinha;
		}
		if(totalPercent > 100){
			alert("Check the percentage. Maximum needs to be 100.00%")
			$("#"+id+"___" + linhaAtual).val("0.00");
			$("#"+id+"___" + linhaAtual).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
			$("#"+id+"d___" + linhaAtual).focus();
		}	
	}
}

function carregaData(){
	var dataAtual = new Date();
	var mySimpleCalendar = FLUIGC.calendar('#dataInstallFee',{
		language: 'en'
	});
	mySimpleCalendar.setMinDate(dataAtual);
	var mySimpleCalendar2 = FLUIGC.calendar('#dataInstallment',{
		language: 'en'
	});
	mySimpleCalendar2.setMinDate(dataAtual);
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
		$("#installfee").val("0.00")
		$("#dataInstallFee").val("")
		ajustarBackgroundColor('dataInstallFee','#f2f2f2');
	}
	somarTotalForm();
}

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function somarLinhas(obj){
	
	var valorFee		= ($("#installfee").val());
	var vlrParcela 		= 0;
	var lDespesaMilhas	= ($("#aux2").val() == "despesasMilhas");
		
	// multiplicando o total de cada linha - setando o total da linha
	var qtdItens 	= linha_milhas.value;
	var linhaAtual 	= obj.id.split("___")[1];
	
	if (typeof linhaAtual != "undefined" && linhaAtual != null){
		var qtdMilhas 	= $("#table_quantMilhas___" + linhaAtual).val();
		var vlrMilhas 	= $("#table_montante___" + linhaAtual).val();
		var toll 		= $("#table_pedagios___" + linhaAtual).val();
		
		qtdMilhas		= qtdMilhas.replace(",","");
		vlrMilhas		= vlrMilhas.replace(",","");
		toll			= toll.replace(",","");
		
		qtdMilhas 		= parseFloat(qtdMilhas);
		vlrMilhas		= parseFloat(vlrMilhas); //multiplicamos por 100 por causa da regra da Freedom que trata o '.'.
		toll			= parseFloat(toll); //multiplicamos por 100 por causa da regra da Freedom que trata o '.'.
		
		if (isNaN(qtdMilhas)){
			qtdMilhas = 0;
		}
		
		if (isNaN(vlrMilhas)){
			vlrMilhas = 0;
		}
		
		if (isNaN(toll)){
			toll = 0;
		}
		
		var total		= (qtdMilhas * vlrMilhas) + toll; 
		
		$("#table_total___" + linhaAtual).val(total);
		//forçando o campo a atualizar a máscara. Sem o comando abaixo a máscara nao estava ok no campo de total.
		$("#table_total___"+linhaAtual).maskMoney("mask");
	}
	
	//atualizando o total geral do formulario.
	somarTotalForm();
				
}

function selectGlCode() {
	var state 						= $("#atividade").val();
	var radio 						= $("#rateioGlCode:checked").val();
	var ATIVIDADE_INICIAL			= (state==0 || state==4); 
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	if (typeof radio != "undefined"){
		$("#auxGlCodeGrid").val(radio);
	}else{
		radio = $("#auxGlCodeGrid").val();
	}
	
	if (radio == "yes") {
		$("#div_gl_code").hide();
		$("#div_table_gl_code").show();
	} else {
		$("#div_gl_code").show();
		$("#div_table_gl_code").hide();
	}
}

function somarTotalForm(){
	
	var lDespesaMilhas	= ($("#aux2").val() == "despesasMilhas");
	
	var qtdParcelas 	= "1" //($("#txt_installment").val());
	qtdParcelas			= qtdParcelas.replace(",","");
	qtdParcelas 		= parseInt(qtdParcelas);
	
	var vlrParcela		= 0;
	
	if(lDespesaMilhas){
		
		var qtdItens 	= linha_milhas.value;
		var totalFinal 	= 0;
		//somando todos os totais do grid.
		for (var i = 1; i <= qtdItens; i++) {
			var totalLinha		= ($("#table_total___" + i).val());
			//confirmando se a linha do grid nao está deletada.
			if (totalLinha != null && !isNaN(totalLinha)){
				totalLinha			= totalLinha.replace(",","");
				totalLinha 			= parseFloat(totalLinha);
				if(totalLinha != null && !isNaN(totalLinha)){
					totalFinal += totalLinha
				}
			}
		}
		vlrParcela = (totalFinal / qtdParcelas);
		//setando o valor da parcela, que será utilizado no service no consumo do rest do protheus.
		($("#txt_pagamentoPrograma").val(vlrParcela));
	}else{
		vlrParcela 	= ($("#txt_pagamentoPrograma").val());
		vlrParcela		= vlrParcela.replace(",","");
		//convertendo string para numerico.
		vlrParcela 	= (parseFloat(vlrParcela)); 
	}
	
	var valorFee	= ($("#installfee").val());
	valorFee		= valorFee.replace(",","");
	valorFee		= parseFloat(valorFee); 
	
	if (isNaN(vlrParcela)){
		vlrParcela = 0;
	}
	
	if (isNaN(qtdParcelas)){
		qtdParcelas = 0;
	}
	
	if (isNaN(valorFee)){
		valorFee = 0;
	}
	
	var total = (vlrParcela * qtdParcelas) + valorFee;
	
	$("#txt_total").val(total);
	$("#txt_total").maskMoney("mask");
	
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
	
	$("#adicionaFilho").hide();
	$("#spnRemoveChildMilhas").hide();
	
	$("add_gl_code").hide();
	//$("#spn_remove_child_gl_code").hide();
}

/*-- Alterado Thiago Oliveira INICIO --*/

function beforeSendValidate(){
	var state 						= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((state == 0 || state == 4) && state != "");
	var ATIV_STATE_LEADER			= (state == 5);
	var ATIV_DPT_HEADER_APPROVALL	= (state == 16);
	var ATIV_DIVISION				= (state == 18);
	var ATIV_DPT_HEADER_FIM			= (state == 20);
	
	
	if (activity == ATIV_INICIAL || activity == "0"){
	//if (activity == ATIV_COMMERCIAL_APPROVAL){
		
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

/*-- Alterado Thiago Oliveira FIM --*/
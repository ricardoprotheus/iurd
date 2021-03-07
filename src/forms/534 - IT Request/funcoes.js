function loadform(){
		
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	
	selectChurch();
	blockBank();
	selectShipping();
	
	if (activity != "" && mode!= "VIEW"){
		addMascaras();
	}
	
	
	if((((activity != ATIV_PCH_DPT_HEADER_FIM)&& (activity != "0")) || activity == "") || (mode == "VIEW")){
		hideButtonChurch();
	}
	
	
	if((activity == ATIV_INICIAL) || activity == "0"){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_solicitante');
				abreColapse('divInfoGeral');
				redoMaskGrid();
				/*
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapsePchDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableDptHeadZooms();
				*/
			},150);
		}
	}else if(activity == ATIV_STATE_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovacaoGestor');
				abreColapse('divStateLeader');
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseNational");
				disableFields("collapsePchDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				*/	
			},150);
		}
	/*
	}else if(activity == ATIV_NATIONAL_LEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('rd_aprovGestor_national_leader');
				abreColapse('divNationalLeader');*/
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapsePchDptHead");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				*/	
	/*			
			},150);
		}
	*/	
	}else if(activity == ATIV_PCH_DPT_HEADER){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_contactName');
				abreColapse('divPchDptHead');
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				*/
			},150);
		}
	}else if(activity == ATIV_DIVISION){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				abreColapse('divDivision');
				scrollFocus('rd_aprovGestor_division');
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapsePchDptHead");
				disableFields("collapseVP");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				*/
			},150);
		}
	}else if(activity == ATIV_VP){
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				abreColapse('divVP');
				scrollFocus('rd_aprovGestor_vp');
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapsePchDptHead");
				disableFields("collapseDivision");
				disableSecretaryZooms();	
				disableDptHeadZooms();
				*/ 
			},150);
		}
	}else if(activity == ATIV_PCH_DPT_HEADER_FIM){
		reloadZoomFilterValues("zoom_igreja", "States," +  $('#code_state').val()); //filtro de Church por State no campo
		if(mode == "MOD" || mode == "ADD"){
			setTimeout(function(){
				scrollFocus('txt_contactName');
				abreColapse('divInfoGeral');
				redoMaskGrid();
				/*
				disableFields("collapse11"); //secretaria
				disableFields("collapseStateLeader");
				disableFields("collapseNational");
				disableFields("collapseDivision");
				disableFields("collapseVP");
				disableFields("divPchDptHeadTotvs");
				disableSecretaryZooms();	
				$("#divGeneral").show();
				$("#divProjeto").show();
				*/
			},150);
		}
	}
	
}

function setSelectedZoomItem(selectedItem) {
	var inputId 	= selectedItem.inputId;
	var array 		= [];
	var zoomName 	= "";
	var idFilho 	= "";
	
	if(inputId == undefined  ){
		var info = selectedItem.type.split("___");
		
		//verificando se estamos em um pai filho
		if(info.length > 1){
			zoomName = info[0];
		}else{
			zoomName = selectedItem.type;
		}
	}else{
		array 						= inputId.split("___");
		zoomName 					= array.shift();
		idFilho 					= array.pop();
	}
	
	if (zoomName == "zoom_state") {
		var selectCode 			= selectedItem.code;
		var selectDescription 	= selectedItem.Description;
		$("#code_state").val(selectCode);
		$("#name_state").val(selectDescription);
	}
	
	if(zoomName == "requesting_product"){
		$("#hd_requesting_product___"+ idFilho).val(selectedItem.code);
	}

	if(zoomName == "txt_inflowType"){
		$("#hd_inflowType___"+ idFilho).val(selectedItem.code);
	}
	
	if(zoomName == "classes"){
		$("#hd_classes___"+ idFilho).val(selectedItem.code);
	}
	/*
	if(selectedItem.inputName == "deliveryCity"){
		$("#hd_deliveryCity").val(selectedItem.code);
	}

	if(selectedItem.inputName == "issueCity"){
		$("#hd_issueCity").val(selectedItem.code);
	}
	*/

	if(zoomName == "paymentTerm"){
		$("#hd_paymentTerm").val(selectedItem.code);
	}

	if(zoomName == "bank"){
		$("#bank").val(selectedItem.descri);
		$("#hd_bank").val(selectedItem.code);
		$("#hd_branch").val(selectedItem.branch);
		$("#hd_acc").val(selectedItem.acc);
	}

	if(zoomName == "department"){
		$("#hd_department").val(selectedItem.code);
	}
	
	if (zoomName == "zoom_igreja") {
		$("#txt_estado").val(selectedItem.States);
		$("#txt_endereco").val(selectedItem.address);
		$("#hd_requesting_church").val(selectedItem.church);
	}

	if (zoomName == "supplierCode") {
		$("#supplierUnit").val(selectedItem.unit);
		$("#supplierDescription").val(selectedItem.name);
		$("#hd_supplierCode").val(selectedItem.code)
	}
	
	if (zoomName == "requesting_church_grid") {
		$("#hd_requesting_church_grid___"+ idFilho).val(selectedItem.Church);
		$("#txt_state_grid___"+ idFilho).val(selectedItem.States);
		$("#txt_address_grid___"+ idFilho).val(selectedItem.address);
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
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	
	if((activity == ATIV_PCH_DPT_HEADER_FIM) || activity == "0"){
		if (zoomName == "zoom_igreja") { //Limpa campos
			$("#txt_endereco").val("");
			$("#txt_estado").val("");
		}else if (zoomName == "requesting_church_grid") { //Limpa campos
			$("#hd_requesting_church_grid___"+ idFilho).val("");
			$("#txt_state_grid___"+ idFilho).val("");
			$("#txt_address_grid___"+ idFilho).val("");
			$("#txt_percent_grid___" + idFilho).val("0.00");
			$("#txt_percent_grid___" + idFilho).mask('##0.00%', {reverse: true});
		}else if (zoomName == "zoom_city") {
			$("#state_city").val("");
			$("#name_city").val("");
		}
	}else if (activity == ATIV_DPT_HEADER){
		if (zoomName == "supplierCode") {
			$("#supplierUnit").val("");
			$("#supplierDescription").val("");
			$("#hd_supplierCode").val("")
		}
	}
	
}

function scrollFocus(input){
	$('html,body').animate({scrollTop: $('#'+input).offset().top}, 500, function() {
    	$('#'+input).focus();
	});
}
function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

function hideButtonChurch(idButton){
	
	var qtdItens 	= $("#linha_church").val();
	
	for (var i = 1; i <= qtdItens; i++) {
		var igreja = $("#requesting_church_grid___" + i).val();
		if(igreja != null){
			$("#spnRemoveChildChurch___"+ i).hide();
		}
	}
	$("#add_church").hide();
	
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
	
	var activity 					= $("#atividade").val() 
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	
	if (activity != "")
	{
		var linha = wdkAddChild(idtable);
		
		if((activity == ATIV_PCH_DPT_HEADER_FIM) || activity == "0"){
			//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
		    $('#linha_church').val(linha);
		    
		    $("#txt_percent_grid___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
		    reloadZoomFilterValues("requesting_church_grid___"+linha, "States," +  $('#code_state').val()); //filtro de Church por State no grid
		}
	}
} 

function fnCustomDelete(obj){
	
	var activity 					= $("#atividade").val(); 
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	
	if (activity != "")
	{	
		if (mode != "VIEW"){
			var id = obj.id.split("___")[0];	
			if((activity == ATIV_INICIAL) || activity == "0"  || activity == ATIV_PCH_DPT_HEADER_FIM) {
				if (id == "spnRemoveChildChurch" && (activity = ATIV_PCH_DPT_HEADER_FIM)){
					fnWdkRemoveChild(obj);
				}
				if (id == "spnRemoveChild" ){
					fnWdkRemoveChild(obj);
					somaFilhos('txt_total', 'txt_totalValue');
				}	
			}
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

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function customWdkAddChild(idtable) {
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	
	if (activity != "")
	{	
		if(((activity == ATIV_INICIAL || activity == "0") || activity == ATIV_PCH_DPT_HEADER_FIM ) && mode != "VIEW"){
			var id = wdkAddChild(idtable);
			$("#txt_unitValue___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_tax___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_discount___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_quantity___"+id).mask("99999999"); //alterado Bruno 20200728
			if((activity == ATIV_INICIAL || activity == "0")){
				disableFildsDptHead(id);
			}
			$('#linha_produto').val(id);
		} else {
			msg4ever("You can't add table information in this activity", "danger");
		}
	}
}
	
function buscaIdFilhosPorSeletor(selector) {
	var retorno = [];
	document.querySelectorAll(selector).forEach(function (element) {
		var id = element.id.split('___').pop();
		if (retorno.indexOf(id) == -1) retorno.push(id);
	});
	return retorno;
}

function msg4ever(errorMsg, urgencia) {

	if (errorMsg != "") {
		if (urgencia == "success") {
			FLUIGC.toast({
				message: errorMsg,
				type: 'success'
			});
		}

		if (urgencia == "danger") {
			FLUIGC.toast({
				message: errorMsg,
				type: 'danger'
			});
		}
	}
}

//Remove pontos, vírgulas, espaços e marcadores de moeda.
function limpar(x) {
	var resultado = x.replace(/\,/g, "").replace(/\./g, "").replace(" ", "");
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

function somar(obj) {
	var idFilho = obj.id.split("___")[1];

	// Obtém os valores digitados.
	var a = parseInt(limpar($("#txt_unitValue___" + idFilho).val()), 10);
	var b = parseInt(limpar($("#txt_quantity___" + idFilho).val()), 10);
	var c = parseInt(limpar($("#txt_tax___" + idFilho).val()), 10);
	var e = parseInt(limpar($("#txt_discount___" + idFilho).val()), 10);

	// Executa a soma.
	var soma = b * a;
	$("#hd_simpleTotal___" + idFilho).val(formatarMoeda(soma))

	var total = soma + c - e;
	// Formata o resultado como moeda.
	var resposta = formatarMoeda(total);
	$("#txt_total___" + idFilho).val(resposta);
}

function somaFilhos(campo, campoTotal) {
	var idFilho = buscaIdFilhosPorSeletor("[id^=" + campo + "___]");
	var soma = 0;

	for (var i = 0; i < idFilho.length; i++) {
		var a = parseInt(limpar($("#" + campo + "___" + idFilho[i]).val()), 10);

		soma = soma + a;
	}
	
	var frete = parseInt(limpar($("#txt_shippingCost").val()), 10);
	$("#txt_totalShipment").val(formatarMoeda(frete));
	soma += frete;
	
	// Formata o resultado como moeda.
	var resposta = formatarMoeda(soma);
	$("#" + campoTotal).val(resposta);
}


function somarDesconto(campo, campoTotal) {
	var idFilho = buscaIdFilhosPorSeletor("[id^=" + campo + "___]");
	var soma = 0;

	for (var i = 0; i < idFilho.length; i++) {
		var a = parseInt(limpar($("#" + campo + "___" + idFilho[i]).val()), 10);

		soma = soma + a;
	}

	// Formata o resultado como moeda.
	var resposta = formatarMoeda(soma);
	$("#" + campoTotal).val(resposta);
}

function zoomSupplier(obj){
	
	//var nome = $(obj).prev("input").attr("name");
	var nome = "supplierCode";
	
	tdizoom.open("supplier", //dataset Id
			"code,Code,unit,Unit,name,Name", //nome da coluna do dataset virgula (,) seu nome de exibição 
			"code,unit,name", //coluna de retorno
			"Supplier", //titulo do dataset
			"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
			nome); // identificador do zoom
}

/*
 * Funcao criada manualmente para desabilitar os campos zoom, pois na funcao disableFields os campos zoom vem sem id, o que impossoibilita fazer o disable.
 * Obs.: os campos entram com o type "search" e sem id.
 */
function disableDptHeadZooms(){
	var zooms 		= [];
	var qtdLinhas	= linha_produto.value;
	
	zooms.push("supplierCode");
	//zooms.push("deliveryCity");
	//zooms.push("issueCity");
	zooms.push("paymentTerm");
	zooms.push("department");
	zooms.push("bank");
	
	//adicionando os campos zoom do grid de produtos.
	var camposZoomGridProdutos = [];
	camposZoomGridProdutos.push("classes___");
	camposZoomGridProdutos.push("requesting_product___");
	camposZoomGridProdutos.push("txt_inflowType___");
	
	//varrendo todos os produtos do grid.
	var campoGrid	= "";
	var campoGridStandard	= "";
	
	for (i = 1; i <= qtdLinhas; i++){
		
		for (b = 0; b < camposZoomGridProdutos.length; b++){
		
			campoGridStandard	= camposZoomGridProdutos[b];
			
			campoGrid			= campoGridStandard+i;
			if(campoGrid!= null){
				zooms.push(campoGrid);
			}
		}	
	}
	
	var element = "";
	
	
	//$("#divGeneral").hide();
	//$("#divProjeto").hide();
	
}

function disableSecretaryZooms(){
	var zooms 		= [];
	var qtdLinhas	= linha_church.value;
	var radio 		= $("#auxRadioChurch").val();
	
	
	if (radio == "no") {
		zooms.push("zoom_igreja");
	}
	
	//varrendo todos os produtos do grid.
	var campoGridStandard	= "requesting_church_grid___";
	for (i = 1; i <= qtdLinhas; i++){
		campoGrid	= campoGridStandard+i;
		if(campoGrid!= null){
			zooms.push(campoGrid);
		}
	}
	
	var element = "";
	for(i = 0; i < zooms.length; i++) {
		window[zooms[i]].disable(true);
	}
	
}

function addMascaras() {
	$("#txt_shippingCost").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
}

function blockBank() {
	
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	var isCreditCard				= checkPayment();
	
	if((activity == ATIV_PCH_DPT_HEADER_FIM) && (mode == "MOD" || mode == "ADD")){
		if(isCreditCard){
			$("#bank").attr('disabled', false);
			//window["bank"].disable(false);
			//window["bank"].disable = false;
			ajustarBackgroundColor('bank','white');
		}else{
			$("#bank").attr('disabled', true);
			//window["bank"].disable(true);
			//window["bank"].disable = true;
			//document.getElementById('bank').disabled = 'disabled';
			$("#hd_bank").val("")
			ajustarBackgroundColor('bank','#f2f2f2');
		}
	}else{
		//$("#bank").attr('disabled', true);
		//document.getElementById("bank").disabled = true;
		disableItemMenu("bank");
	}	
}

function disableItemMenu(id){
	
	var element  = document.getElementById(id);
	
	//if(element.type == "text") {
	element.readOnly = true;
	element.onblur = false;
	//}
	
}


function disableFildsDptHead(id){
	
	var fieldsToDisable  		= [];
	var camposZoomGridProdutos 	= [];
	
	fieldsToDisable.push("txt_discount___"+id);
	
	camposZoomGridProdutos.push("classes___"+id);
	camposZoomGridProdutos.push("txt_inflowType___"+id);
	
	for(i = 0; i < fieldsToDisable.length; i++) {
		disableItemMenu(fieldsToDisable[i]);
	}
	
	for(i = 0; i < camposZoomGridProdutos.length; i++) {
		window[camposZoomGridProdutos[i]].disable(true);
	}
	
}

/*
 * recolocando as máscaras, pois quando mudamos da tarefa da secretaria para o dpt head, o item do grid está perdendo a máscara.
 */
function redoMaskGrid(){
	
	var qtdLinhas	= linha_produto.value;
	
	for (i = 1; i <= qtdLinhas; i++){
		if ($("#requesting_product___"+i).val() != null ){
			$("#txt_unitValue___"+i).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_tax___"+i).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_discount___"+i).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
			$("#txt_quantity___"+i).mask("99999999"); 
		}	
	}
}

function selectShipping() {
	
	var radio = $("#rd_shipping:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxShipping").val(radio);
	}else{
		radio = $("#auxShipping").val();
	}
	
	if (radio == "sim") {
		$("#txt_shippingCost").attr('disabled', false);
		ajustarBackgroundColor('txt_shippingCost','white');
	} else {
		$("#txt_shippingCost").attr('disabled', true);
		$("#txt_shippingCost").val("0.00")
		ajustarBackgroundColor('txt_shippingCost','#f2f2f2');
	}
	
	somaFilhos('txt_total', 'txt_totalValue')
	
}

function zoomBank(nome){
	
	//var nome = $(obj).prev("input").attr("name");
	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();
	var isCreditCard				= checkPayment();
	
	if (activity != ""){
		if((activity == ATIV_PCH_DPT_HEADER_FIM) && (mode == "MOD" || mode == "ADD")){
			
			if(isCreditCard){
				
				tdizoom.open("banks", //dataset Id
						"code,Code,branch,Branch,acc,Account,descri,Descri", //nome da coluna do dataset virgula (,) seu nome de exibição 
						"code,branch,acc,descri", //coluna de retorno
						"Bank", //titulo do dataset
						"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
						nome); // identificador do zoom
			}	
		}
	}
}

function beforeSendValidate(){

	var activity 					= $("#atividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= $("#ATIV_INICIAL").val();
	var ATIV_STATE_LEADER			= $("#ATIV_STATE_LEADER").val();
//	var ATIV_NATIONAL_LEADER		= $("#ATIV_NATIONAL_LEADER").val();
	var ATIV_PCH_DPT_HEADER			= $("#ATIV_PCH_DPT_HEADER").val();
	var ATIV_DIVISION				= $("#ATIV_DIVISION").val();
	var ATIV_VP						= $("#ATIV_VP").val();
	var ATIV_PCH_DPT_HEADER_FIM		= $("#ATIV_PCH_DPT_HEADER_FIM").val();	
	
	
	if ((activity == ATIV_INICIAL) || activity == "0"){
		
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

function checkPayment(){
	
	var lReturn = false;
	
	var credit = $("#rd_check:checked").val();
	
	if (typeof credit != "undefined"){
		$("#auxRdCheck").val(credit);
	}else{
		credit = $("#auxRdCheck").val();
	}
	
	if (credit == "CREDIT CARD (PHONE)" || credit == "CREDIT CARD (ONLINE)") {
		lReturn = true;
	}
	
	return lReturn;
	
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

function LoadForm() {
	
	var activity 					= $("#hd_numAtividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 67);
	
	selectHardware();
	selectChurch();
	blockBank();
	
	if (activity != "" && mode!= "VIEW"){
		addMascaras();
	}
	
	if( (!ATIV_DPT_HEADER_FIM) || activity == "" || mode == "VIEW"){
		hideButtonChurch();
	}
	
	if (ATIV_INICIAL) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divShoppinRequest');
				scrollFocus('accordion');
				redoMaskGrid();
				//disableFields("collapseState");
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDeptHead");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_STATE_LEADER) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divStateLeader');
				scrollFocus('divStateLeader');
				//disableFields("collapse1");
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDeptHead");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_NATIONAL) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divNationalLeader');
				scrollFocus('divNationalLeader');
				//disableFields("collapse1");
				//disableFields("collapseState");
				//disableFields("collapseIT");
				//disableFields("collapseDeptHead");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_IT) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divIT');
				scrollFocus('divIT');
				//disableFields("collapse1");
				//disableFields("collapseState");
				//disableFields("collapseNational");
				//disableFields("collapseDeptHead");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_DPT_HEADER_APPROVALL) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divDeptHeader');
				scrollFocus('divDeptHeader');
				//disableFields("collapse1");
				//disableFields("collapseState");de
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_DIVISION) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divDivision');
				scrollFocus('divDivision');
				//disableFields("collapse1");
				//disableFields("collapseState");
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDeptHead");
				//disableFields("collapseVP");
			}, 150);
		}
	}

	if (ATIV_VP) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				abreColapse('divVP');
				scrollFocus('divVP');
				//disableFields("collapse1");
				//disableFields("collapseState");
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDeptHead");
				//disableFields("collapseDivision");
			}, 150);
		}
	}

	if (ATIV_DPT_HEADER_FIM || ATIV_ERROR_INT || ATIV_FIM ) {
		if (mode == "MOD" || mode == "ADD") {
			setTimeout(function () {
				//abreColapse('divDeptHeader');
				abreColapse('divShoppinRequest');
				scrollFocus('supplierCode');
				redoMaskGrid();
				//disableFields("collapse1");
				//disableFields("collapseState");
				//disableFields("collapseNational");
				//disableFields("collapseIT");
				//disableFields("collapseDivision");
				//disableFields("collapseVP");
				//disableFields("divDeptHeaderTotvs");

				//$("#divGeneral").show();
				//$("#divProjeto").show();
				//$("#divUpload").show();

			}, 150);
		}
	}
	
	/*
	if (ATIV_FIM) {
		$("#attachment").attr("disabled", true);
		//$("#divGeneral").show();
		//$("#divProjeto").show();
		$("#divUpload").show();
	}
	*/

	setTimeout(function() {
		blockBank();
	}, 500);
}

//TODO - TIVEMOS QUE DESABILITAR A VALIDACAO DO ULTIMO ANEXO, POIS ESTAMOS COM O ERROR LOG ABAIXO:
// Cannot read property 'getAllAttachments' of null
// O ERRO ACIMA COMECOU A OCORREU DURANTE OS TESTES DE VALIDACAO, SEM TERMOS ALTERADO NADA. REINICIAMOS OS SERVICOS E O ERRO CONTINUOU. TIRAMOS A VALIDACAO POR CAUSA DO TREINAMENTO DE SEGUNDA- FEIRA.
/*
var fn = parent.ECM_WKFView.send.bind(parent.ECM_WKFView);

parent.ECM_WKFView.send = function () {
	var parametrosEnvio = arguments;
	console.log(arguments);
	var activity 					= $("#hd_numAtividade").val();
	var file 						= $("#txt_fileName").val();
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	
	if (ATIV_DPT_HEADER_FIM) {
		if (file == "") {
			modalEvent()
			.then(function () {
				$(".buttonFechar").click(function () {
					throw "attachments"
				});

				$(".close").click(function () {
					throw "Attachments"
				});

				$(".buttonConfirmar").click(function () {
					fn(parametrosEnvio[0], parametrosEnvio[1])
				})
			});
		}else{
			fn(parametrosEnvio[0], parametrosEnvio[1])
		}
	} else {
		fn(parametrosEnvio[0], parametrosEnvio[1])
	}
}
*/

function modalEvent() {
	return new Promise(function (resolve, reject) {
		var myModal = FLUIGC.modal({
			title: 'Attachment',
			content: "<h3>You have not attached any documents. Do you want to proceed?</h3>",
			id: 'moda-eventos',
			size: 'small',
			actions: [{
				'label': 'Yes',
				'classType': 'buttonConfirmar',
				'autoClose': true
			}, {
				'label': 'No',
				'classType': 'buttonFechar',
				'autoClose': true
			}]
		}, function (err, data) {
			if (err) {
				// do error handling
				console.log(err);
				reject()
			} else {
				console.log(data)
				resolve()
			}
		});
	})
}

function addAnexo() {
	var documentId = $("#hd_attachment").val();
	var form = new FormData();
	form.append("fileUpload", event.target.files[0]);
	if (documentId != "") {
		deletetarDocumento(documentId);
	}
	uploadFile(form, "hd_attachment");
}

function scrollFocus(input) {
	$('html,body').animate({ scrollTop: $('#' + input).offset().top }, 500, function () {
		$('#' + input).focus();
	});
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

	if (zoomName == "requesting_church") {
		$("#txt_state").val(selectedItem.States);
		$("#txt_address").val(selectedItem.address);
	}

	if (zoomName == "supplierCode") {
		$("#supplierUnit").val(selectedItem.unit);
		$("#supplierDescription").val(selectedItem.name);
		$("#hd_supplierCode").val(selectedItem.code)
	}

	if (zoomName == "requesting_church") {
		$("#hd_requesting_church").val(selectedItem.church);
	}
	
	//ALTERADO BRUNO 20200518
	if (zoomName == "requesting_church_grid") {
		//TODO - O CAMPO HIDDEN ESTÁ FICANDO COMO NULL. SE PRECISARMOS UTILIZAR ELE, ANALISAR O PORQUÊ DE ESTAR NULL. ANALISAR TAMBÉM PORQUE A FREEDOM IMPLEMENTOU O HIDDEN NO GRID. SOMENTE SEGUIMOS A MESMA LOGICA DELES.
		$("#hd_requesting_church_grid___"+ idFilho).val(selectedItem.Church);
		$("#txt_state_grid___"+ idFilho).val(selectedItem.States);
		$("#txt_address_grid___"+ idFilho).val(selectedItem.address);
	}
	
}
//Incluído por Sergio Bruno 20201103
function removedZoomItem(removedItem) {
	var activity 					= $("#hd_numAtividade").val();
	var inputId 					= removedItem.inputId;
	var array 						= inputId.split("___");
	var zoomName 					= array.shift();
	var idFilho 					= array.pop();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 67);
	
	if((ATIV_DPT_HEADER_FIM) || activity == "0"){
		if (zoomName == "requesting_church") { //Limpa campos
			$("#txt_address").val("");
			$("#txt_state").val("");
		}else if (zoomName == "requesting_church_grid") { //Limpa campos
			$("#hd_requesting_church_grid___"+ idFilho).val("");
			$("#txt_state_grid___"+ idFilho).val("");
			$("#txt_address_grid___"+ idFilho).val("");
			$("#txt_percent_grid___" + idFilho).val("0.00");
			$("#txt_percent_grid___" + idFilho).mask('##0.00%', {reverse: true});
		}
	}else if (ATIV_INICIAL){
		if (zoomName == "supplierCode") {
			$("#supplierUnit").val("");
			$("#supplierDescription").val("");
			$("#hd_supplierCode").val("")
		}
	}
	
}


function addMascaras() {
	$("#txt_shippingCost").maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
}

function abreColapse(idDiv) {
	$('#' + idDiv + ' .collapse').collapse('show');
}

function customWdkAddChild(idtable) {
	var state					    = $("#hd_numAtividade").val();
	var ATIV_INICIAL				= (state == 0 || state == 4);
	var ATIV_DPT_HEADER_FIM			= (state == 53);
	var ATIV_ERROR_INT				= (state == 60);
	var mode 						= $("#aux1").val();
	
	if ((ATIV_INICIAL || state == "" || ATIV_DPT_HEADER_FIM || ATIV_ERROR_INT) && mode != "VIEW") {
		var id = wdkAddChild(idtable);
		$("#txt_unitValue___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
		$("#txt_tax___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
		$("#txt_discount___"+id).maskMoney({allowZero:true, allowNegative: true, thousands:',', decimal:'.'});
		$("#txt_quantity___"+id).mask("99999999"); //alterado Bruno 20200728
		if((ATIV_INICIAL || state == "0")){
			disableFildsDptHead(id);
		}
		$('#linha_produto').val(id);
	} else {
		msg4ever("You can't add table information in this activity", "danger");
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

function scrollFocus(input) {
	$('html,body').animate({ scrollTop: $('#' + input).offset().top }, 1000, function () {
		$('#' + input).focus();
	});
}

function selectHardware() {
	var radio = $("#criteria:checked").val();
	
	if (typeof radio != "undefined"){
		$("#auxRadioHardware").val(radio);
	}else{
		radio = $("#auxRadioHardware").val();
	}

	if (radio == "hardware") {
		$("#hardwareStrong").show();
		$("#div_hardware").show();
		$("#divIT").show();
	} else {
		$("#hardwareStrong").hide();
		$("#div_hardware").hide();
		$("#divIT").hide();
	}
}

// Remove pontos, vírgulas, espaços e marcadores de moeda.
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
	//var d = parseInt(limpar($("#txt_shippingCost___" + idFilho).val()), 10);
	//var d = parseInt(limpar($("#txt_shippingCost").val()), 10);
	var e = parseInt(limpar($("#txt_discount___" + idFilho).val()), 10);

	// Executa a soma.
	var soma = b * a;
	$("#hd_simpleTotal___" + idFilho).val(formatarMoeda(soma))

	//var total = soma + c + d - e;
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

function somaDesconto(campo, campoTotal) {
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

//zoom para trazer as igrejas do protheus
function zoomChurch(obj) {

	var nome = $(obj).prev("input").attr("name");

	tdizoom.open("churches_get", //dataset Id
		"church,Church,state,State,address,Address", //nome da coluna do dataset virgula (,) seu nome de exibição
		"church,state,address", //coluna de retorno
		"Churches", //titulo do dataset
		"", //filtro do dataset utilizando campo virgula (,) valor ex: colleagueName,Fernando
		nome); // identificador do zoom
}

//funcao para adicionar produtos no grid e fazer também a contagem de produtos do grid.
// function addProduto() {
// 	linha = wdkAddChild('table_product');

// 	//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
// 	$('#linha_produto').val(linha);

// }

function blockBank() {
	
	var activity 					= $("#hd_numAtividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 67);
	var isCreditCard				= checkPayment();
	
	if( ATIV_DPT_HEADER_FIM && (mode == "MOD" || mode == "ADD")){
	
		if(isCreditCard){
			$("#bank").attr('disabled', false);
			ajustarBackgroundColor('bank','white');
		}else{
			$("#bank").attr('disabled', true);
			//window["bank"].clear()
			$("#bank").val("");
			$("#hd_bank").val("");
			$("#hd_branch").val("");
			$("#hd_acc").val("");
			ajustarBackgroundColor('bank','#f2f2f2');
		}
	}else{
		disableItemMenu("bank");
	}	
}

/*-- Alterado Thiago Oliveira INICIO --*/

function beforeSendValidate(){
	
	var activity 					= $("#hd_numAtividade").val();
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 67);
	
	var activity = $("#hd_numAtividade").val();
	
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

	if (activity == 53 || activity == 60){
		dadosNotaFiscal();
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

function dadosNotaFiscal(){
	var SUPPLIER 	= $("#hd_supplierCode").val();
	var UNIT 		= $("#supplierUnit").val();
	//var CODMUN 		= $("#hd_issueCity").val();
	//var PROVENT 	= $("#hd_deliveryCity").val();
	var COND 		= $("#hd_paymentTerm").val();
	var INVOICE 	= $("#invoiceNumber").val();
	var PAYMETHOD 	= $("#rd_check:checked").val();
	var PROCESSFLUIG= $("#hd_numProcesso").val();
	var TOTALNF 	= $("#txt_totalValue").val();
	var CHURCH 		= $("#hd_requesting_church").val();
	var BANK 		= $("#hd_bank").val();
	var AGENCY 		= $("#hd_branch").val();
	var ACCOUNT 	= $("#hd_acc").val();
	var DEPARTMENT 	= $("#hd_department").val();
	var VALFRETE	= $("#txt_shippingCost").val();
	var NOTES 		= $("#txt_notes").val();
	var RELATORIO	= $("#name_report").val();
	var PRODUCTS 	= dadosProduct();
	var CHURCHES	= dadosChurch(); 

	//formatando os valores, tirando a virgula - isto por causa da mascara. 
	TOTALNF 	= updVlrFormatJSon(TOTALNF);
	VALFRETE	= updVlrFormatJSon(VALFRETE);
	
	var dados = {
		SUPPLIER: SUPPLIER,
		UNIT: UNIT,
		COND: COND,
		INVOICE: INVOICE,
		PAYMETHOD: PAYMETHOD,
		PROCESSFLUIG: PROCESSFLUIG,
		TOTALNF: TOTALNF,
		CHURCH: CHURCH,
		BANK: BANK,
		AGENCY: AGENCY,
		ACCOUNT: ACCOUNT,
		DEPARTMENT: DEPARTMENT,
		VALFRETE: VALFRETE,
		NOTES: NOTES,
		RELATORIO: RELATORIO,
		PRODUCTS: PRODUCTS,
		CHURCHES: CHURCHES
	}

	$("#hd_json").val(JSON.stringify(dados))
}

function dadosProduct(){
	var ids 		= buscaIdFilhosPorSeletor("[id^=classes___]");
	var dados 		= [];
	var unitValue	= "";
	var valDescount = "";
	var valTax		= "";
	var totItem		= "";
	var quant		= "";
	
    for(var i=0; i < ids.length; i++){
        
    	unitValue	= updVlrFormatJSon($("#txt_unitValue___"+ ids[i]).val());
    	valDescount = updVlrFormatJSon($("#txt_discount___"+ ids[i]).val());
    	valTax		= updVlrFormatJSon($("#txt_tax___"+ ids[i]).val());
    	totItem		= updVlrFormatJSon($("#hd_simpleTotal___"+ ids[i]).val());
    	quant		= updVlrFormatJSon($("#txt_quantity___"+ ids[i]).val());
    	
        var linha = {
                COD: $("#hd_requesting_product___"+ ids[i]).val().toString(),
                QUANT: quant,
                VUNIT: unitValue,
    			VALDESC: valDescount,
    			TAX: valTax,
                TOTALITEM: totItem,
                TES: $("#hd_inflowType___"+ ids[i]).val().toString(),
    			GLCODE: $("#hd_classes___"+ ids[i]).val().toString(),
    			DEPARTMENT: $("#hd_department").val()
            };
        dados.push(linha);
	};
	return dados
}

function dadosChurch(){
	
	var optChurch		= $("#auxRadioChurch").val(); 
	var qtdChurchs	 	= $("#linha_church").val();
	var dados 			= [];
	
	if (optChurch == "yes") {
		var codeChurch		= "";
	    var percentChurch 	= "";
	    
	    for(var i=1; i <= qtdChurchs; i++){
	    	
	    	codeChurch = $("#requesting_church_grid___"+ i).val();
	    	
	    	if(codeChurch != null){
	    		percentChurch = updVlrFormatJSon($("#txt_percent_grid___"+ i).val());
		        var linha = {
		        		CODE: codeChurch,
		        		PERCENTUAL: percentChurch
		            };
		        dados.push(linha);
	    	} 
		};
	}else{
		var linha = {
        		CODE: $("#requesting_church").val(),
        		PERCENTUAL: "100"
            };
        dados.push(linha);
	}
	
	return dados
}

//funcao para adicionar produtos no grid e fazer também a contagem de produtos do grid.
function addChurch(idtable){
	
	var activity 					= $("#hd_numAtividade").val(); 
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	
	if(ATIV_DPT_HEADER_FIM){
		var linha = wdkAddChild(idtable);
		
		//adicionando a quantidade de produtos do grid - gravamos sempre a ultima linha.
	    $('#linha_church').val(linha);
	    
	    $("#txt_percent_grid___"+linha).maskMoney({allowZero:false, allowNegative: false, thousands:'', decimal:'.'});
	}
} 

function fnCustomDelete(obj){

    var activity					= $("#hd_numAtividade").val(); 
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var mode 						= $("#aux1").val();
	
	if (mode != "VIEW"){
		if (activity != ""){
			var id = obj.id.split("___")[0];
			if(ATIV_INICIAL || ATIV_DPT_HEADER_FIM){
				if (id == "spnRemoveChildChurch" ){
					fnWdkRemoveChild(obj);
				}else if (id == "spnRemoveChild" ){
					fnWdkRemoveChild(obj);
				}
			}else if(ATIV_DPT_HEADER_FIM){
				if (id == "spnRemoveChild" ){
					fnWdkRemoveChild(obj);
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

function hideButtonChurch(){
	
	var qtdItens 	= $("#linha_church").val();
	
	for (var i = 1; i <= qtdItens; i++) {
		var igreja = $("#requesting_church_grid___" + i).val();
		if(igreja != null){
			$("#spnRemoveChildChurch___"+ i).hide();
		}
	}
	$("#add_church").hide();
	$("#spnRemoveChildChurch").hide();
	
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

function disableItemMenu(id){
	
	var element  = document.getElementById(id);
	
	element.readOnly = true;
	element.onblur = false;
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

function zoomBank(nome){
	
	//var nome = $(obj).prev("input").attr("name");
	var activity 					= $("#hd_numAtividade").val(); 
	var mode 						= $("#aux1").val();
	var ATIV_INICIAL				= ((activity == 0 || activity == 4) && activity != "");
	var ATIV_STATE_LEADER			= (activity == 5);
	var ATIV_NATIONAL				= (activity == 46);
	var ATIV_IT						= (activity == 15);
	var ATIV_DPT_HEADER_APPROVALL	= (activity == 19);
	var ATIV_DIVISION				= (activity == 25);
	var ATIV_VP						= (activity == 33);
	var ATIV_DPT_HEADER_FIM			= (activity == 53);
	var ATIV_ERROR_INT				= (activity == 60);
	var ATIV_FIM					= (activity == 67);
	var isCreditCard				= checkPayment();
	
	if (activity != ""){
		if((ATIV_DPT_HEADER_FIM) && (mode == "MOD" || mode == "ADD")){
			
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

function ajustarBackgroundColor(campo, color){
	$('#'+campo).attr('style', 'background-color: '+color+' !important');
}

function updVlrFormatJSon(cField){
	return cField.replace(",","");
}
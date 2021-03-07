var REPOSITORIO_UPLOAD = "166";

function uploadFile(form, idCampo) {
	var loading = FLUIGC.loading(window, {
		textMessage : 'Realizando upload'  //$(".template-upload").html()
	});	
	loading.show();
	var that = this;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : '/ecm/upload',
		processData : false,
		contentType : false,
		cache : false,
		data : form,
		xhr : function() {
			var myXhr = $.ajaxSettings.xhr();
			if (myXhr.upload) {
				myXhr.upload.addEventListener('progress', progress, false);
			}
			return myXhr;
		},
		success : function(data, status, xhr) {
			console.log("sucesso no upload");
			console.log(data);
			if (data != null && data.files.length > 0) {
				createDocumentGED(data, idCampo);
			}
			loading.hide();
		},
		error : function(xhr, status, error) {
			
			console.log(error);
			
			FLUIGC.toast({
				message : 'Erro ao realizar upload do arquivo.',
				type : 'danger'
			});
			loading.hide();
		}
	});
}

function deletetarDocumento(documentid){
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : '/api/public/2.0/documents/deleteDocument/' + documentid,
		async: false,
	});
}

function progress(e) {
	if (e.lengthComputable) {
		var max = e.total;
		var current = e.loaded;
		var total = (current * 100) / max;
		$(".progresso-upload").css("width", total + "%");
		if (total >= 100) {
			$(".texto-upload").html("Arquivo enviado!");
		}
	}
}

function createDocumentGED(json, idCampo){	
	
	var dados = {"description" : json.files[0].name, "parentId" : REPOSITORIO_UPLOAD, "attachments" : [{'fileName' : json.files[0].name}]};
    
	$.ajax({
          method: "POST",
          url: parent.WCMAPI.getServerURL() +"/api/public/ecm/document/createDocument",
          data: JSON.stringify(dados),
          contentType: "application/json", 
          async: false,
          error: function(x, e) {
              if (x.status == 500) {
                  alert("Erro Interno do Servidor: entre em contato com o Administrador.");
              }
         },
         beforeSend: function(){

         },
         success:function(model) {
        	 console.log("Documento publicado no GED com sucesso");
        	 console.log(model.content.id);
        	 console.log(model);
        	 if(idCampo == "anexo_analise"){
        		 $("#hd_anexo_analise").val(model.content.id);
        	 }
         }
     });
	
}

function viewDocument(idIcone){
	if(idIcone == "visualizar_anexo_analise"){
		var documentId = $("#hd_anexo_analise").val(); 
		if(documentId != ""){
			var url = parent.WCMAPI.getServerURL() + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc="+documentId;
			window.open(url, '_blank');
		}else{
			FLUIGC.toast({
		        title: 'Aviso ',
		        message: 'Não foi adicionado nenhum anexo',
		        type: 'info'
		    });
		}
	}
	
}


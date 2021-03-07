// FUNÇÕES GENÉRICAS
var gdfunctions = (function(){

	var js_loaded = [];
	var saveClick = null;
	var sendClick = null;
	var requireds = [];
	var zooms = [];
	var datasets = null;
	var js_loaded = [];
	var saveClick = null;
	var sendClick = null;
	var requireds = [];
	var zooms = [];
	var datasets = null;
	return {
		dateToString: function(data,type){
			type  = (typeof type !== 'undefined') ? type : "text";
			var mes 			= data.getMonth() + 1;
			var dia 			= data.getDate();
			var ano 			= data.getFullYear();
			
		   str_dia = new String(dia);
		   str_mes = new String(mes);

		   if (str_dia.length < 2) 
		      str_dia = 0 + str_dia;
		   if (str_mes.length < 2) 
		      str_mes = 0 + str_mes;
			if (type == "text"){
				return str_dia+"/"+str_mes+"/"+ano;
			}else if (type == "dot"){
				return str_dia+"."+str_mes+"."+ano;
			}else{
				return ano+"-"+str_mes+"-"+str_dia;
			}
			
		},
		dateToStringFy: function(data){
			var mes 			= data.getMonth() + 1;
			var dia 			= data.getDate();
			var ano 			= data.getFullYear();
			
		   str_dia = new String(dia);
		   str_mes = new String(mes);

		   if (str_dia.length < 2) 
		      str_dia = 0 + str_dia;
		   if (str_mes.length < 2) 
		      str_mes = 0 + str_mes;
			
			return ano + str_mes + str_dia;
		},
		stringToDate: function(data){
			data = data.split('/').reverse().join('/');
			var data = new Date((new Date(data)).setHours(0, 0, 0, 0));
			return data;
		},
		stringDateToDate: function(data){
			data = replaceAll(data,'-','/')
			var data = new Date((new Date(data)).setHours(0, 0, 0, 0));
			return data;
		},
	   stringDotToDate: function(data){
			
			data = gdfunctions.replaceAll(data, ".", "/"); 
			data = data.split('/').reverse().join('/');
			var data = new Date((new Date(data)).setHours(0, 0, 0, 0));
			return data;
		},
		sumDaysToDate: function(data,days){
			var dataBase = new Date();
			data.setDate(data.getDate() + days);
			data.setHours(0,0,0,0);
			
			return data;
		},
		removeZoomData: function(fieldId){
			var filter = eval("filter_"+fieldId);
			filter.removeAll();
		},
		setWriteField : function(fieldId) {
			 $(fieldId).each(function () {
			        switch (this.type) {
			            case "file":
			            case "password":
			            case "text":
			            case "zoom":
			            case "number":
			            case "email":	
			            case "textarea":
			            	$(this).attr('readonly', false);
			                break;
			            case "checkbox":
			            case "radio":
			                this.checked = false;
			                break;
			            case "select-one":
			            	$('#'+this.name + ' option:not(:selected)').attr('disabled', false);
			            	$(this).attr('readonly', false);
			            	 break;
			            case "image":
			            case "button":
			            	$(this).show(); 
			            	 break;
			        }
			        
			    });
		},
		setReadOnly: function(fieldId) {
			 $(fieldId).each(function () {
			        switch (this.type) {
			            case "file":
			            case "password":
			            case "text":
			            case "zoom":
			            case "number":
			            case "email":
			            case "date":
			            case "textarea":
			            	$(this).attr('readonly', true);
			                break;
			            case "checkbox":
			            case "radio":
			                //this.checked = true;
			                $(this).attr('onclick', 'return false');
			                break;
			            case "select-one":
			            	$('#'+this.name + ' option:not(:selected)').attr('disabled', true);
			            	$(this).attr('readonly', true);
			            	break;
			            case "image":
			            case "button":
			            	$(this).hide();
			            	break;
			        }
			        
			    });
		},
		getTableSize: function(tableId,tamCab){
			tamCab = (typeof tamCab !== 'undefined') ? tamCab : 1;
			var seletor = "#"+tableId + " tr";
			var contador = 0 - (tamCab + 1);
			$(seletor).each(function(){
				contador++;
			});
			return contador;
		},
		removeChildrenFromTable: function(tableName,tableClass,exceptionRows){
		    var contador = 0;
		    $(tableClass + " tr").each(function(){ 
		       contador++;
		       if (contador > exceptionRows){
		        fnWdkRemoveChild(this); 
		       }
		    });
		    if(tableName !=""){
			    rowIndex[tableName] = 0;		    	
		    }
		},
		getFloatValue: function(string) {
			if(string == ""){
				string = "0"
			}
			string = replaceAll(string, ".", "");
			string = replaceAll(string, ",", ".");
			return parseFloat(string)
		},
		getStringValue: function(float,decimal) {
			if(float == ""){
				float = 0;
			}
			decimal  = (typeof decimal !== 'undefined') ? decimal : 2;
			var negativo = false;
			if(float < 0){
				negativo = true;
			}
			float = float.toFixed(decimal).toString();
			float = replaceAll(float, ".", ",");
			float = mValor(float);
			if (negativo){
				float = "-"+float;
			}
			return float
		},
		getChildPosition: function(id) {
			var retorno = "";
			if(id.indexOf("___") != -1){
				retorno = id.substring(id.indexOf("___") + 3);
			}
				
			return retorno;
		},
		getInputName: function(id){
			var array = id.split("___");
			return array[0];
		},
		replaceAll: function(string, token, newtoken) {
		    while (string.indexOf(token) != -1) {
		        string = string.replace(token, newtoken);
		}
		return string;
		},
		getDate: function(type){
			type  = (typeof type !== 'undefined') ? type : "text";
			var currentTime 	= new Date();
			var month 			= currentTime.getMonth() + 1;
			var day 			= currentTime.getDate();
			var year 			= currentTime.getFullYear();

			var strDay = new String(day);
			var strMonth = new String(month);
			   
		   if (strDay.length < 2) 
			   strDay = 0 + strDay;
		   if (strMonth.length < 2) 
			   strMonth = 0 + strMonth;
		   
		   if(type == "text"){
			   return strDay+"/"+strMonth+"/"+year;
		   }else if(type == "dot"){
			   return strDay+"."+strMonth+"."+year;
		   }else{
			   return year+"-"+strMonth+"-"+strDay;  
		   } 
		   
		},
		lpad: function(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		},
		getTime: function(){
			var date = new Date();
			
		    var hour = date.getHours();
		    var minutes = date.getMinutes();
		    var seconds = date.getSeconds();
		    
		    strHours = new String(hour);
		    strMinutes = new String(minutes);
		    strSeconds = new String(seconds);
		    
		    if (strHours.length < 2)
		    	strHours = 0 + strHours;
		    if (strMinutes.length < 2)
		    	strMinutes = 0 + strMinutes;
		    if (strSeconds.length < 2)
		    	strSeconds = 0 + strSeconds;
		 
		 return strHours + ':' + strMinutes + ':' + strSeconds;
		},
		showLoading: function(text, onReady) {
			var myLoading = FLUIGC.loading(window,{
				textMessage:  text
			});
			$.ajax({
			    url: '',
			    beforeSend: function() { 
			    	myLoading.show();  
			     },
			    complete: function() { 
			     eval(onReady);
			     myLoading.hide(); 
			     }
			});
		},
		getCompanyId: function(){
			$.ajax({
		        type: 'GET',
		        dataType: 'json',
		        contentType: "application/json",
		        url: '/api/public/admin/tenant',
		        async: false,
		        success: function (response){
		        	return response.content.code;
		        }
			});
		},
		getInfoUser: function(userField,execFunction){
			var retorno = "";
			$.ajax({
		        type: 'GET',
		        dataType: 'json',
		        contentType: "application/json",
		        url: '/api/public/social/user/logged/v2',
		        async: false,
		        success: function (response){
		        	if (execFunction){
		        		return eval(userField);
		        	}else{
		        		retorno =  eval("response.content."+userField);
		        	}			        	
		        }
		 });
		 if(!execFunction){
			 return retorno;
		 }
		},
		setZoomData: function(field, value){
			window[field].setValue(value);
		},

		clearZoom: function(field){
			window[field].clear()
		},
		getConfiguration: function(userField,execFunction){
			var retorno = "";
			$.ajax({
		        type: 'GET',
		        dataType: 'json',
		        contentType: "application/json",
		        url: '/api/public/wcm/configuration',
		        async: false,
		        success: function (response){
		        	if (execFunction){
		        		return eval(userField);
		        	}else{
		        		retorno =  eval("response.content."+userField);
		        	}			        	
		        }
		 }); 
		if(!execFunction){
			return retorno;
		}
		},
		getURLFluig: function(){
			return fluigAPI.getPageService().getServerURL();
		},
		clean: function(id) {
			for (var x=0;x<zooms.length;x++) {
				var z = zooms[x];
				if (z.id == id) {
					var list = z.input.split(",");
					for (var y=0;y<list.length;y++) {
						$("#" + list[y]).val("");
					}
				}
			}
		},
		showError: function(msg) {
			FLUIGC.toast({ title: 'Erro:', message: msg, type: 'danger' });
		},
		showWarning: function(msg) {
			FLUIGC.toast({ title: 'Aviso:', message: msg, type: 'warning' });
		},
		showInfo: function(msg) {
			FLUIGC.toast({ title: 'Informa&ccedil;&atilde;o:', message: msg, type: 'info' });
		},
		showMessage: function(msg, title, label) {
			 message = typeof msg !== 'undefined' ? msg : "";
			 title = typeof title !== 'undefined' ? title : "Alert";
			 label = typeof label !== 'undefined' ? label : "OK";
			 FLUIGC.message.alert({
			  message: msg,
			  title: title,
			  label: label
			  });
		}
	};
})();


//ZOOM TDI TOTVS 3.0
var tdizoom = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading('#loading-zoom');
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			
			isHeaderVisible = $("#workflowview-header",window.parent.document).is( ":visible" );
			isFixedVisible  = $(".fixedTopBar",window.parent.document).is( ":visible" );
			isHeaderHide	= null;
			isFixedHide		= null;
			if (isHeaderVisible){
				$("#workflowview-header",window.parent.document).hide();
				isHeaderHide = true;
			}
			if(isFixedVisible){
				$(".fixedTopBar",window.parent.document).hide();
				isFixedHide = true;
			}
			
			
			//alert(window.innerHeight);
			mobile  = (typeof mobile !== 'undefined') ? mobile : "false";
			if (mobile == "true"){
				//$("form").hide();
			}
			
			console.log(likefield)
			
	 		loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide'>" ;
				html+=    "<div class='input-group'>" ;
				html+=    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" ;
				html+=    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" ;
				html+=    "</div>" ;
				if (typeof miniZoom != "undefined"){
					html+=    "<div class='' id='loading-zoom' style='overflow-y: auto; height: 200px;'>" ;	
				}else{
					html+=    "<div class='' id='loading-zoom' style='overflow-y: auto; height: 250px;'>" ;	
				}			
				html+=    "<table  class='table table-hover table-zoom'>" ;
				html+=    "<thead>" ;
				html+=    "</thead>" ;
				html+=   "<tbody>" ;
				html+=    "</tbody>" ;
				html+=    "</table>" ;
				html+=    "</div>" ;
				html+=    "</body>";
				
			var sizeZoom = "full";
			if (typeof miniZoom != "undefined"){
				sizeZoom = "large";
			}
			
			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: sizeZoom,
			    id: 'modal-zoom-' + type,
			    actions: [{
			        'label': 'Selecionar',
			        'classType': 'zoom-selected btn-warning',
			        'autoClose': false,
			    },{
			        'label': 'Fechar',
			        'classType': 'zoom-close',
			        'autoClose': true
			    },{
			        'label': 'Top',
			        'classType': 'zoom-top btn-primary',
			        'autoClose': false
			    }]
			}, function(err, data) {
			    if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
			    } else {
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }
					
					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};
					    
					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }
					    
					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }
					    
					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }
					    
					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }
					    
					    var searchValue = $("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;
					    	
					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField = fields.split(",")[0];
					    	}
					    	
					    }
					    
					    return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var keys  = (typeof zoomKeyUp !== 'undefined') ? zoomKeyUp : 1;
						if (text.length >= keys || text.length  == 0 ){
							var table = $('.table-zoom > tbody');
							table.find('tr').each(function(index, row) {
								var allCells = $(row).find('td');
								if(allCells.length > 0) {
									var found = false;
									allCells.each(function(index, td) {
										var regExp = new RegExp(text, 'i');
										if(regExp.test($(td).text())) {
											found = true;
											return false;
										}
									});
									if(found == true)$(row).show();else $(row).hide();
								}
							});
						}
						
					}
					
					var setup = function(lista) {
						$(".table-zoom > thead").html("");
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							if(i == 0){
								var classe = "active";
							}else{
								var classe = "";
							}
							var html = "<tr data-dataset=" + i + " class='"+classe+"'>";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
					 		
					 		
						}
						if(dataset.length == 1){
							var row = globaldataset[$(".table-zoom tbody .active").data("dataset")];
				 			row["type"] = type;
				 			
				 			zoommodal.remove();
				 			setSelectedZoomItem(row);
				 			
				 			if(isHeaderHide){
				 				$("#workflowview-header",window.parent.document).show();
				 			}
				 			if(isFixedHide){
				 				$(".fixedTopBar",window.parent.document).show();
				 			}
				 			
				 			if (mobile == "true"){
								//$("form").show();
							}
				 			
				 			$("#"+type).focus();
				 			
				 		}
						
						
				 		$(".table-zoom > tbody > tr").click(function() {
				 			$(".table-zoom > tbody > tr").removeClass("active");
				 			$(this).addClass("active");
				 			current = $(this).data("dataset");
				 		});
				 		$(".table-zoom > tbody > tr").dblclick(function() {
				 			var row = globaldataset[$(this).data("dataset")];
				 			row["type"] = type;
				 			
				 			zoommodal.remove();
				 			setSelectedZoomItem(row);
				 			
				 			if(isHeaderHide){
				 				$("#workflowview-header",window.parent.document).show();
				 			}
				 			if(isFixedHide){
				 				$(".fixedTopBar",window.parent.document).show();
				 			}
				 			
				 			if (mobile == "true"){
								//$("form").show();
							}
				 			
				 			$("#"+type).focus();
				 			
				 		});
				 		if (mobile == "true"){
							//$("form").show();
						}else{
							$("#search").focus();
						}
				 		
				 		loading.hide();
					}

					var dosearch = function() {
				 		var url = urlrequest();
						$(".table-zoom > tbody").html("");
						
						console.log("url", url)
				 		
				 		loading.show();
				 		
						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		url: url,
				    		data: "",
				    		error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	alert("Erro ao consultados dados");
				    	    	zoommodal.remove();
							},
				    	    success: function (data, status, xhr) {
				    	    	console.log("dataset sucess", data, status, xhr)
				    	    	var dataset = data["invdata"];
				    	    	readydataset(dataset);
				    	    }
						});
					}

					var timeout;
			 		$('#search').keyup(function(e) {
			 			console.log("search", e)
			 	    	clearTimeout(timeout);
			 	    	var keycode;
			 	    	if (window.event) {
			 	    		keycode = window.event.keyCode;
			 	    	} else if (e) {
			 	    		keycode = e.which;
			 	    	} else { 
			 	    		return true;
			 	    	}
			 	    	console.log("search", keycode);
			 	    	if (keycode == 13) {
					 		dosearch();
			 	    	} else {
			 	    		timeout = setTimeout(searchtable($(this).val()), 500);
			 	    	}			 			
			 		});		 		

			 		$('.zoom-selected').click(function() {
			 			var row = globaldataset[current];
			 			row["type"] = type;
			 			
			 			zoommodal.remove();
			 			setSelectedZoomItem(row);
			 			if(isHeaderHide){
			 				$("#workflowview-header",window.parent.document).show();
			 			}
			 			if(isFixedHide){
			 				$(".fixedTopBar",window.parent.document).show();
			 			}

			 			if (mobile == "true"){
							//$("form").show();
						}
			 			$("#"+type).focus();
					});
			 		
			 		$('.zoom-close, .modal-header .close').click(function() {
			 			if(isHeaderHide){
			 				$("#workflowview-header",window.parent.document).show();
			 			}
			 			if(isFixedHide){
			 				$(".fixedTopBar",window.parent.document).show();
			 			}
			 			if (mobile == "true"){
							//$("form").show();
						}
			 			if($("#"+type).attr('readonly') == "readonly"){
			 				
			 			}else{
			 				$("#"+type).val("");
			 			}
			 			
			 			//$("#"+type).trigger("change");
					});
			 		
			 		
			 		
			 		
			 		$('.zoom-top').click(function() {
			 			$('#loading-zoom').scrollTop(0);
					});
			 		
			 		
			 		
			 		$('.modal-header .close').click(function() {
			 			if(isHeaderHide){
			 				$("#workflowview-header",window.parent.document).show();
			 			}
			 			if(isFixedHide){
			 				$(".fixedTopBar",window.parent.document).show();
			 			}
			 			if (mobile == "true"){
							//$("form").show();
						}
					});
			 		
			 		setup(fields);
			 		dosearch();

			    }
			});
			
		}
	}
})();

//ZOOM TDI CHEK TOTVS 3.0
var tdizoomCheck = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading('#loading-zoom');
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			$("#workflowview-header",window.parent.document).hide();
			$(".fixedTopBar",window.parent.document).hide();
			
			//alert(window.innerHeight);
			if (mobile == "true"){
				//$("form").hide();
			}
			
			console.log(likefield)
			
	 		loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide'>" ;
				html+=    "<div class='input-group'>" ;
				html+=    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" ;
				html+=    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" ;
				html+=    "</div>" ;
				html+=    "<div class='' id='loading-zoom' style='overflow-y: auto; height: 300px;'>" ;				
				html+=    "<table  class='table table-hover table-zoom'>" ;
				html+=    "<thead>" ;
				html+=    "</thead>" ;
				html+=   "<tbody>" ;
				html+=    "</tbody>" ;
				html+=    "</table>" ;
				html+=    "</div>" ;
				html+=    "</body>";
			
			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: "full",
			    id: 'modal-zoom-' + type,
			    actions: [
			    {
			        'label': 'Selecionar Todos',
			        'classType': 'check-all btn-info',
			        'autoClose': false,
			    },
			    {
			        'label': 'Confirmar',
			        'classType': 'zoom-selected btn-warning',
			        'autoClose': true,
			    },{
			        'label': 'Fechar',
			        'classType': 'zoom-close',
			        'autoClose': true
			    },{
			        'label': 'Top',
			        'classType': 'zoom-top btn-primary',
			        'autoClose': false
			    }]
			}, function(err, data) {
			    if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
			    } else {
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }
					
					check = false;
					
					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};
					    
					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }
					    
					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }
					    
					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }
					    
					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }
					    
					    var searchValue = $("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;
					    	
					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField = fields.split(",")[0];
					    	}
					    	
					    }
					    
					    return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true){
									$(row).show(); 
									$(row).find("td input").removeClass("hide-line");
								}else{
									$(row).hide();
									$(row).find("td input").addClass("hide-line");
								}
							}
						});
					}
					
					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							if (i==0){
								html += "<th class=''></th>"
							}
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x<showfields.length; x++) {
								if(x==0){
									html += "<td><input class='check-return' type='checkbox' id='check_zoom___"+i+"'/></td>";
								}
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
						}
//				 		$(".table-zoom > tbody > tr").click(function() {
//				 			$(".table-zoom > tbody > tr").removeClass("active");
//				 			$(this).addClass("active");
//				 			current = $(this).data("dataset");
//				 		});
//				 		$(".table-zoom > tbody > tr").dblclick(function() {
//				 			var row = globaldataset[$(this).data("dataset")];
//				 			row["type"] = type;
//				 			setSelectedZoomItem(row);
//				 			zoommodal.remove();
//				 			$("#workflowview-header",window.parent.document).show();
//				 			$(".fixedTopBar",window.parent.document).show();
//				 			if (mobile == "true"){
//								//$("form").show();
//							}
//				 		});
				 		loading.hide();
					}

					var dosearch = function() {
				 		var url = urlrequest();
						$(".table-zoom > tbody").html("");
						
						console.log("url", url)
				 		
				 		loading.show();
						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		url: url,
				    		data: "",
				    		error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	alert("Erro ao consultados dados");
				    	    	zoommodal.remove();
							},
				    	    success: function (data, status, xhr) {
				    	    	console.log("dataset sucess", data, status, xhr)
				    	    	var dataset = data["invdata"];
				    	    	readydataset(dataset);
				    	    }
						});
					}

					var timeout;
			 		$('#search').keyup(function(e) {
			 			console.log("search", e)
			 	    	clearTimeout(timeout);
			 	    	var keycode;
			 	    	if (window.event) {
			 	    		keycode = window.event.keyCode;
			 	    	} else if (e) {
			 	    		keycode = e.which;
			 	    	} else { 
			 	    		return true;
			 	    	}
			 	    	console.log("search", keycode);
			 	    	if (keycode == 13) {
					 		dosearch();
			 	    	} else {
			 	    		//timeout = setTimeout(searchtable($(this).val()), 500);
			 	    	}			 			
			 		});		 		
			 		
			 		$(".check-all").click(function(){
			 			if (!check){
			 				$(".check-return").prop("checked", true);
			 				check = true;
			 			}else{
			 				$(".check-return").prop("checked", false);
			 				check = false;
			 			}
			 	   });
					
			 		$('.zoom-selected').click(function() {
			 			$(".check-return").each(function(){
			 				if ($(this).is(":checked")){
			 					if(!$(this).hasClass("hide-line")){
			 						var id = $(this).attr("id").split("___");
			 						var current = parseInt(id[1]);
						 			var row = globaldataset[current];
						 			row["type"] = type;
						 			setSelectedZoomItem(row);
						 			if (mobile == "true"){
										//$("form").show();
									}
			 					}
			 				}
			 			})
			 			$("#workflowview-header",window.parent.document).show();
			 			$(".fixedTopBar",window.parent.document).show();

					});
			 		
			 		$('.zoom-close').click(function() {
			 			$("#workflowview-header",window.parent.document).show();
			 			$(".fixedTopBar",window.parent.document).show();
			 			if (mobile == "true"){
							//$("form").show();
						}
					});
			 		
			 		$('.zoom-top').click(function() {
			 			$('#loading-zoom').scrollTop(0);
					});
			 		
			 		
			 		
			 		$('.modal-header .close').click(function() {
			 			$("#workflowview-header",window.parent.document).show();
			 			$(".fixedTopBar",window.parent.document).show();
			 			if (mobile == "true"){
							//$("form").show();
						}
					});
			 		
			 		setup(fields);
			 		dosearch();

			    }
			});
			
		}
	}
})();

$(document).ready(function(){
	$(document).on('keypress', ".zoom-tdi",function(e){
		 if(e.which == 13){
			 if($(this).val() == ""){
				 $(this).next().click();
			 }else{
				 $(this).next().focus();
			 }
			 
		 }
	}); 
	
	$(document).on('change', ".zoom-tdi",function(e){
		$(this).next().click();
	}); 
});

//ZOOM TDI TOTVS 3.0
var tdiSearch = (function(){
	var zoommodal = null;
	var loading = FLUIGC.loading('#loading-zoom');
	return {
		open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
			
			isHeaderVisible = $("#workflowview-header",window.parent.document).is( ":visible" );
			isFixedVisible  = $(".fixedTopBar",window.parent.document).is( ":visible" );
			isHeaderHide	= null;
			isFixedHide		= null;
			if (isHeaderVisible){
				$("#workflowview-header",window.parent.document).hide();
				isHeaderHide = true;
			}
			if(isFixedVisible){
				$(".fixedTopBar",window.parent.document).hide();
				isFixedHide = true;
			}
			
			
			//alert(window.innerHeight);
			mobile  = (typeof mobile !== 'undefined') ? mobile : "false";
			if (mobile == "true"){
				//$("form").hide();
			}
			
			console.log(likefield)
			
	 		loading.show();
			
			var showfields = [];
			var globaldataset = [];
			var current = 0;
			
			if (zoommodal != null) {
				zoommodal.remove();
				zoommodal = null;
				
				$(".table-zoom > thead").html("");
				$(".table-zoom > tbody").html("");
			}
			
			var html = "<body class='fluig-style-guide'>" ;
				html+=    "<div class='input-group'>" ;
				html+=    "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" ;
				html+=    "<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" ;
				html+=    "</div>" ;
				if (typeof miniZoom != "undefined"){
					html+=    "<div class='' id='loading-zoom' style='overflow-y: auto; height: 200px;'>" ;	
				}else{
					html+=    "<div class='' id='loading-zoom' style='overflow-y: auto; height: 250px;'>" ;	
				}			
				html+=    "<table  class='table table-hover table-zoom'>" ;
				html+=    "<thead>" ;
				html+=    "</thead>" ;
				html+=   "<tbody>" ;
				html+=    "</tbody>" ;
				html+=    "</table>" ;
				html+=    "</div>" ;
				html+=    "</body>";
				
			var sizeZoom = "full";
			if (typeof miniZoom != "undefined"){
				sizeZoom = "large";
			}
			
			var zoommodal = FLUIGC.modal({
			    title: title,
			    content: html,
			    formModal: false,
			    size: sizeZoom,
			    id: 'modal-zoom-' + type,
			    actions: [{
			        'label': 'Fechar',
			        'classType': 'zoom-close',
			        'autoClose': true
			    },{
			        'label': 'Top',
			        'classType': 'zoom-top btn-primary',
			        'autoClose': false
			    }]
			}, function(err, data) {
			    if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
			    } else {
					var trimarray = function (fields) {
				    	for(var i=0; i < fields.length; i++){
				    		fields[i] = fields[i].trim();
				    	}
				    	return fields;
				    }
					
					var urlrequest = function(){
					    var request = "/ecm/api/rest/ecm/dataset/",
					        json = {};
					    
					    if (dataset != null) {
					        request += "getDatasetZoom";
					        json.datasetId = dataset;
					    } else if(cardDatasetId != null){
					        request += "getCardDatasetValues";
					        json.cardDatasetId = cardDatasetId;
					    }
					    
					    if (resultfields != null && resultfields.length > 0 ){
					    	json.resultFields = trimarray(resultfields.split(","));
					    }
					    
					    if (filters != null && filters.length > 0 ){
					        json.filterFields = trimarray(filters.split(","));
					    }
					    
					    if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
					        json.likeField = likefield;
					        json.likeValue = likevalue;
					    }
					    
					    var searchValue = $("#search").val();
					    if(searchValue && searchValue.length > 0) {
					    	json.searchValue = searchValue;
					    	
					    	if (searchby && searchby != "") {
						        json.searchField = searchby;
					    	} else {
					    		json.searchField = fields.split(",")[0];
					    	}
					    	
					    }
					    
					    return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var keys  = (typeof zoomKeyUp !== 'undefined') ? zoomKeyUp : 1;
						if (text.length >= keys || text.length  == 0 ){
							var table = $('.table-zoom > tbody');
							table.find('tr').each(function(index, row) {
								var allCells = $(row).find('td');
								if(allCells.length > 0) {
									var found = false;
									allCells.each(function(index, td) {
										var regExp = new RegExp(text, 'i');
										if(regExp.test($(td).text())) {
											found = true;
											return false;
										}
									});
									if(found == true)$(row).show();else $(row).hide();
								}
							});
						}
						
					}
					
					var setup = function(lista) {
						$(".table-zoom > thead").html("");
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i+1] + "</th>"
							i++;
						}
						html += "</tr>";
				 		$(".table-zoom > thead").append(html);
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							if(i == 0){
								var classe = "active";
							}else{
								var classe = "";
							}
							var html = "<tr data-dataset=" + i + " class='"+classe+"'>";
							for (var x=0; x<showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";
								
							}
							html += "</tr>";
					 		$(".table-zoom > tbody").append(html);
					 		
					 		
						}
						
				 		$(".table-zoom > tbody > tr").click(function() {
				 			$(".table-zoom > tbody > tr").removeClass("active");
				 			$(this).addClass("active");
				 			current = $(this).data("dataset");
				 		});
				 		$(".table-zoom > tbody > tr").dblclick(function() {
				 			var row = globaldataset[$(this).data("dataset")];
				 			row["type"] = type;
				 			
				 			zoommodal.remove();
				 			setSelectedZoomItem(row);
				 			
				 			if(isHeaderHide){
				 				$("#workflowview-header",window.parent.document).show();
				 			}
				 			if(isFixedHide){
				 				$(".fixedTopBar",window.parent.document).show();
				 			}
				 			
				 			if (mobile == "true"){
								//$("form").show();
							}
				 			
				 			$("#"+type).focus();
				 			
				 		});
				 		if (mobile == "true"){
							//$("form").show();
						}else{
							$("#search").focus();
						}
				 		
				 		loading.hide();
					}

					var dosearch = function() {
				 		var url = urlrequest();
						$(".table-zoom > tbody").html("");
						
						console.log("url", url)
				 		
				 		loading.show();
				 		
						$.ajax({
				    		type: "GET",
				    		dataType: "json",
				    		url: url,
				    		data: "",
				    		error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	    	console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				    	    	alert("Erro ao consultados dados");
				    	    	zoommodal.remove();
							},
				    	    success: function (data, status, xhr) {
				    	    	console.log("dataset sucess", data, status, xhr)
				    	    	var dataset = data["invdata"];
				    	    	readydataset(dataset);
				    	    }
						});
					}

					var timeout;
			 		$('#search').keyup(function(e) {
			 			console.log("search", e)
			 	    	clearTimeout(timeout);
			 	    	var keycode;
			 	    	if (window.event) {
			 	    		keycode = window.event.keyCode;
			 	    	} else if (e) {
			 	    		keycode = e.which;
			 	    	} else { 
			 	    		return true;
			 	    	}
			 	    	console.log("search", keycode);
			 	    	if (keycode == 13) {
					 		dosearch();
			 	    	} else {
			 	    		timeout = setTimeout(searchtable($(this).val()), 500);
			 	    	}			 			
			 		});		 		

			 		$('.zoom-close, .modal-header .close').click(function() {
			 			if(isHeaderHide){
			 				$("#workflowview-header",window.parent.document).show();
			 			}
			 			if(isFixedHide){
			 				$(".fixedTopBar",window.parent.document).show();
			 			}
			 			if (mobile == "true"){
							//$("form").show();
						}
			 			if($("#"+type).attr('readonly') == "readonly"){
			 				
			 			}else{
			 				$("#"+type).val("");
			 			}
			 			
			 			//$("#"+type).trigger("change");
					});
			 		
			 		
			 		
			 		
			 		$('.zoom-top').click(function() {
			 			$('#loading-zoom').scrollTop(0);
					});
			 		
			 		
			 		
			 		$('.modal-header .close').click(function() {
			 			if(isHeaderHide){
			 				$("#workflowview-header",window.parent.document).show();
			 			}
			 			if(isFixedHide){
			 				$(".fixedTopBar",window.parent.document).show();
			 			}
			 			if (mobile == "true"){
							//$("form").show();
						}
					});
			 		
			 		setup(fields);
			 		dosearch();

			    }
			});
			
		}
	}
})();

//MASCARAS GENÉRICAS

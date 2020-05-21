var FACTOR   = 0;
var opcionOption = "1";
var clicked  = false;
var MENSAJE1 = 'Debes tener entre 16  y 99 años para ser parte del reto.';
var MENSAJE2 = 'Cantidad mínima de 100 pesos.';
var MENSAJE3 = 'Los campos con * son obligatorios';
var MENSAJE4 = 'Caracteres máximos excedidos.';
var MENSAJE5 = 'Los campos habilitados son obligatorios.';
var validartxtMontoAhorrarAnio;
var validartxtMontoFijoSemanal;
var validartxtMontoFijoMensual;
var validartxtMontoIncremental;
$(document).ready(function(){
	$('#txtNombre').focus();
	$("#txtNombre").keyup(function(e){
		return convertirEnMayusculas(this);
	});	
	$("#txtNombre").keypress(function(e){
		return soloLetras(e, this);
	});	
	$("#txtEdad").keypress(function(e){
		return soloNumeros(e, this, 1);
	});
	$("#txtEdad").blur(function(e)
	{
		var valor = parseInt($('#txtEdad').val());
		if ( valor > 99 ) 
		{
			mensajeDialogo(MENSAJE1, 2);
			$('#txtEdad').val('16');
		}
		else if (valor < 16) 
		{
			mensajeDialogo(MENSAJE1, 2);
			$('#txtEdad').val('16');
		}
		return valor; 
	});
	$( "#cboFormaCalcular" ).focus(function() {
		clicked = false;
	});
	$( "#cboFormaCalcular" ).click(function() {
		//habilita la accion clic para los elementos option del campo #cboFormaCalcular y les 
		//devuelve el foco en los casos que se seleccione la opcion ya seleccionada previamente
		if (clicked == true) 
		{
			var opcionseleccionada = $( "#cboFormaCalcular" ).val();
			if(opcionOption == opcionseleccionada)
			{
				switch(opcionseleccionada)
				{
					case "1":
						$('#txtMontoAhorrarAnio').focus();
						break;
					case "2":
						$('#txtMontoFijoSemanal').focus();
						break;
					case "3":
						$('#txtMontoFijoMensual').focus();
						break;
					case "4":
						$('#txtMontoIncremental').focus();
						break;
				}
			}
				clicked = false;
		}
		else if (clicked == false) 
		{
			clicked = true;
		}
	});
	$('#cboFormaCalcular').change(function() 
	{
		var valueRefCalculo = this.value;
		resetPorCambiosEnRefCalculos(valueRefCalculo);
	});
	/*Uso de libreria Cleave js*/
	validartxtMontoAhorrarAnio = new Cleave('#txtMontoAhorrarAnio', {
		prefix:'$',
    	numeral: true
	});
	validartxtMontoFijoSemanal = new Cleave('#txtMontoFijoSemanal', {
		prefix:'$',
    	numeral: true
	});
	validartxtMontoFijoMensual = new Cleave('#txtMontoFijoMensual', {
		prefix:'$',
    	numeral: true
	});
	validartxtMontoIncremental = new Cleave('#txtMontoIncremental', {
		prefix:'$',
    	numeral: true
	});
	/*Uso de libreria Cleave js*/
	/* validaciones de cajas numeros >>>>*/
	$("#txtMontoAhorrarAnio").keypress(function(e){
		return soloNumeros(e, this, 2);	
	});
	$("#txtMontoAhorrarAnio").keyup(function(e){
		var valor = false; 
		valor = soloCantidades(e, this); 
		return valor; 
	});
	$("#txtMontoFijoSemanal").keypress(function(e){
		return soloNumeros(e, this, 2);
	});
	$("#txtMontoFijoSemanal").keyup(function(e){
		var valor = false; 
		valor = soloCantidades(e, this); 
		return valor; 
	});
	$("#txtMontoFijoMensual").keypress(function(e){
		return soloNumeros(e, this, 2);
	});
	$("#txtMontoFijoMensual").keyup(function(e){
		var valor = false; 
		valor = soloCantidades(e, this); 
		return valor; 
	});
	$("#txtMontoIncremental").keypress(function(e){
		return soloNumeros(e, this, 2);
	});
	$("#txtMontoIncremental").keyup(function(e){
		var valor = false; 
		valor = soloCantidades(e, this); 
		return valor; 
	});
/* validaciones de cajas numeros <<<<< */
	FACTOR = obtenerFactor();
	$('#btnCalcularAhorro').click(function() 
	{		
		var bMonto = parseFloat(validartxtMontoAhorrarAnio.getRawValue().replace('$', ''));
		var formaCalcular = parseInt($('#cboFormaCalcular').val());

		if ($('#txtNombre').val().trim() != '' && $('#txtEdad').val() != '') 
		{
			if (bMonto < 100)
			{
				mensajeDialogo(MENSAJE2, 3);
				$('#txtMontoAhorrarAnio').val('');
			}
			else
			{
				calcularAhorro(formaCalcular);
				$('#btnUnirseReto').focus();
			}
		}
		else 
		{
			mensajeDialogo(MENSAJE3, 4);
		}
	});
	$('#btnUnirseReto').click(function() 
	{		
		if(validaCamposObligatorios())
		{
			var sNombre = "";
			sNombre = $('#txtNombre').val().trim();
			$("#controlNombre").html('<strong>'+sNombre+'</strong>, tu Reto del Ahorro Afore Coppel es el siguiente:');
			$("#contenedor1").hide();
			$("#contenedor2").show(500);
		}
	});
	$('#btnNuevoCalculo').click(function(){
		limpiarCapturas();
	});
	$('#btnNuevoCalculo2').click(function() 
	{		
		$("#contenedor2").hide();
		$("#contenedor1").show(500);
		limpiarCapturas();
	});
	$('#btnExportar').click(function(){
		$('#btnArriba').hide();
		$('#btnExportar').hide();
		$('#btnNuevoCalculo2').hide();
		imprSelec('contenedor2');
		function imprSelec(contenedor2)
		{
			var ficha=document.getElementById(contenedor2);
			var ventimp=window.open(' ','popimpr');
			ventimp.document.write(ficha.innerHTML);
			ventimp.document.close();
			ventimp.print();
			ventimp.close();
		};
		$('#btnArriba').show();
		$('#btnExportar').show();
		$('#btnNuevoCalculo2').show();
	});
	$('#btnArriba').click(function(e){
		e.preventDefault();//para evitar recargar pp.
			$('body, html').animate({
				scrollTop: '0px'
			}, 300);
	});
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 )
		{
			$('#btnArriba').slideDown(300);
		} 
		else 
		{
			$('#btnArriba').slideUp(300);
		}
	});
	$("#imprimir" ).click(function(event) {
		$("#imprimir" ).hide();
		window.print();
		$("#imprimir" ).show();
	});
});
//FIN DE $(document).ready(function(){}
function convertirEnMayusculas(control) 
{
	var valor = '';
	valor = control.value.toUpperCase(); //toLowerCase()
	$("#txtNombre").val(valor);
}
function soloLetras(e, control)
{
	var keyX = (document.all) ? e.keyCode : e.which; // 2
    //if (keyX != 46 && keyX != 48 && keyX != 49 && keyX != 50 && keyX != 51 && keyX != 52 && keyX != 53 && keyX != 54 && keyX != 55 && keyX != 56 && keyX != 57)	//46 es el punto
    if ((keyX >= 65 && keyX <= 90) || (keyX >= 97 && keyX <= 122) || (keyX == 8) || (keyX == 32) || (keyX == 209) || (keyX == 241) || (keyX == 0) || (keyX == 13) 
    	|| (keyX == 193 || keyX == 201 || keyX == 205 || keyX == 224 || keyX == 233))  //LAS VOCALES CON ACENTO, MAYUSCULAS
	{
		//209: Ñ   32: espacio  241: ñ
		if (keyX == 13 && $('#txtNombre').val().trim() != '') 
		{
			$('#txtEdad').focus();
		}
		if($('#txtNombre').val().length >= 120)
		{
			mensajeDialogo(MENSAJE4, 5);
			return false;
		}
		return true;
	}
	else
	{
		//return false;
    	patron =/[A-Za-záéíóúÁÉÍÓÚ\s]/;
    	te = String.fromCharCode(keyX); // 5
    	return patron.test(te);
	}
}
function soloNumeros(e, control, iTipo)
{
	var keyX = (document.all) ? e.keyCode : e.which; // 2
	var longitud = control.value.length;
	var numero = control.value;
/*	var key = window.Event ? e.which : e.keyCode;    
    var chark = String.fromCharCode(key);
    var tempValue = control.value+chark;
    console.log('key '+key)
    console.log('chark '+chark)
    console.log('tempValue '+tempValue)*/
	if ( longitud > 0 )
	{
		for (i = 0; i < longitud; i++)
		{
			//tap, enter = 13
			//46 = . ( Punto ), 48 = 0, 49 = 1, 50 = 2, 51 = 3, 52 = 4, 53 = 5, 54 = 6, 55 = 7, 56 = 8, 57 = 9 
			if (keyX != 0  && keyX != 46 && keyX != 48 && keyX != 49 && keyX != 50 && keyX != 51 && keyX != 52 && keyX != 53 && keyX != 54 && keyX != 55 && keyX != 56 && keyX != 57)	//46 es el punto
			{
				if (keyX == 8 || keyX == 13) //8= backspace, 46= el punto
				{
					if (keyX == 13 && iTipo == 1) //si es enter y se hizo desde el campo edad
					{
						//$('#txtMontoAhorrarAnio').focus();
						devolverFocoAcampoVacio();
					}
					if (keyX == 13 && iTipo == 2) //si es enter y se hizo desde los campos montos
					{
						$('#btnCalcularAhorro').focus();
					}
					return true;// 3
				}
				else
				{
					patron =/\d/; // 4
					te = String.fromCharCode(keyX); // 5
					return patron.test(te);// 6
				}
			}
		}
		if(keyX == 46  && iTipo == 1) // negar el punto para el campo txtEdad
		{
			patron =/\d/; // 4
			te = String.fromCharCode(keyX); // 5
			return patron.test(te);// 6
		}
	}
	else
	{
	    if (longitud == 0 && keyX == 48 ) //negar cero en la primer captura
	    {
   	
			return false;// 6
	    }
		if(keyX == 46)// negar punto en la primer posicion
		{
			patron =/\d/; // 4
			te = String.fromCharCode(keyX); // 5
			return patron.test(te);// 6
		}
		if (keyX != 46 && keyX != 48 && keyX != 49 && keyX != 50 && keyX != 51 && keyX != 52 && keyX != 53 && keyX != 54 && keyX != 55 && keyX != 56 && keyX != 57)	//46 es el punto
		{
			if (keyX == 8) //8= backspace, 46= el punto
			{
				return true;// 3
			}
			else
			{
				patron =/\d/; // 4
				te = String.fromCharCode(keyX); // 5
				return patron.test(te);// 6
			}
		}
	}
}
function soloCantidades(e, control)
{	
	var campoPresionado = control.id;
	var keyX = (document.all) ? e.keyCode : e.which; // 2
	var longitud = control.value.length;
	var caracter = "";
	var numero = control.value;
	var nPuntos = 0;
	
	//alert(keyX)
	if ( longitud > 0 )
	{
		for (i = 0; i < longitud; i++)
		{
			caracter = numero.charAt(i);
			if(caracter == ".")
			{
				nPuntos = nPuntos + 1;
			}
			//110 = . ( Punto ), 96 = 0, 97 = 1, 98 = 2, 99 = 3, 100 = 4, 101 = 5, 102 = 6, 103 = 7, 104 = 8, 105 = 9
			//46 = SUPRIMIR, 48 = 0, 49 = 1, 50 = 2, 51 = 3, 52 = 4, 53 = 5, 54 = 6, 55 = 7, 56 = 8, 57 = 9 
			if (keyX != 46 &&keyX != 48 && keyX != 49 && keyX != 50 && keyX != 51 && keyX != 52 && keyX != 53 && keyX != 54 && keyX != 55 && keyX != 56 && keyX != 57 && keyX != 96 &&keyX != 97 &&keyX != 98 &&keyX != 99 &&keyX != 100 &&keyX != 101 &&keyX != 102 &&keyX != 103 &&keyX != 104 &&keyX != 105)	
			{
				if (keyX == 8) //8= backspace, 46= el punto
				{
					muestraEscondeBotones(1);
					if (campoPresionado == 'txtMontoAhorrarAnio') {limpiarCamposPorCambioEnCaptura(1);}
					else if (campoPresionado == 'txtMontoFijoSemanal') {limpiarCamposPorCambioEnCaptura(2);}
					else if (campoPresionado == 'txtMontoFijoMensual') {limpiarCamposPorCambioEnCaptura(3);}
					else if (campoPresionado == 'txtMontoIncremental') {limpiarCamposPorCambioEnCaptura(4);}
					return true;// 3
				}
				else
				{
					patron =/\d/; // 4
					te = String.fromCharCode(keyX); // 5
					return patron.test(te);// 6
				}
			}
		}
		if(nPuntos > 0 && keyX == 46) // negar mas de un punto
		{
			patron =/\d/; // 4
			te = String.fromCharCode(keyX); // 5
			return patron.test(te);// 6
		}
		else
		{
			muestraEscondeBotones(1);
			if (campoPresionado == 'txtMontoAhorrarAnio') {limpiarCamposPorCambioEnCaptura(1);}
			else if (campoPresionado == 'txtMontoFijoSemanal') {limpiarCamposPorCambioEnCaptura(2);}
			else if (campoPresionado == 'txtMontoFijoMensual') {limpiarCamposPorCambioEnCaptura(3);}
			else if (campoPresionado == 'txtMontoIncremental') {limpiarCamposPorCambioEnCaptura(4);}
			return true;// 3
		}
	}
	else
	{
		muestraEscondeBotones(1);//solucion: cuando la cantidad es seleccionada y se borra con backspace
		if (campoPresionado == 'txtMontoAhorrarAnio') {limpiarCamposPorCambioEnCaptura(1);}
		else if (campoPresionado == 'txtMontoFijoSemanal') {limpiarCamposPorCambioEnCaptura(2);}
		else if (campoPresionado == 'txtMontoFijoMensual') {limpiarCamposPorCambioEnCaptura(3);}
		else if (campoPresionado == 'txtMontoIncremental') {limpiarCamposPorCambioEnCaptura(4);}

		if(keyX == 46)// negar punto en la primer posicion
		{
			patron =/\d/; // 4
			te = String.fromCharCode(keyX); // 5
			return patron.test(te);// 6
		}
		
		if (keyX != 46 && keyX != 48 && keyX != 49 && keyX != 50 && keyX != 51 && keyX != 52 && keyX != 53 && keyX != 54 && keyX != 55 && keyX != 56 && keyX != 57 && keyX != 110 &&keyX != 96 &&keyX != 97 &&keyX != 98 &&keyX != 99 &&keyX != 100 &&keyX != 101 &&keyX != 102 &&keyX != 103 &&keyX != 104 &&keyX != 105)	
		{
			if (keyX == 8) //8= backspace, 46= el punto
			{
				return true;// 3
			}
			else
			{
				patron =/\d/; // 4
				te = String.fromCharCode(keyX); // 5
				return patron.test(te);// 6
			}
		}
		else
		{
			return true;// 3
		}
	}//end else longitud > 0 
}
function resetPorCambiosEnRefCalculos(pValueRefCalculo)
{
	switch(pValueRefCalculo)
	{
		case "1":
			opcionOption="1";
			$('#txtMontoAhorrarAnio').attr("disabled",false);
			$("#txtMontoAhorrarAnio").attr("placeholder", "Ingresa cantidad");
			$('#txtMontoAhorrarAnio').focus();			
			$('#txtMontoFijoSemanal, #txtMontoFijoMensual, #txtMontoIncremental').attr("disabled",true);
			$('#txtMontoFijoSemanal, #txtMontoFijoMensual, #txtMontoIncremental').attr("placeholder", "");
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;
		case "2":
			opcionOption="2";
			$('#txtMontoFijoSemanal').attr("disabled",false);			
			$('#txtMontoFijoSemanal').attr("placeholder", "Ingresa cantidad");
			$('#txtMontoFijoSemanal').focus();			
			$('#txtMontoAhorrarAnio, #txtMontoFijoMensual, #txtMontoIncremental').attr("disabled",true);
			$('#txtMontoAhorrarAnio, #txtMontoFijoMensual, #txtMontoIncremental').attr("placeholder", "");
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;
		case "3":
			opcionOption="3";
			$('#txtMontoFijoMensual').attr("disabled",false);			
			$('#txtMontoFijoMensual').attr("placeholder", "Ingresa cantidad");
			$('#txtMontoFijoMensual').focus();	
			$('#txtMontoFijoSemanal, #txtMontoAhorrarAnio, #txtMontoIncremental').attr("disabled",true);
			$('#txtMontoFijoSemanal, #txtMontoAhorrarAnio, #txtMontoIncremental').attr("placeholder", "");
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;
		case "4":
			opcionOption="4";
			$('#txtMontoIncremental').attr("disabled",false);			
			$('#txtMontoIncremental').attr("placeholder", "Ingresa cantidad");
			$('#txtMontoIncremental').focus();		
			$('#txtMontoFijoSemanal, #txtMontoAhorrarAnio, #txtMontoFijoMensual').attr("disabled",true);
			$('#txtMontoFijoSemanal, #txtMontoAhorrarAnio, #txtMontoFijoMensual').attr("placeholder", "");
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;
		default:
			console.log('FUNCION resetPorCambiosEnRefCalculos() DICE: Lo lamento actualmente no se cuenta con la OPC (---'+pValueRefCalculo+'---)');
			break; 
	}
	muestraEscondeBotones(1);
}
function calcularAhorro(pFormaCalcular)
{
	var montoAnual       = 0;
	var montoFijoSemanal = 0;
	var montoFijoMes     = 0;
	var montoIncremental = 0;
	if(validarCamposMontos(pFormaCalcular))
	{
		switch(pFormaCalcular)
		{
			case 1:
				//Monto a Ahorrar al Año
				montoAnual       = parseFloat(validartxtMontoAhorrarAnio.getRawValue().replace('$', ''));
				montoFijoSemanal = montoAnual / 52;
				montoFijoMes     = montoAnual / 13;
				montoIncremental = montoFijoSemanal / FACTOR;
				$('#txtMontoFijoSemanal').val(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
				validartxtMontoFijoSemanal.setRawValue(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
				validartxtMontoFijoMensual.setRawValue(formatNumber.new(redondeo2decimales(montoFijoMes)));
				validartxtMontoIncremental.setRawValue(formatNumber.new(redondeo2decimales(montoIncremental)));
				calculosTablaAhorroIncremental(montoIncremental , montoAnual);
				muestraEscondeBotones(2);
				break;
			case 2:
				//Ahorro Fijo Semanal
				montoFijoSemanal = parseFloat(validartxtMontoFijoSemanal.getRawValue().replace('$', ''));
				montoAnual       = montoFijoSemanal * 52;
				montoFijoMes     = montoAnual / 13;
				montoIncremental = montoFijoSemanal / FACTOR;

				if (montoFijoSemanal < 1.93)
				{
					mensajeDialogo("Cantidad mínima de $1.93 pesos.", 4);
					validartxtMontoFijoSemanal.setRawValue("")
				}
				else
				{
					$('#txtMontoAhorrarAnio').val(formatNumber.new(redondeo2decimales(montoAnual)));
					$('#txtMontoFijoMensual').val(formatNumber.new(redondeo2decimales(montoFijoMes)));
					validartxtMontoAhorrarAnio.setRawValue(formatNumber.new(redondeo2decimales(montoAnual)));
					validartxtMontoFijoMensual.setRawValue(formatNumber.new(redondeo2decimales(montoFijoMes)));
					validartxtMontoIncremental.setRawValue(formatNumber.new(redondeo2decimales(montoIncremental)));
					llenarTablaMontosFijos(montoFijoSemanal, montoAnual);
					muestraEscondeBotones(2);
				}
				break;
			case 3:
				//Ahorro Fijo Mensual
				montoFijoMes = parseFloat(validartxtMontoFijoMensual.getRawValue().replace('$', ''));
				montoAnual       = montoFijoMes * 13;
				montoFijoSemanal = montoAnual / 52;
				montoIncremental = montoFijoSemanal / FACTOR;

				if (montoFijoMes < 7.70)
				{
					mensajeDialogo("Cantidad mínima de $7.70 pesos.", 4);
					validartxtMontoFijoMensual.setRawValue("")
				}
				else
				{
					$('#txtMontoAhorrarAnio').val(formatNumber.new(redondeo2decimales(montoAnual)));
					$('#txtMontoFijoSemanal').val(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
					validartxtMontoAhorrarAnio.setRawValue(formatNumber.new(redondeo2decimales(montoAnual)));
					validartxtMontoFijoSemanal.setRawValue(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
					validartxtMontoIncremental.setRawValue(formatNumber.new(redondeo2decimales(montoIncremental)));
					llenarTablaMontosFijos(montoFijoSemanal, montoAnual);
					muestraEscondeBotones(2);
				}
				break;
			case 4:
				//Ahorro Incremental Semanal
				montoIncremental = parseFloat(validartxtMontoIncremental.getRawValue().replace('$', ''));
				montoFijoSemanal = montoIncremental * FACTOR;
				montoAnual       = montoFijoSemanal * 52;
				montoFijoMes     = montoAnual / 13;
				if (montoIncremental < 0.08)
				{
					mensajeDialogo("Cantidad mínima de $0.08 pesos.", 4);
					validartxtMontoIncremental.setRawValue("")
				}
				else
				{
					$('#txtMontoAhorrarAnio').val(formatNumber.new(redondeo2decimales(montoAnual)));
					$('#txtMontoFijoSemanal').val(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
					validartxtMontoAhorrarAnio.setRawValue(formatNumber.new(redondeo2decimales(montoAnual)));
					validartxtMontoFijoSemanal.setRawValue(formatNumber.new(redondeo2decimales(montoFijoSemanal)));
					validartxtMontoFijoMensual.setRawValue(formatNumber.new(redondeo2decimales(montoFijoMes)));
					calculosTablaAhorroIncremental(montoIncremental , montoAnual);
					muestraEscondeBotones(2);
				}
				break;
			default:
				console.log('FUNCION calcularAhorro() DICE: Lo lamento actualmente no se cuenta con el pFormaCalcular (---'+pFormaCalcular+'---)');
				break; 	
		}
	}
	else
	{
		mensajeDialogo(MENSAJE5, 4);
	}
}
function calculosTablaAhorroIncremental(pMontoIncremental, pMontoAnual)
{
	var arregloTablaAhorroIncremental = new Array(52);
	var arregloFilaTablaAhorroIncremental = { "pago" : "" , "del" : "" , "al" : "" ,
	"ahorro" : "" , "acumulado" : "" , "mensual" : "" , "incremento_mensual" : ""};

	var arregloTablaAhorroIncrementalResumen = new Array(13);
	var arregloFilaTablaAhorroIncrementalResumen = { "pago" : "" , "del" : "" , "al" : "" ,
	"ahorro" : "" , "acumulado" : "" , "mensual" : "" , "incremento_mensual" : ""};
	var contSemana = 0;
	var contPagoSemanaResumen = 0;

	var fechaHoy = obtenerFecha();
 	var montoAcomulado = 0;
 	var cMontoFijoMensual = '-';
 	var cIncrementoMensual  = '-';
 	var cont=0;

 	var cFechaIncioFormato = '';
	var cSemanaSiguiente    = '';
	var cFechaFinFormato   = '';
	var montoIncremental = pMontoIncremental;
	var sumaMontoIncremental = 0;
	var montoAhorroMensual = 0;
	var columnaAhorroMensual = "";
	var ahorroIncrementalAcumulado = 0;
	var incrementoMensual = 0;
	var columnaIncrementoMensual = "";
	var penultimaFila = {};
	var penultimaFilaResumen = {};
	var auxiliar = '';//para redondeo y formato a pMontoAnual antes de enviar a la vista
	for (var i = 0; i < 52; i++) 
	{
		contSemana ++;
		//Calculo de columna Mi Ahorro
		sumaMontoIncremental =  redondeo2decimales(sumaMontoIncremental + montoIncremental);
		//fin calculo de columna Mi Ahorro
		//*****************************************
		//Calculo de columna ahorro acumulado
		ahorroIncrementalAcumulado = redondeo2decimales(ahorroIncrementalAcumulado + sumaMontoIncremental);
		//Fin calculo de columna ahorro acumulado
		//*****************************************
		//Calculo columna "ahorro mensual" e "incremento ahorro mensual"
		montoAhorroMensual = redondeo2decimales(montoAhorroMensual + sumaMontoIncremental);
		if (i == 3)
 		{
 			incrementoMensual=montoAhorroMensual;	
 		}
 		else if(i == 7)
 		{
 			incrementoMensual=montoAhorroMensual-incrementoMensual;
 		}
		if (contSemana == 4) 
		{
			columnaAhorroMensual = formatNumber.new(montoAhorroMensual, "$");
			columnaIncrementoMensual = formatNumber.new(redondeo2decimales(incrementoMensual), "$");
		}
		else
		{
			columnaAhorroMensual = "";
			columnaIncrementoMensual = "";
		}
		//fin calculo columna "ahorro mensual" e "incremento ahorro mensual"
		//*****************************************
		if (i > 0)
 		{
 			fechaHoy = sumarUnaSemanaInicio(fechaHoy);
 		}
		cFechaIncioFormato = fechaHoy.substr(8,2) + "-" + obtenerNombreMes(parseInt(fechaHoy.substr(5,2))) + "-" + fechaHoy.substr(0,4);
		cSemanaSiguiente   = sumarUnaSemana(fechaHoy);
		cFechaFinFormato   = cSemanaSiguiente.substr(8,2) + "-" + obtenerNombreMes( parseInt(cSemanaSiguiente.substr(5,2))) + "-" + cSemanaSiguiente.substr(0,4);
		
 		if (i==51) 
 		{
 			penultimaFila = arregloTablaAhorroIncremental[50];

 			sumaMontoIncremental = redondeo2decimales(pMontoAnual - penultimaFila["acumulado"]); 
			ahorroIncrementalAcumulado = redondeo2decimales(parseFloat(pMontoAnual));

			penultimaFilaResumen = arregloTablaAhorroIncrementalResumen[11];
			montoAhorroMensual = redondeo2decimales(ahorroIncrementalAcumulado - penultimaFilaResumen["acumulado"]);
 		}
		//******************************************************************************************************
		//llenado tabla incremental
		//******************************************************************************************************
		arregloFilaTablaAhorroIncremental = { "pago" : (i+1) , "del" : cFechaIncioFormato , "al" : cFechaFinFormato ,
		"ahorro" : sumaMontoIncremental , "acumulado" : ahorroIncrementalAcumulado ,
		 "mensual" : columnaAhorroMensual , "incremento_mensual" : columnaIncrementoMensual};
		arregloTablaAhorroIncremental[i] = arregloFilaTablaAhorroIncremental;
		//******************************************************************************************************
		//Fin llenado tabla incremental
		//******************************************************************************************************
	
		//******************************************************************************************************
		//llenado tabla resumen incremental
		//******************************************************************************************************
		if (contSemana==1) 
		{
			var cMesresumen = fechaHoy.substr(5,2);
			var iMesresumen = parseInt(cMesresumen);
			var cNombreMesresumen = obtenerNombreMes(iMesresumen);
			var cFechaFinalresumen = fechaHoy.substr(8,2) + "-" + cNombreMesresumen + "-" + fechaHoy.substr(0,4);
		}

		if (contSemana == 4) 
		{
			contPagoSemanaResumen ++; //contador para saber la cantidad de pagos al año
			arregloFilaTablaAhorroIncrementalResumen = { "pago" : contPagoSemanaResumen , "del" : cFechaFinalresumen , "al" : cFechaFinFormato ,
			"importe" : montoAhorroMensual , "acumulado" : ahorroIncrementalAcumulado };
			arregloTablaAhorroIncrementalResumen[(contPagoSemanaResumen-1)] = arregloFilaTablaAhorroIncrementalResumen;

			contSemana = 0;

			montoAhorroMensual = 0; //se resetea para que realize el calculo cada mes
		}
		//******************************************************************************************************
		//Fin llenado tabla resumen incremental
		//******************************************************************************************************
	}
	//*******************************//
 	//Mostrar columna en calculos incrementales
 	$('th:nth-child(7)').show();
 	$('td:nth-child(7)').show();
 	//*******************************//
 	auxiliar = formatNumber.new(redondeo2decimales(pMontoAnual), "$")
	$('#ahorroFinal').html(auxiliar);
	$('#ahorroFinal3').html(auxiliar);
	addFilasTablaAhorroIncremental(arregloTablaAhorroIncremental);
	addFilasTablaAhorroIncrementalResumen(arregloTablaAhorroIncrementalResumen);
}
function addFilasTablaAhorroIncremental(pArregloTablaAhorroIncremental){
	var fila;
	var arregloTablaAhorroIncremental = pArregloTablaAhorroIncremental;
	$('#contenidoTabla').html(""); 
	$('#ContenidoTablaRes').html("");
	for (var i = 0; i < 52; i++) 
	{
		fila = arregloTablaAhorroIncremental[i];
		$('#tablaAhorro').append($(
			' <tr>'+
				'<td class="text-center">'+ fila["pago"] +'</td>'+
				'<td class="text-center">'+ fila["del"]+'</td>'+
				'<td class="text-center">'+ fila["al"] +'</td>'+
				'<td class="text-center">'+ formatNumber.new(fila["ahorro"], "$") + '</td>'+
				'<td class="text-center">'+ formatNumber.new(fila["acumulado"], "$") + '</td>'+
				'<td class="text-center">'+ fila["mensual"] + '</td>'+
				'<td class="text-center">'+ fila["incremento_mensual"]  + '</td>'+
			'</tr>') 
		);
	}
}
function addFilasTablaAhorroIncrementalResumen(pArregloTablaAhorroIncrementalResumen)
{
	var fila;
	var arregloTablaAhorroIncrementalResumen = pArregloTablaAhorroIncrementalResumen;
	for (var i = 0; i <= 12; i++) 
	{
		fila = arregloTablaAhorroIncrementalResumen[i];
		$('#tablaResumen').append($(
			' <tr>'+
				'<td class="text-center">'+ fila["pago"] +'</td>'+
				'<td class="text-center">'+ fila["del"]+'</td>'+
				'<td class="text-center">'+ fila["al"] +'</td>'+
				'<td class="text-center">'+ formatNumber.new(fila["importe"], "$") + '</td>'+
				'<td class="text-center">'+ formatNumber.new(fila["acumulado"], "$") + '</td>'+
			'</tr>') 
		);
	}
}
function llenarTablaMontosFijos(pMontoFijoSemanal, pMontoAnual)
{
 	var fechaHoy = obtenerFecha();
 	var montoAcomulado = 0;
	var cMontoFijoMensual  = '-';
	var cIncrementoMensual = '-';
 	var cont=0;

	var cFechaIncioFormato = '';
	var cSemanaSiguiente   = '';
	var cFechaFinFormato   = '';
	
	var arregloTablaResumen = new Array(13);
	var arregloFilaTablaResumen = { "pago" : "" , "del" : "" , "al" : "" , "importe" : "" , "acumulado" : ""}
	var numPago  = 0;
	var auxiliar = '';//para redondear y formatear pMontoAnual antes de enviar a html

 	$('#contenidoTabla').html(""); 
	$('#ContenidoTablaRes').html("");
 	for(var i = 1; i < 53; i++)
 	{
		montoAcomulado += pMontoFijoSemanal;
		cont += 1;
 		if (i > 1)
 		{
 			fechaHoy = sumarUnaSemanaInicio(fechaHoy);
 		}
		cFechaIncioFormato = fechaHoy.substr(8,2) + "-" + obtenerNombreMes(parseInt(fechaHoy.substr(5,2))) + "-" + fechaHoy.substr(0,4);
		cSemanaSiguiente   = sumarUnaSemana(fechaHoy);
		cFechaFinFormato   = cSemanaSiguiente.substr(8,2) + "-" + obtenerNombreMes( parseInt(cSemanaSiguiente.substr(5,2))) + "-" + cSemanaSiguiente.substr(0,4);
		if (cont == 4)
 		{
			cMontoFijoMensual  = formatNumber.new(redondeo2decimales(pMontoFijoSemanal * 4), "$");
		
			cIncrementoMensual = formatNumber.new(redondeo2decimales((pMontoFijoSemanal * 4) - (pMontoFijoSemanal * 4)), "$");
 		}
		if ( i == 4 ) 
		{ 
			cIncrementoMensual = cMontoFijoMensual
		}
		$('#tablaAhorro').append($(
			'<tr>'+
			'<td class="text-center">' + i + '</td>' +
			'<td class="text-center">' + cFechaIncioFormato +'</td>' +
			'<td class="text-center">' + cFechaFinFormato + '</td>' +
			'<td class="text-center">' + formatNumber.new(redondeo2decimales(pMontoFijoSemanal), "$") + '</td>' +
			'<td class="text-center">' + formatNumber.new(redondeo2decimales(montoAcomulado), "$")  + '</td>' +
			'<td class="text-center">' + cMontoFijoMensual + '</td>' +
			'<td class="text-center">' + cIncrementoMensual + '</td>' + 
			'</tr>'
		));
		if (cont==1) 
		{
			//fechaHoy = 2018-12-20
			var cMesresumen = fechaHoy.substr(5,2);
			var iMesresumen = parseInt(cMesresumen);
			var cNombreMesresumen = obtenerNombreMes(iMesresumen);
			//var cFechaFinal = fechaHoy.substr(0,5) + cNombreMes + fechaHoy.substr(7,3);
			var cFechaFinalresumen = fechaHoy.substr(8,2) + "-" + cNombreMesresumen + "-" + fechaHoy.substr(0,4);
		}
		if (cont == 4)
 		{
 			numPago ++;

 			arregloFilaTablaResumen = { "pago" : numPago , "del" : cFechaFinalresumen , "al" : cFechaFinFormato , "importe" : cMontoFijoMensual , "acumulado" : formatNumber.new(redondeo2decimales(montoAcomulado), "$")};
 	
 			arregloTablaResumen[numPago-1] = arregloFilaTablaResumen;
 		}
		if (cont == 4) 
		{
			cIncrementoMensual = '-';
			cMontoFijoMensual  = '-';
			cont = 0;
		}	
 	}
 	//*******************************//
 	//Ocultar columna en calculos fijos
	$('th:nth-child(7)').hide();
 	$('td:nth-child(7)').hide();
	//*******************************//
 	llenarTablaResumenMontosFijos(arregloTablaResumen);
 	auxiliar = formatNumber.new(redondeo2decimales(pMontoAnual), "$");
 	$('#ahorroFinal').html(auxiliar);
	$('#ahorroFinal3').html(auxiliar);
}
function llenarTablaResumenMontosFijos(pArregloTablaResumen)
{
	arregloTablaResumen = pArregloTablaResumen;
	for (var i = 0; i < 13; i++) 
	{
		fila = arregloTablaResumen[i];
		$('#tablaResumen').append($(
			' <tr>'+
				'<td class="text-center">'+ fila["pago"] +'</td>'+
				'<td class="text-center">'+ fila["del"]+'</td>'+
				'<td class="text-center">'+ fila["al"] +'</td>'+
				'<td class="text-center">'+ fila["importe"]   + '</td>'+
				'<td class="text-center">'+ fila["acumulado"]  + '</td>'+
			'</tr>') 
		);
	}
}
function validarCamposMontos(pFormaCalcular)
{
	var respuesta = false;

	if(pFormaCalcular == 1)
	{
		if(validartxtMontoAhorrarAnio.getRawValue().replace('$', '') !='')
		{
			respuesta = true;
		}
		else
		{
			respuesta = false;
		}
	}
	if(pFormaCalcular == 2)
	{
		if(validartxtMontoFijoSemanal.getRawValue().replace('$', '') !='')
		{
			respuesta = true;
		}
		else
		{
			respuesta = false;
		}
	}
	if(pFormaCalcular == 3)
	{
		if(validartxtMontoFijoMensual.getRawValue().replace('$', '') !='')
		{
			respuesta = true;
		}
		else
		{
			respuesta = false;
		}
	}
	if(pFormaCalcular == 4)
	{
		if(validartxtMontoIncremental.getRawValue().replace('$', '') !='')
		{
			respuesta = true;
		}
		else
		{
			respuesta = false;
		}
	}
	return respuesta;
}
function redondeo2decimales(numero)
{
	var flotante = parseFloat(numero);
	var resultado = Math.round(flotante * 100) / 100;
	//var resultadoAux = parseFloat(Math.round(flotante*100)/100).toFixed(2);
	//var resultado = resultadoAux.toFixed(2);
	return resultado;
}
function muestraEscondeBotones(opc)
{
	switch(opc)
	{
		case 1:
			$('#btnUnirseReto').hide(500);
			$('#btnCalcularAhorro').show(500);
			break; 
		case 2:
			$('#btnCalcularAhorro').hide(500);
			$('#btnUnirseReto').show(500);
			break;
		default:
			console.log('FUNCION muestraEscondeBotones() DICE: Lo lamento actualmente no se cuenta con la OPC (---'+opc+'---)');
			break; 	
	}
}
function mensajeDialogo(sMensaje, iTipoFoco)
{
	var newHtml = "<div class='exito'>";
	var newHtml = "<div>";
	newHtml += "<p>";
	newHtml += sMensaje;
	newHtml += "</p></div>";
	//$("#Mensaje").dialog('destroy'); 
	$('#Mensaje').html(newHtml);
	$('#Mensaje').dialog(
		{
			modal:true,
			resizable:false,
			title: 'Reto del Ahorro Afore Coppel',
			buttons:
			{
				Aceptar: function() 
				{
					$('#Mensaje').html("");
					$(this).dialog( "close" );
					$(this).dialog('destroy');

					if (iTipoFoco == 1) { $('#txtNombre').focus(); }
					if (iTipoFoco == 2) { $('#txtEdad').focus(); }
					if (iTipoFoco == 3) { $('#txtMontoAhorrarAnio').focus(); }
					if (iTipoFoco == 4) 
					{ 
						devolverFocoAcampoVacio();
					}
					if (iTipoFoco == 5)
					{
						$('#txtNombre').focus(); 
					}
				}							
			}
		}
	).parent('.ui-dialog').find('.ui-dialog-titlebar-close').hide();

	$('.ui-dialog-buttonpane').find('button:contains("ACEPTAR")').css('width', '80px');
	$('.ui-dialog-buttonpane .ui-dialog-buttonset').css({ float:'none'});
	$('.ui-dialog-buttonpane .ui-dialog-buttonset').attr({align:'center'});	
}
var formatNumber = {
	separador: ",", // separador para los miles
	sepDecimal: '.', // separador para los decimales
	formatear:function (num)
	{
		num += '';
		var splitStr  = num.split('.');
		var splitLeft = splitStr[0];
		var sCad = '';
		if (splitStr.length > 1)
		{
			sCad = splitStr[1];
			if (sCad.length == 1)
			{
				sCad = sCad + "0";
				splitStr[1] = sCad;
			}
			var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
			var regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) 
			{
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}

			return this.simbol + splitLeft +splitRight;
		}
		else
		{
			var regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) 
			{
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}
			return this.simbol + splitLeft + ".00"
		}
	},
	new:function(num, simbol)
	{
		this.simbol = simbol ||'';
		return this.formatear(num);
	}
}
/*
console.log(formatNumber.new(123456779.18, "$")); // retorna "$123.456.779,18"
console.log(formatNumber.new(123456779.18)); // retorna "123.456.779,18"
console.log(formatNumber.new(123456779)); // retorna "$123.456.779"
*/
function obtenerFecha()
{
	var Hoy = new Date();
	var d, m;
	if (Hoy.getDate() < 10) {
	 	d = "0" + Hoy.getDate();
	}
	else
	{
	 	d = Hoy.getDate();
	}

	if ((Hoy.getMonth() + 1) < 10)
	{
		m = "0" + (Hoy.getMonth() + 1);
	}
	else
	{
		m = (Hoy.getMonth() + 1);
	}
	var FechaActual = Hoy.getFullYear() + "-" + m + "-" + d;
	return FechaActual;
}
function sumarUnaSemana(dfecha)
{
	var fecha = new Date(dfecha);
	var dias  = 7; // Número de días a agregar
	fecha.setDate(fecha.getDate() + dias);
	var d , m;
	if (fecha.getDate() < 10) 
	{
		d = "0" + fecha.getDate();
	}
	else
	{
		d = fecha.getDate();
	}
	if ((fecha.getMonth() + 1) < 10) 
	{
		m = "0" + (fecha.getMonth() + 1);
	}
	else
	{
		m = (fecha.getMonth() + 1);
	}
	var FechaMod = fecha.getFullYear() + "-" +  m + "-" + d;
	return FechaMod;
}
function sumarUnaSemanaInicio(dfecha)
{
	//funcion para delimitar las semanas de 7 dias
	var d , m;
	var fecha = new Date(dfecha);
	fecha.setDate(fecha.getDate() + 8);// Número de días a agregar
	if (fecha.getDate()<10) {
		d = "0" + fecha.getDate();
	}
	else
	{
		d = fecha.getDate();
	}
	if ((fecha.getMonth() + 1 ) < 10) 
	{
		m = "0" + (fecha.getMonth() + 1);
	}
	else
	{
		m = (fecha.getMonth() + 1);
	}
	var FechaMod = fecha.getFullYear() + "-" +  m + "-" + d;
	return FechaMod;
}
function obtenerNombreMes(a)
{
	var mNames = [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]; 
	return mNames[a - 1]; 
}
function limpiarCapturas(pRefCalcular)
{
	devolverFocoAcampoVacio();
	validartxtMontoAhorrarAnio.setRawValue();
	validartxtMontoFijoSemanal.setRawValue();
	validartxtMontoFijoMensual.setRawValue();
	validartxtMontoIncremental.setRawValue();
	muestraEscondeBotones(1);
}
function devolverFocoAcampoVacio()
{
	var opcReferencia = $('#cboFormaCalcular').val();
	if ($('#txtNombre').val().trim() == '') 
	{
		$('#txtNombre').val('');
		$('#txtNombre').focus();
	}
	else if($('#txtEdad').val() == '')
	{
		$('#txtEdad').focus();
	}
	else
	{
		if(opcReferencia == 1){ $('#txtMontoAhorrarAnio').focus(); }
		if(opcReferencia == 2){ $('#txtMontoFijoSemanal').focus(); }
		if(opcReferencia == 3){ $('#txtMontoFijoMensual').focus(); }
		if(opcReferencia == 4){ $('#txtMontoIncremental').focus(); }
	}
} 
function obtenerFactor()
{
	$.ajax
	({
		url: "php/enrrutador.php",
		type: "POST",
		//async: false,
		async: true,
		dataType: "json",
		data: {
			opcion: 1,
		},
		success: function(data)
		{
			FACTOR=parseFloat(data);
		},
		error: function(a, b, d) {
			alert("error ajax " + a + " " + b + " " + d);
		}
	});
	return FACTOR;
}
function limpiarCamposPorCambioEnCaptura(opc)
{
	switch (opc)
	{
		case 1:
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;		
		case 2:
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;		
		case 3:
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoIncremental.setRawValue();
			break;
		case 4:
			validartxtMontoFijoSemanal.setRawValue();
			validartxtMontoAhorrarAnio.setRawValue();
			validartxtMontoFijoMensual.setRawValue();
			break;
		default:
			console.log('FUNCION limpiarCamposPorCambioEnCaptura() DICE: Lo lamento actualmente no se cuenta con la OPC (---'+opc+'---)');
			break; 
	}	
}
function validaCamposObligatorios()
{
	//console.log($('#txtNombre').val() + $('#txtEdad').val()+ $('#txtMontoAhorrarAnio').val() + $('#txtMontoFijoSemanal').val() +$('#txtMontoFijoMensual').val()+ $('#txtMontoIncremental').val()  )
	var respuesta = false;
	if ($('#txtNombre').val().trim() != '' && $('#txtEdad').val() != '' && validartxtMontoAhorrarAnio.getRawValue().replace('$', '') != '' && validartxtMontoFijoSemanal.getRawValue().replace('$', '') != '' && validartxtMontoFijoMensual.getRawValue().replace('$', '') != '' && validartxtMontoIncremental.getRawValue().replace('$', '') != '')
	{
		respuesta = true;
	}
	else
	{
		respuesta = false;
		mensajeDialogo(MENSAJE3, 4);
		//devolverFocoAcampoVacio();
	}
	return respuesta;
}
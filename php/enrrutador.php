<?php
include_once ('CGenerales.php');
include_once ("JSON.php");

$objGn   = new CGenerales();
$json    = new Services_JSON();
$arrResp = array();
$opcion  = isset($_POST['opcion']) ? $_POST['opcion'] : '';

switch($opcion) 
{
	case 1:
	  	$arrResp = $objGn->obtenerFactor();
		break;
	default:
		break;
}
echo $json->encode($arrResp);
?>
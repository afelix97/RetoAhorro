<?php
$xml = simplexml_load_file("../config/config.xml");

$factor = $xml->Factor;

define("FACTOR", $factor);
?>

<?php

$dictionnaire = file_get_contents('dictionnaire.json');

$dictionnaireArray = json_decode($dictionnaire, true);

$word = array_rand($dictionnaireArray);

$lifePoints = 6;

$split = str_split(strtoupper($word));
$count = count($split);

include("views/index.phtml");

?>
<?php
	$_POST = json_decode(file_get_contents('php://input'), true);
	echo var_dump($_POST);


	// декодируем json файл, иначе php с json не работат
	// массив данных POST
	// var_dump - превращает данные клиента в строку, и показывает обратно на клиенте, тот response, который будет приходить от сервера
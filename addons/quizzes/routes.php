<?php

$router->post(
	'/quizzeschild',
	\MasterStudy\Lms\Http\Controllers\Quiz\CreateControllerChild::class,
	\MasterStudy\Lms\Routing\Swagger\Routes\Quiz\Create::class
);

$router->get(
	'/quizzeschild/{quiz_id}',
	\MasterStudy\Lms\Http\Controllers\Quiz\GetControllerChild::class,
	\MasterStudy\Lms\Routing\Swagger\Routes\Quiz\Get::class
);

$router->put(
	'/quizzeschild/{quiz_id}',
	\MasterStudy\Lms\Http\Controllers\Quiz\UpdateControllerChild::class,
	\MasterStudy\Lms\Routing\Swagger\Routes\Quiz\Update::class
);

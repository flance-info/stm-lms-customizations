<?php

$router->post(
	'/assignmentschild',
	\MasterStudy\Lms\Pro\addons\assignments\Http\Controllers\CreateController::class,
	\MasterStudy\Lms\Pro\addons\assignments\Routing\Swagger\Create::class,
);

$router->get(
	'/assignmentschild/{assignment_id}',
	\MasterStudy\Lms\Pro\addons\assignments\Http\Controllers\GetControllerChild::class,
	\MasterStudy\Lms\Pro\addons\assignments\Routing\Swagger\GetChild::class,
);

$router->put(
	'/assignmentschild/{assignment_id}',
	\MasterStudy\Lms\Pro\addons\assignments\Http\Controllers\UpdateControllerChild::class,
	\MasterStudy\Lms\Pro\addons\assignments\Routing\Swagger\UpdateChild::class,
);

$router->delete(
	'/assignments/{assignment_id}',
	\MasterStudy\Lms\Pro\addons\assignments\Http\Controllers\DeleteController::class,
	\MasterStudy\Lms\Pro\addons\assignments\Routing\Swagger\Delete::class,
);

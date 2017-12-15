<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {
    $api->post('authenticate', 'App\Http\Controllers\AuthController@authenticate');
    $api->post('get_friends', 'App\Http\Controllers\UsersController@get_friends');
});

// $api->version('v1', ['middleware' => 'api.auth'], function ($api) {
//     $api->resource('words', 'App\Http\Controllers\WordsController');
//     $api->resource('categories', 'App\Http\Controllers\CategoryController');
// });
$api->version('v1', function ($api) {
    $api->resource('words', 'App\Http\Controllers\WordsController');
    $api->resource('categories', 'App\Http\Controllers\CategoryController');
});
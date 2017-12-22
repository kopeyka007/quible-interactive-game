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
    $api->post('auth/login', 'App\Http\Controllers\AuthController@login');
    $api->post('auth/logout', 'App\Http\Controllers\AuthController@logout');
    $api->post('auth/refresh', 'App\Http\Controllers\AuthController@refresh');
    $api->get('auth/account', 'App\Http\Controllers\AuthController@account');
    $api->post('get_friends', 'App\Http\Controllers\UsersController@get_friends');
});

$api->version('v1', ['middleware' => 'api.auth'], function ($api) {
    $api->resource('words', 'App\Http\Controllers\WordsController');
    $api->resource('categories', 'App\Http\Controllers\CategoryController');
});
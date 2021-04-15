<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/** LOGUEO SIN PROTECCION **/

Route::post('auth/signin', 'UserController@authenticate');

Route::get('clients/all', 'ClientsController@all');

/** PROTECTED BY JWT **/

Route::group(['middleware' => ['jwt.verify']], function() {

/** LOGUEO **/

Route::post('auth/signup', 'UserController@register');

Route::post('auth/registered', 'UserController@getAuthenticatedUser');
    
/** USERS **/

Route::get('user/all', 'UserController@all');

Route::get('user/{id}', 'UserController@single');

Route::post('user/create', 'UserController@create');

Route::post('user/store', 'UserController@store');

Route::post('user/delete', 'UserController@delete');

/** ROLE **/

Route::get('role/all', 'RoleController@all');

Route::get('role/{id}', 'RoleController@single');

Route::post('role/create', 'RoleController@create');

Route::post('role/store', 'RoleController@store');

Route::post('role/delete', 'RoleController@delete');

/** CLIENTS **/

Route::get('clients/{id}', 'ClientsController@single');

Route::post('clients/create', 'ClientsController@create');

Route::post('clients/store', 'ClientsController@store');

Route::post('clients/delete', 'ClientsController@delete');

/** PASSWORD **/

Route::post('password/update', 'PasswordController@update');
    
    
});


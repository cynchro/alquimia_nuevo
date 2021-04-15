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


Route::group(['middleware' => ['jwt.verify']], function() {

/** LOGUEO **/

Route::post('auth/signup', 'UserController@register');

Route::post('auth/registered', 'UserController@getAuthenticatedUser');
    
/** USERS **/

Route::get('user/all', 'UserController@all');

Route::get('user/{id}', 'UserController@single');

Route::post('user/create', 'UserController@create');

Route::post('user/update', 'UserController@update');

Route::post('user/delete', 'UserController@delete');

/** ROLE **/

Route::get('role/all', 'RoleController@all');

Route::get('role/{id}', 'RoleController@single');

Route::post('role/create', 'RoleController@create');

Route::post('role/update', 'RoleController@update');

Route::post('role/delete', 'RoleController@delete');

/** PASSWORD **/

Route::post('password/update', 'PasswordController@update');
    
    
});


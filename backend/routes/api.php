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

Route::post('auth/signin', 'AuthController@authenticate');

/** PROTECTED BY JWT **/

Route::group(['middleware' => ['jwt.verify']], function() {

/** LOGUEO **/

Route::post('auth/signup', 'AuthController@register');

Route::post('auth/registered', 'AuthController@getAuthenticatedUser');

Route::post('auth/logout', 'AuthController@logout');
    
/** USERS **/

Route::post('user/create', 'UserController@create');

Route::post('user/store', 'UserController@store');

Route::post('user/delete', 'UserController@delete');

Route::get('user/all', 'UserController@all');

Route::get('user/{id}', 'UserController@single');

/** ROLE **/

Route::post('role/create', 'RoleController@create');

Route::post('role/store', 'RoleController@store');

Route::post('role/delete', 'RoleController@delete');

Route::get('role/all', 'RoleController@all');

Route::get('role/{id}', 'RoleController@single');

/** CLIENTS **/

Route::post('clients/create', 'ClientsController@create');

Route::post('clients/store', 'ClientsController@store');

Route::post('clients/delete', 'ClientsController@delete');

Route::get('clients/all', 'ClientsController@all'); 

Route::get('clients/{id}', 'ClientsController@single');


/** CONTACTS**/


Route::post('contacts/create', 'ContactsController@create');

Route::post('contacts/store', 'ContactsController@store');

Route::post('contacts/delete', 'ContactsController@delete');

Route::get('contacts/all', 'ContactsController@all');

Route::get('contacts/{id}', 'ContactsController@single');

/** PASSWORD **/

Route::post('password/update', 'PasswordController@update');
    
    
});


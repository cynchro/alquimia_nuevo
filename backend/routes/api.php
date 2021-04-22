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

Route::get('contacts/all/{id}', 'ContactsController@all');

Route::get('contacts/single/{id}', 'ContactsController@single');

Route::get('contacts/{id}', 'ContactsController@single');

/** PRODUCTS **/

Route::post('products/create', 'ProductsController@create');

Route::post('products/store', 'ProductsController@store');

Route::post('products/delete', 'ProductsController@delete');

Route::get('products/all', 'ProductsController@all'); 

Route::get('products/{id}', 'ProductsController@single');

/** SUPPLIERS **/

Route::post('suppliers/create', 'SuppliersController@create');

Route::post('suppliers/store', 'SuppliersController@store');

Route::post('suppliers/delete', 'SuppliersController@delete');

Route::get('suppliers/all', 'SuppliersController@all');

Route::get('suppliers/{id}', 'SuppliersController@single');

/** PASSWORD **/

Route::post('password/update', 'PasswordController@update');

/** PAY TYPE **/

Route::post('paytype/create', 'PayTypeController@create');

Route::post('paytype/store', 'PayTypeController@store');

Route::post('paytype/delete', 'PayTypeController@delete');

Route::get('paytype/all', 'PayTypeController@all');

Route::get('paytype/{id}', 'PayTypeController@single');

/** SALES **/

Route::post('sales/verify', 'SalesController@verify');

Route::post('sales/items/add', 'SalesController@itemsAdd');

Route::post('sales/items/del', 'SalesController@itemsDel');

Route::post('sales/items/qcalc', 'SalesController@itemsQcalc');

Route::get('sales/items/total/{id}', 'SalesController@itemsTotal');

Route::get('sales/items/{id}', 'SalesController@items');

/*

Route::post('paytype/store', 'PayTypeController@store');

Route::post('paytype/delete', 'PayTypeController@delete');

Route::get('paytype/all', 'PayTypeController@all');

Route::get('paytype/{id}', 'PayTypeController@single');*/
    
    
});


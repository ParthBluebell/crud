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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Base Url
Route::get('get-base-url', 'api\UsersController@baseurl');


// User Details
Route::get('users', 'api\UsersController@userslist');
Route::post('users', 'api\UsersController@addUser');
Route::get('users/{userId}', 'api\UsersController@userDetails');
Route::delete('users/{userId}', 'api\UsersController@deleteUser');

Route::put('users/{userId}', 'api\UsersController@editUser');

Route::match(['get', 'post'], 'get-user-list/{id}', ['as' => 'get-user-list', 'uses' => 'api\UsersController@getuserslist']);
// Route::match(['get', 'post'], 'get-base-url', ['as' => 'get-base-url', 'uses' => 'api\UsersController@baseurl']);
// Route::match(['get', 'post'], 'add-user', ['as' => 'add-user', 'uses' => 'api\UsersController@addUser']);

// Route::match(['get', 'post'], 'get-user-details', ['as' => 'get-user-details', 'uses' => 'api\UsersController@userDetails']);

// Route::match(['get', 'post'], 'edit-user', ['as' => 'edit-user', 'uses' => 'api\UsersController@editUser']);
// Route::match(['get', 'post'], 'delete-user', ['as' => 'delete-user', 'uses' => 'api\UsersController@deleteUser']);

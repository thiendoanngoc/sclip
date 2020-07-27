<?php

use Illuminate\Http\Request;

Route::post('login', 'ApiController@login');
Route::post('register', 'ApiController@register');

Route::post('setToken', 'ApiController@setToken');
Route::post('checkToken', 'ApiController@checkToken');

Route::get('scliplist', 'SClipController@index');
Route::get('sclip/{sclip_id}', 'SClipController@show');

Route::post('comment', 'CommentController@index');
Route::post('view_profile', 'UserController@viewProfile');
Route::post('list_sclip', 'UserController@listSclip');
Route::post('view_count', 'SClipController@viewCount');

Route::middleware('jwt.auth')->group(function() {
    Route::get('user', 'ApiController@user');
    Route::get('logout', 'ApiController@logout');

    Route::post('upload', 'SClipController@upload');
    Route::post('post_comment', 'CommentController@postComment');
    Route::post('change_password', 'UserController@changePassword');
    Route::post('avatar', 'UserController@changeAvatar');
});

Route::middleware('jwt.refresh')->get('/token/refresh', 'ApiController@refresh');
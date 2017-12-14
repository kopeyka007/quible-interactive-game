<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    public function get_friends(Request $request) {
        return User::find($request->user_id)->friends;
    }
}

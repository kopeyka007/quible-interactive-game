<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function authenticate(Request $request) {
        $credentials = $request->only("email", "password");
        try {
            if ( ! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'User credentials are not correct!'], 401);
            }
        } catch (JWTException $ex) {
            return response()->json(['error' => 'Something went wrong!', $ex->getStatusCode()]);
        }
        return response()->json(compact('token'));
    }
}

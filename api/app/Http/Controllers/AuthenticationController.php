<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // check if user exist
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => "Invalid credentials"]);
        }

        return response()->json(['message' => 'User authenticated', "token" => $user->createToken('user login')->plainTextToken]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccesstoken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function getUserProfile(Request $request)
    {

        return response()->json(Auth::user());
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:rfc,dns|unique:users',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|same:password'
        ]);

        // Encrypt password
        $hashedPassword = Hash::make($request->password);

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword
        ]);

        //return response JSON user is created
        if($user) {
            return response()->json([
                'message' => "User created",
                'user'    => $user,
            ], 200);
        }

        //return JSON process insert failed
        return response()->json([
            "message" => "Something went wrong"
        ], 500);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{

  public function store(Request $request)
  {
    $request->validate([
      'email' => ['required'],
      'password' => ['required'],
    ]);

    if (Auth::attempt($request->only('email', 'password'), $request->remember)) {
      session()->regenerate();
      return response([
        'type' => 'success',
        'message' => 'You are logged in.',
      ], Response::HTTP_OK);
    }

    return response([
      'type' => 'error',
      'message' => 'The provide credentials does not match our record.',
    ], Response::HTTP_UNPROCESSABLE_ENTITY);

  }

  public function destroy()
  {
    Auth::logout();

    return response([
      'type' => 'success',
      'message' => 'You are now logout.',
    ], Response::HTTP_OK);
  }
}

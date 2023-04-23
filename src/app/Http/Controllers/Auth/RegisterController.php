<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{

  public function store(Request $request)
  {
    $validated = $request->validate([
      'fname' => ['required'],
      'lname' => ['required'],
      'email' => ['required', 'unique:users'],
      'password' => ['required'],
    ]);

    if ($validated) {

      $newUser = User::create($validated);

      Auth::login($newUser);

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
}

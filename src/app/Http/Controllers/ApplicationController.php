<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplicationController extends Controller
{
  /**
   * Handle the incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function getAppData(Request $request)
  {
    $newSources['preferences']['sources'] = [
      [
        "name" => "NewsApi",
        "alias" => "World Best News",
        "url" => "https://newsapi.org/v2",
        "apiId" => null,
        "apiKey" => "6c69910732074912bd0358a31881cf9d",
        "secret" => null,
        "isPrefer" => 1,
      ],
      [
        "name" => "ABC",
        "alias" => "Abc",
        "url" => "https://newsapi.org/v2",
        "apiId" => null,
        "apiKey" => "6c69910732074912bd0358a31881cf9d",
        "secret" => null,
        "isPrefer" => 0,
      ],
      [
        "name" => "NY Times",
        "alias" => "NY Times",
        "url" => "https://newsapi.org/v2",
        "apiId" => null,
        "apiKey" => "6c69910732074912bd0358a31881cf9d",
        "secret" => null,
        "isPrefer" => 0,
      ],
    ];
    return response($newSources, Response::HTTP_OK);
  }
}

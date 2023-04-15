<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use jcobhams\NewsApi\NewsApi;

class HomeController extends Controller
{
  /**
   * Handle the incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function __invoke(Request $request)
  {
    $newSources['preferences'] = [
      'sources' => [
        "name" => "NewsApi",
        "alias" => "World Best News",
        "url" => "https://newsapi.org/v2",
        "apiId" => null,
        "apiKey" => "6c69910732074912bd0358a31881cf9d",
        "secret" => null,
        "isPrefer" => 1,
      ],
    ];
    // 'sources' =>[
    //   "name" => "NewsApi",
    //   "alias" => "World Best News",
    //   "url" => "https://newsapi.org/v2",
    //   "apiId" => null,
    //   "apiKey" => "6c69910732074912bd0358a31881cf9d",
    //   "secret" => null,
    //   "isPrefer" => 1,

    // ],

//     $newSources = json_decode('{
    //    "preferences":{
    //       "source":[
    //          {
    //             "name":"NewsApi",
    //             "alias":"World Best News",
    //             "url":"https://newsapi.org/v2",
    //             "apiId":null,
    //             "apiKey":"6c69910732074912bd0358a31881cf9d",
    //             "secret":null,
    //             "isPrefer":1
    //          },
    //          {
    //             "name":"GuardianOpenPlatform",
    //             "alias":"The Guardian Time",
    //             "url":"https://content.guardianapis.com",
    //             "apiId":null,
    //             "apiKey":"a513d66b-21db-4d93-8857-6e2588940438",
    //             "secret":null,
    //             "isPrefer":0
    //          },
    //          {
    //             "name":"New York Times",
    //             "alias":"NY Times",
    //             "url":"https://api.nytimes.com/svc/mostpopular/v2",
    //             "apiId":"8746fd67-8ac2-4791-932d-39102c7e6d71",
    //             "apiKey":"D7qaW2sqkVn2846u6QlbNtNYENWAUMOA",
    //             "secret":"Z4y0bt5SHU91zqMn",
    //             "isPrefer":0
    //          }
    //       ],
    //       "authors": [],
    //       "categories": [],
    //       "likes": [],
    //    }
    // }', true);
    $newsapi = new NewsApi('6c69910732074912bd0358a31881cf9d');
    $news = $newsapi->getTopHeadLines();
    return inertia('Home', ['news' => $news]);
  }
}

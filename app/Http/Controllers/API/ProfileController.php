<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller

{   
        

    public function profile()
    {
        $user_exists = Auth::check();
        return ["message" => $user_exists]; 
    }

    

}

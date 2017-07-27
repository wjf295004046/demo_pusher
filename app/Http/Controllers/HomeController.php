<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\ChatMessage;
use App\Events\ChatMessageWasReceived;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
        $user = Auth::user();
        $message = ChatMessage::create([
            'user_id' => $user->id,
            'message' => $message
        ]);

        event(new ChatMessageWasReceived($message, $user));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('Welcome', [
            'data' => Event::with('tickets')->latest()->get()
        ]);
    }

    public function eventDetails(string $slug)
    {
        $event = Event::where('slug', $slug)
            ->with('tickets')
            ->firstOrFail();

        return Inertia::render('User/Events/Show', [
            'event' => $event,
        ]);
    }

}

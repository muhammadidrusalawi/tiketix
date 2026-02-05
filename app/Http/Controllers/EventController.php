<?php

namespace App\Http\Controllers;

use App\Http\Requests\Event\CreateEventRequest;
use App\Models\Event;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => Event::with('tickets')
                ->orderBy('created_at', 'desc')
                ->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateEventRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            $tickets = $data['tickets'];
            unset($data['tickets']);

            $uploadResult = Cloudinary::uploadApi()->upload(
                $request->file('image')->getRealPath(),
                [
                    'folder' => 'Tiketix/Events',
                ]
            );

            $data['image'] = $uploadResult['secure_url'];
            $data['image_public_id'] = $uploadResult['public_id'];

            $event = Event::create($data);

            foreach ($tickets as $ticket) {
                $event->tickets()->create([
                    'name'  => $ticket['name'],
                    'price' => $ticket['price'],
                    'stock' => $ticket['stock'],
                ]);
            }

            return redirect()->route('admin.events.index')->with('success', 'Acara berhasil ditambahkan');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Admin/Events/Show', [
            'event' => $event->load('tickets'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\CreateOrderRequest;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Midtrans\Snap;
use Midtrans\Config;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    public function storeFromUser(CreateOrderRequest $request)
    {
        $items = $request->validated()['items'];

        $order = null;
        $snapToken = null;

        DB::transaction(function() use ($items, &$order) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => 0,
                'status' => 'pending',
            ]);

            $totalAmount = 0;

            foreach ($items as $item) {
                $ticket = Ticket::findOrFail($item['ticket_id']);

                $subtotal = $ticket->price * $item['quantity'];
                $totalAmount += $subtotal;

                $order->orderItems()->create([
                    'ticket_id' => $ticket->id,
                    'ticket_name' => $ticket->name,
                    'price' => $ticket->price,
                    'quantity' => $item['quantity'],
                    'subtotal' => $subtotal,
                ]);
            }

            $order->update(['total_amount' => $totalAmount]);
        });

        $order->load('user');

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        $transaction = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => $order->total_amount,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
            ],
            'enabled_payments' => ['gopay','bank_transfer','credit_card'],
        ];

        $snapToken = Snap::getSnapToken($transaction);
        $order->update(['snap_token' => $snapToken]);

        return inertia('User/Orders/Payment', [
            'order' => $order,
            'snapToken' => $snapToken,
        ]);
    }

    public function successOrder()
    {
        return Inertia::render('User/Orders/Success');
    }
}

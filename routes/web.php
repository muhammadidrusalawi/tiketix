<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/events/{slug}', [HomeController::class, 'eventDetails'])->name('events.detail');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('events', EventController::class);
});

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::post('/events/{slug}', [OrderController::class, 'storeFromUser'])->name('events.orderUser');
    Route::get('/orders/success', [OrderController::class, 'successOrder'])->name('order.success');
});

require __DIR__.'/auth.php';

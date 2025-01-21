<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CheckoutController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Models\Item; 

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;





// Shop route that uses the ItemController
Route::get('/shop', [ItemController::class, 'index'])->name('shop');

// Cart route
Route::get('/shop/cart', function () {
    return Inertia::render('Shop/Cart');
})->name('cart');

Route::post('/checkout', [CheckoutController::class, 'process'])->name('checkout.process');
Route::get('/checkout/success', function () {
    $items = Item::all();
    return Inertia::render('Shop', [
        'message' => 'Item successfully bought.',
        'items' => $items
    ]);
})->name('checkout-success');
Route::get('/checkout/cancel', function () {
    $items = Item::all();
    return Inertia::render('Shop', [
        'message' => 'Your payment was cancelled.',
        'items' => $items
    ]);
})->name('checkout-cancel');


// Item resource routes (CRUD for items)
Route::resource('items', ItemController::class);

// Add item page (only for authenticated users)
Route::get('/item/add', function () {
    return Inertia::render('Shop/AddItem'); 
})->name('item.add')->middleware('auth');

// Show individual item
Route::get('/item/{id}', function($id) { 
    return Inertia::render('Shop/Item', ['item' => Item::find($id)]);
})->name('item');

// Static pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about'); 

Route::get('/index', function () {
    return Inertia::render('Index');
});

// Welcome page with Laravel and PHP version details
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard route (only for authenticated users)
Route::get('/dashboard', function (Request $request) {
    $loggedIn = $request->query('loggedIn', false); 
    
    return Inertia::render('Dashboard', [
        'loggedIn' => $loggedIn,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Authentication routes
Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Profile routes (only for authenticated users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

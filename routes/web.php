<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Item;  // <-- This is where you import the Item model

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop'); 

Route::resource('items', ItemController::class);

// Get all items
Route::get('/api/items', [ItemController::class, 'index'])->name('items.index');

// Get a specific item by ID
Route::get('/item/{id}', function($id) {
    return Inertia::render('Shop/Item', [
        'item' => Item::find($id)  // Using the Item model here
    ]);
})->name('item');




Route::get('/shop/cart', function () {
    return Inertia::render('Shop/Cart');
})->name('cart');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about'); // Add the name if you want to ref it in href

Route::get('/index', function () {
    return Inertia::render('Index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $loggedIn = $request->query('loggedIn', false); 
    
    return Inertia::render('Dashboard', [
        'loggedIn' => $loggedIn,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

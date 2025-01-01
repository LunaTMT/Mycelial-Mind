<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;



Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop'); 

Route::get('/item', function() {
    return Inertia::render('Shop/Item');        
})->name('item');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/resources', function () {
    return Inertia::render('Resources');
})->name('resources'); // Add the name if you want to ref it in href


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

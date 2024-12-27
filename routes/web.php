<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/shop', function () {
    return Inertia::render('Shop');
})->name('shop'); // Add the name if you want to ref it in href

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


//The dashboard is what the user can access when logged in 
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

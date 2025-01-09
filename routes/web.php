    <?php

    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\ItemController;
    use App\Http\Controllers\CheckoutController;

    use App\Http\Controllers\Auth\AuthenticatedSessionController;

    use App\Models\Item; 

    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Illuminate\Http\Request;
    use Inertia\Inertia;

    Route::get('/shop', function () {
        $items = Item::all();
        
        return Inertia::render('Shop', [
            'items' => $items 
        ]);
    })->name('shop');
    Route::get('/shop/cart', function () {
        return Inertia::render('Shop/Cart');
    })->name('cart');

    Route::get('/checkout', [CheckoutController::class, 'createCheckoutSession'])->name('checkout.session');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');


    Route::resource('items', ItemController::class);


    Route::get('/item/add', function () {
        return Inertia::render('Shop/AddItem'); 
    })->name('item.add')->middleware('auth');  // Adjust based on your needs
    Route::get('/item/{id}', function($id) { 
        return Inertia::render('Shop/Item', ['item' => Item::find($id) ]);
    })->name('item');


    
 

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

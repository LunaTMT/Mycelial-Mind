<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

use Stripe\Stripe;
use Stripe\Product;
use Stripe\Price;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        try {
            $category = $request->query('category', 'All');
            $items = $category === 'All' ? Item::all() : Item::where('category', $category)->get();
            return response()->json($items);
        } catch (\Exception $e) {
            Log::error('Error fetching items: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to fetch items'], 500);
        }
    }



    public function store(Request $request)
    {
        try {
            Log::info('Store method called.');

            // Validate input data including images
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'nullable|string',
                'price' => 'required|numeric',
                'stock' => 'nullable|integer',
                'images' => 'nullable|array|max:5',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);

            Log::info('Validated data: ', $data);

            // Create the item in your database
            $item = Item::create([
                'name' => $data['name'],
                'category' => $data['category'] ?? 'Uncategorized',
                'price' => $data['price'],
                'stock' => $data['stock'] ?? 0,
            ]);

            Log::info('Item created: ', $item->toArray());

            // Handle the images if any are uploaded
            if ($request->hasFile('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $index => $image) {
                    $imageName = $index . '.' . $image->getClientOriginalExtension();
                    $path = $image->move(public_path('assets/images/products/' . $item->id), $imageName);
                    $imagePaths[] = 'assets/images/products/' . $item->id . '/' . $imageName;
                }
                $item->images = json_encode($imagePaths);
                $item->save();

                Log::info('Images saved: ', $imagePaths);
            }

            // Register the product and price in Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $product = Product::create([
                'name' => $data['name'],
                'description' => "Category: " . ($data['category'] ?? 'Uncategorized'),
            ]);

            Log::info('Stripe product created: ', $product->toArray());

            $price = Price::create([
                'unit_amount' => intval($data['price'] * 100), // Convert to cents
                'currency' => 'usd', // Adjust currency as needed
                'product' => $product->id,
            ]);

            Log::info('Stripe price created: ', $price->toArray());

            // Save Stripe product and price IDs in your database
            $item->stripe_product_id = $product->id;
            $item->stripe_price_id = $price->id;
            $item->save();

            Log::info('Redirecting to Shop.');
            $items = Item::all();

            return Inertia::render('Shop', [
                'message' => 'Item added successfully and registered with Stripe.',
                'items' => $items,
            ]);
        } catch (\Exception $e) {
            Log::error('Error storing item: ' . $e->getMessage());
            return Inertia::render('Shop/AddItem', [
                'error' => 'Unable to store item',
            ]);
        }
    }

    

    
    public function show($id)
    {
        $item = Item::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
        ]);

        $item->update($data);
        return response()->json($item);
    }

    public function destroy($id)
    {
        try {
            // Find the item
            $item = Item::findOrFail($id);
    
            // Determine the folder path
            $folderPath = public_path("assets/images/products/{$id}");
    
            // Delete the folder if it exists
            if (File::exists($folderPath)) {
                File::deleteDirectory($folderPath);
            }
    
            // Delete the item from the database
            $item->delete();
    
            // Return success response
            return response()->json(null, 204);
            
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error("Error deleting item with ID {$id}: " . $e->getMessage());
    
            // Return error response
            return response()->json(['error' => 'Unable to delete item'], 500);
        }
    }
}

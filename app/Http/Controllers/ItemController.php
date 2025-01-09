<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

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
            Log::info('Store method called.'); // Log entry point
            
            // Validate input data including images
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'nullable|string', // Make category nullable, as it's optional
                'price' => 'required|numeric',
                'stock' => 'nullable|integer',
                'images' => 'nullable|array|max:5',  // Allow up to 5 images
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',  // Validate each image
            ]);
            
            Log::info('Validated data: ', $data); // Log validated data
            
            // Create the item
            $item = Item::create([
                'name' => $data['name'],
                'category' => $data['category'] ?? 'Uncategorized', // Default category if none is selected
                'price' => $data['price'],
                'stock' => $data['stock'] ?? 0, // Provide a default value for stock
            ]);
            
            Log::info('Item created: ', $item->toArray()); // Log the created item details
        
            // Handle the images if any are uploaded
            if ($request->hasFile('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $index => $image) {
                    $imageName = $index . '.' . $image->getClientOriginalExtension();
                    
                    // Store the image directly in the public/assets/images/products/ directory
                    $path = $image->move(public_path('assets/images/products/' . $item->id), $imageName);
                    
                    // Store the image path in the array
                    $imagePaths[] = 'assets/images/products/' . $item->id . '/' . $imageName;
                }
                // Save the array of image paths as JSON in the database
                $item->images = json_encode($imagePaths);
                $item->save();
        
                Log::info('Images saved: ', $imagePaths); // Log saved image paths
            }
            
            // Redirect to the shop page after item is created
            Log::info('Redirecting to Shop.');
            $items = Item::all();
            
            return Inertia::render('Shop', [
                'message' => 'Item added successfully.',
                'items' => $items 
            ]);


        } catch (\Exception $e) {   
            Log::error('Error storing item: ' . $e->getMessage()); // Log the exception message
            return Inertia::render('Shop/AddItem', [
                'error' => 'Unable to store item'
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

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use Stripe\Stripe;
use Stripe\Product;
use Stripe\Price;
use Illuminate\Support\Facades\Log;

class ItemSeeder extends Seeder
{
    public function run()
    {
        // Set Stripe API Key
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $items = [
            [
                'name' => 'Sterile Organic Rye Grain',
                'description' => 'High-quality sterile organic rye grain, perfect for mushroom spawn production. Ensures strong and healthy mycelium growth.',
                'price' => 10,
                'stock' => 0,
                'images' => ['assets/images/products/1/0.png', 'assets/images/products/2/0.png', 'assets/images/products/3/0.png', 'assets/images/products/4/0.png'],
                'category' => 'spawn'
            ],
            [
                'name' => 'Reishi Mushroom Supplements',
                'description' => 'Premium Reishi mushroom supplement designed to support immunity and overall wellness. Contains potent adaptogens.',
                'price' => 49.99,
                'stock' => 20,
                'images' => ['assets/images/products/2/0.png', 'assets/images/products/2/0.png', 'assets/images/products/2/0.png', 'assets/images/products/2/0.png'],
                'category' => 'infused'
            ],
            [
                'name' => 'Sterile Agar Plates (10-Pack)',
                'description' => 'Pre-poured sterile agar plates for isolating strains, testing spores, and expanding mycelium cultures in a lab-grade environment.',
                'price' => 30,
                'stock' => 100,
                'images' => ['assets/images/products/3/0.png', 'assets/images/products/3/0.png', 'assets/images/products/3/0.png', 'assets/images/products/3/0.png'],
                'category' => 'grow kits'
            ],
            [
                'name' => 'Mycelium Infused Coffee - Dark Roast',
                'description' => 'Rich and aromatic coffee blend infused with functional mushroom extracts for enhanced focus and well-being.',
                'price' => 69,
                'stock' => 100,
                'images' => ['assets/images/products/4/0.png', 'assets/images/products/4/0.png', 'assets/images/products/4/0.png', 'assets/images/products/4/0.png'],
                'category' => 'foraging'
            ],
            [
                'name' => 'Complete Mushroom Grow Kit - Beginner',
                'description' => 'A full kit containing everything needed to cultivate mushrooms at home, ideal for beginners and hobbyists.',
                'price' => 420,
                'stock' => 100,
                'images' => ['assets/images/products/5/0.png', 'assets/images/products/5/0.png', 'assets/images/products/5/0.png', 'assets/images/products/5/0.png'],
                'category' => 'grow kits'
            ],
            [
                'name' => 'Sterile Organic Rye Grain - 2kg',
                'description' => 'Larger pack of sterile organic rye grain for extended mushroom spawn projects and bulk cultivation.',
                'price' => 18,
                'stock' => 50,
                'images' => ['assets/images/products/1/0.png', 'assets/images/products/1/0.png', 'assets/images/products/1/0.png', 'assets/images/products/1/0.png'],
                'category' => 'spawn'
            ],
            [
                'name' => 'Reishi Tincture - Dual Extract 50ml',
                'description' => 'Potent Reishi mushroom tincture, extracted using dual-extraction methods for maximum bioavailability and benefits.',
                'price' => 39.99,
                'stock' => 30,
                'images' => ['assets/images/products/2/0.png', 'assets/images/products/2/0.png', 'assets/images/products/2/0.png', 'assets/images/products/2/0.png'],
                'category' => 'infused'
            ],
            [
                'name' => 'Petri Dishes with Agar (20-Pack)',
                'description' => 'Lab-grade sterile petri dishes pre-filled with nutrient-rich agar for precise mycology experiments.',
                'price' => 50,
                'stock' => 200,
                'images' => ['assets/images/products/1/0.png', 'assets/images/products/3/0.png', 'assets/images/products/3/0.png', 'assets/images/products/3/0.png' ],
                'category' => 'grow kits'
            ],
            [
                'name' => 'Lion’s Mane Mushroom Coffee - Medium Roast',
                'description' => 'A smooth, medium roast coffee infused with Lion’s Mane mushroom extract for cognitive support and mental clarity.',
                'price' => 75,
                'stock' => 80,
                'images' => ['assets/images/products/4/0.png', 'assets/images/products/4/0.png', 'assets/images/products/4/0.png', 'assets/images/products/4/0.png'],
                'category' => 'foraging'
            ],
        ];

        // Loop through each item and randomize the image order
        foreach ($items as $item) {
            try {
                // Shuffle the images array
                shuffle($item['images']);

                // Create a Stripe product
                $product = Product::create([
                    'name' => $item['name'],
                    'description' => $item['description'],
                ]);

                // Log the created product
                Log::info("Stripe Product Created: " . json_encode($product));

                // Create a Stripe price
                $price = Price::create([
                    'unit_amount' => intval($item['price'] * 100), // Convert to cents
                    'currency' => 'gbp', // Adjust currency as needed
                    'product' => $product->id,
                ]);

                // Log the created price
                Log::info("Stripe Price Created: " . json_encode($price));

                // Store in database
                Item::create([
                    'name' => strtoupper($item['name']),
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'stock' => $item['stock'],
                    'images' => json_encode($item['images']),
                    'category' => strtoupper($item['category']),
                    'stripe_product_id' => $product->id,
                    'stripe_price_id' => $price->id,
                ]);

                Log::info("Item created successfully: " . $item['name']);
            } catch (\Exception $e) {
                Log::error("Error creating item in Stripe: " . $e->getMessage());
            }
        }
    }
}

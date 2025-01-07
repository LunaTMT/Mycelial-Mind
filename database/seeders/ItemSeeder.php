<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;


class ItemSeeder extends Seeder
{
    public function run()
    {
        $item1 = Item::create([
            'name' => 'Blue Shoes',
            'description' => 'Comfortable blue shoes perfect for everyday wear.',
            'price' => 49.99,
            'stock' => 100,
            'images' => json_encode(['storage/items/1/0.jpg', 'storage/items/1/1.jpg']), // Add image paths as a JSON array
            'category' => 'all'
        ]);
        
        $item2 = Item::create([
            'name' => 'Grey Shoes', // Unique name
            'description' => 'Stylish grey shoes that go with everything.',
            'price' => 59.99,
            'stock' => 150,
            'images' => json_encode(['storage/items/2/0.jpg']), // Add image path as a JSON array
            'category' => 'all'
        ]);
        
        $item3 = Item::create([
            'name' => 'Black Shoes', // Unique name
            'description' => 'Durable black shoes for all occasions.',
            'price' => 69.99,
            'stock' => 200,
            'images' => json_encode(['storage/items/3/0.jpg']), // Add image path as a JSON array
            'category' => 'all'
        ]);
    }
}




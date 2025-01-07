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
            'number_of_images' => 2,
            'category' => 'all'
        ]);
        
        $item2 = Item::create([
            'name' => 'Grey Shoes', // Unique name
            'description' => 'Stylish grey shoes that go with everything.',
            'price' => 59.99,
            'stock' => 150,
            'number_of_images' => 1,
            'category' => 'all'
        ]);
        
        $item3 = Item::create([
            'name' => 'Black Shoes', // Unique name
            'description' => 'Durable black shoes for all occasions.',
            'price' => 69.99,
            'stock' => 200,
            'number_of_images' => 1,
            'category' => 'all'
        ]);
        
        
        
    }
}




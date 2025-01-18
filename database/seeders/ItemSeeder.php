<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;


class ItemSeeder extends Seeder
{
    public function run()
    {
        $item1 = Item::create([
            'name' => 'item 1',
            'description' => 'Item 1 description',
            'price' => 10,
            'stock' => 100,
            'images' => json_encode(['assets/images/products/1/0.png', 'assets/images/products/1/1.png', 'assets/images/products/1/2.png', 'assets/images/products/1/3.png', 'assets/images/products/1/4.png']), 
            'category' => 'Agar'
        ]);
        
        $item2 = Item::create([
            'name' => 'item 2',
            'description' => 'Item 2 description',
            'price' => 49.99,
            'stock' => 20,
            'images' => json_encode(['assets/images/products/2/0.png']), // Add image paths as a JSON array
            'category' => 'Apparel'
        ]);
        
        
        $item3 = Item::create([
            'name' => 'item 3',
            'description' => 'Item 3 description',
            'price' => 30,
            'stock' => 100,
            'images' => json_encode(['assets/images/products/3/0.png']), // Add image paths as a JSON array
            'category' => 'Equipment'
        ]);

        $item4 = Item::create([
            'name' => 'item 4',
            'description' => 'Item 4 description',
            'price' => 69,
            'stock' => 100,
            'images' => json_encode(['assets/images/products/4/0.png']), // Add image paths as a JSON array
            'category' => 'Foraging'
        ]);
        

        $item5 = Item::create([
            'name' => 'item 5',
            'description' => 'Item 5 description',
            'price' => 420,
            'stock' => 100,
            'images' => json_encode(['assets/images/products/5/0.png']), // Add image paths as a JSON array
            'category' => 'Grow Kits'
        ]);
        

        $item6 = Item::create([
            'name' => 'item 6',
            'description' => 'Item 6 description',
            'price' => 10.99,
            'stock' => 100,
            'images' => json_encode(['assets/images/products/6/0.png']), // Add image paths as a JSON array
            'category' => 'Spawn'
        ]);
        
        
    }
}




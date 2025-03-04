<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('stripe_product_id')->nullable();
            $table->string('stripe_price_id')->nullable();
            
            $table->string('name')->unique(); // Unique Item name
            $table->text('description')->nullable(); // Nullable description
            $table->decimal('price', 8, 2); // Item price
            $table->integer('stock')->default(0); // Default stock value
            $table->json('images')->nullable(); // Store images as a JSON type, allowing null values
            $table->string('category'); // Category of the item
            
            $table->timestamps(); // Created_at and Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};

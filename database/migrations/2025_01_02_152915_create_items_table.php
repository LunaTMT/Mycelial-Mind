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
            $table->string('name')->unique(); // Unique Item name
            $table->text('description')->nullable(); // Nullable description
            $table->decimal('price', 8, 2); // Item price
            $table->integer('stock')->default(0); // Default stock value
            $table->integer('number_of_images')->default(0); // Default image count
            $table->string('category');
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

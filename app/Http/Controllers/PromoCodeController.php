<?php

// app/Http/Controllers/PromoCodeController.php

namespace App\Http\Controllers;

use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PromoCodeController extends Controller
{
    public function validatePromoCode(Request $request)
    {
        // Validate the promo code input
        $request->validate([
            'promoCode' => 'required|string',
        ]);

        $promoCode = $request->input('promoCode');

        // Check if promo code exists
        $promo = PromoCode::where('code', $promoCode)
                        ->where(function ($query) {
                            // Ensure the promo code hasn't expired
                            $query->whereNull('expires_at')
                                  ->orWhere('expires_at', '>=', now());
                        })
                        ->first();

        if ($promo) {
            // Promo code valid
            Log::info('Promo code validated successfully.', ['promoCode' => $promoCode]);

            // Return Inertia response
            return Inertia::render('Shop/Cart', [
                'discount' => $promo->discount,
                'message'  => 'Promo code applied successfully!',
            ]);
        } else {
            // Promo code invalid or expired
            Log::warning('Invalid or expired promo code.', ['promoCode' => $promoCode]);

            // Return Inertia response with error message
            return Inertia::render('Shop/Cart', [
                'error' => 'Invalid or expired promo code',
            ]);
        }
    }
}

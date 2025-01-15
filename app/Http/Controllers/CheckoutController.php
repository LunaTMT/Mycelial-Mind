<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'cart' => 'required|json',
            'promoCode' => 'nullable|string',
        ]);

        // Decode the cart JSON
        $cart = json_decode($validated['cart'], true);

        // Validate the cart items
        $errors = [];
        foreach ($cart as $item) {
            if (!isset($item['id'], $item['quantity'], $item['total'])) {
                $errors[] = "Invalid cart item: " . json_encode($item);
            }
        }
        if (!empty($errors)) {
            return response()->json(['message' => 'Invalid cart data.', 'errors' => $errors], 400);
        }

        // Optionally handle promo code
        $promoCode = $validated['promoCode'];
        $discount = 0; // Apply logic to calculate discount if needed

        // Calculate total cost
        $subtotal = array_sum(array_column($cart, 'total'));
        $deliveryHandling = 5.0; // Example value
        $total = $subtotal + $deliveryHandling - $discount;

        // Initialize Stripe API
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        // Create line items for the checkout session
        $lineItems = array_map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => ['name' => $item['name']],
                    'unit_amount' => (int)($item['total'] * 100),
                ],
                'quantity' => $item['quantity'],
            ];
        }, $cart);

        // Check if the user is logged in
        if (auth()->check()) {
            // Use the authenticated user's ID
            $userId = auth()->user()->id;
        } else {
            // Use the session ID (for guest users)
            $userId = session()->getId(); // You can generate a random ID if preferred
        }

        // Create the Stripe Checkout session
        $checkoutSession = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
            'payment_intent_data' => [
                'metadata' => [
                    'user_id' => $userId, // Set user or guest ID
                ],
                'statement_descriptor' => 'YOUR_COMPANY_NAME', // Set statement descriptor here
            ],
            'locale' => 'en', // Customize language if needed
        ]);

        // Inertia expects an Inertia response, so we return it with the URL
        if ($request->wantsJson()) {
            return response()->json(['url' => $checkoutSession->url]);
        }

        return Inertia::location($checkoutSession->url);
    }
}

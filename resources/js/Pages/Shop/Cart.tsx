import { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { useCart, CartItem } from "@/Contexts/CartContext";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Counter from "@/Components/Buttons/Counter";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import ArrowIcon from "@/Components/Buttons/ArrowIcon";
import Breadcrumb from "@/Components/Nav/Breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";

// Ensure `addedAt` is in `CartItem` type
interface CartItemWithTimestamp extends CartItem {
  addedAt?: number; // Optional timestamp for when the item was added
}

interface CartProps {
  auth: { user: any } | null;
  discount?: number;
}

const Cart: React.FC<CartProps> = ({ auth, discount = 0 }) => {
  const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
  const { cart, removeFromCart, updateQuantity, calculateTotal, calculateSubtotal, setCart } = useCart();

  const [showPromoCodeDropdown, setShowPromoCodeDropdown] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(discount);
  const estimatedDeliveryHandling = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      console.log("Checking cart for expired items...");

      setCart((prevCart: CartItemWithTimestamp[]) => {
        const updatedCart = prevCart.filter((item) => now - (item.addedAt ?? now) < 10 * 1000); // Keep items added within last 10 seconds

        if (updatedCart.length < prevCart.length) {
          console.log("Removing expired items from cart...");
        }

        return updatedCart;
      });
    }, 1000); // Check every second for quicker debugging

    return () => clearInterval(interval);
  }, [setCart]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.post(route("checkout.process"), {
      cart: JSON.stringify(cart),
      promoCode,
    });
  };

  const handlePromoCodeValidation = () => {
    router.post(route("promo.validate"), { promoCode }, {
      onSuccess: ({ props }) => {
        setPromoDiscount(props.flash?.discount || 0);
      },
    });
  };

  const handleRemoveFromCart = async (productId: number, quantity: number) => {
    removeFromCart(productId);
    try {
      const { data } = await axios.get(route("item.stock", { id: productId }));
      const currentStock = data.stock;

      router.post(route('item.update', { id: productId }), { 
        stock: currentStock + quantity,
        cart: true 
      });
    } catch (error) {
      console.error("Error fetching stock:", error);
      toast.error("Could not fetch stock data.");
    }
  };

  const renderCartItem = (product: CartItemWithTimestamp) => (
    <div key={product.id} className="flex justify-between p-2 gap-4 rounded-md dark:bg-slate-700/75">
      <img src={`/${product.image}`} alt={product.name} className="w-40 aspect-square object-cover rounded-md" />
      
      <div className="flex w-full flex-col justify-between items-end">
        <div className="grid grid-cols-4 w-full font-Poppins">
          <h2 className="font-light col-span-3 text-2xl text-gray-800 dark:text-gray-200">{product.name}</h2>
          <p className="text-2xl text-right text-gray-800 dark:text-gray-200">£{product.total.toFixed(2)}</p>
        </div>
        
        <div className="w-1/6">
          <Counter 
            quantity={product.quantity} 
            onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)} 
          />
        </div>

        <button 
          onClick={() => handleRemoveFromCart(product.id, product.quantity)} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Remove Item
        </button>
      </div>
    </div>
  );

  const renderCartSummary = () => (
    <div className="p-5 rounded-lg bg-white dark:bg-slate-700/75 font-Poppins">
      <h1 className="text-2xl font-extrabold text-black dark:text-white mb-6">SUMMARY</h1>
      <div className="flex justify-between mb-4">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Subtotal</span>
        <span className="text-sm font-bold text-black dark:text-white">£{calculateSubtotal()}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Estimated Delivery & Handling</span>
        <span className="text-sm font-bold text-black dark:text-white">£{estimatedDeliveryHandling.toFixed(2)}</span>
      </div>
      {promoDiscount > 0 && (
        <div className="flex justify-between mb-4">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Discount ({promoDiscount}%)</span>
          <span className="text-sm font-bold text-green-500">-£{((promoDiscount / 100) * parseFloat(calculateSubtotal())).toFixed(2)}</span>
        </div>
      )}
      <div className="relative mb-4">
        <button onClick={() => setShowPromoCodeDropdown(!showPromoCodeDropdown)} className="w-full text-sm text-left font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
          Apply Promotion Code <ArrowIcon w="24" h="24" isOpen={showPromoCodeDropdown} />
        </button>
        {showPromoCodeDropdown && (
          <div className="relative flex gap-3 p-2 rounded-md mt-2 bg-white/10">
            <input 
              type="text" 
              value={promoCode} 
              onChange={(e) => setPromoCode(e.target.value)} 
              placeholder="Enter promo code" 
              className="w-[70%] px-3 py-2 border rounded-md h-[40px] dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
            <button onClick={handlePromoCodeValidation} className="w-[40%] h-[40px] text-sm px-3 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black rounded-md">
              Apply Code
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between mb-6">
        <span className="text-lg font-extrabold text-gray-800 dark:text-gray-200">TOTAL</span>
        <span className="text-lg text-black dark:text-white">£{calculateTotal(promoDiscount)}</span>
      </div>
      <PrimaryButton className="w-full" onClick={handleCheckout}>Checkout</PrimaryButton>
    </div>
  );

  return (
    <Layout
      header={
        <div className="h-[6vh] z-10 w-full overflow-visible flex justify-between items-center gap-4">
          <Breadcrumb items={[ { label: "SHOP", link: route('shop') }, { label: "CART" } ]} />
        </div>
      }
    >
      <Head title="Cart" />
      <div className="min-h-[85vh] w-full max-w-7xl sm:px-6 lg:px-8 p-5 flex gap-5 justify-center items-start">
        <div className="w-[65%]">
          {cart.length ? <div className="space-y-4">{cart.map(renderCartItem)}</div> : <div className="flex shadow-lg w-full justify-center min-h-[80vh] rounded-lg p-4 dark:bg-slate-700/75 text-4xl font-Poppins font-extrabold text-gray-800 dark:text-gray-200">CART EMPTY</div>}
        </div>
        <div className="w-[35%]">{renderCartSummary()}</div>
      </div>
    </Layout>
  );
};

export default Cart;

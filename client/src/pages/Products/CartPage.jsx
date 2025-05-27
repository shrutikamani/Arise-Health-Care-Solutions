import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../../redux/slices/Product-slice/cartSlice";
import { Link } from "react-router-dom";
import CartItem from "../../components/product/Cart/CartItem";
import PriceSummary from "../../components/product/Cart/CartSummary";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // const discount = 0.3 * subtotal; // Example: 30% discount
  const deliveryFee = 0;
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="flex  items-center justify-center h-[70vh]">
        <div className="text-center text-2xl text-gray-600">
          Your cart is empty.
          <Link to="/allProducts" className="text-blue-600 underline ml-2">
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 min-h-screen md:p-8 mt-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              product={item}
              onIncrease={() => dispatch(increaseQty(item._id))}
              onDecrease={() => dispatch(decreaseQty(item._id))}
              onRemove={() => dispatch(removeFromCart(item._id))}
            />
          ))}
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-4 text-lg rounded"
          >
            Clear Cart
          </button>
        </div>

        {/* Price Summary Section */}
        <div>
          <PriceSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;

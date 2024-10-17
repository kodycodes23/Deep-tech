import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeItemFromCart } = useCart();

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="p-5 border rounded mb-4">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeItemFromCart(item)} className="bg-red-500 text-white p-2 mt-2">
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

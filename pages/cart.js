import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems = [], removeItemFromCart } = useCart(); // Default to empty array

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl text-center mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p> {/* Ensuring price is formatted correctly */}
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;

import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';
import ProductCard from './ProductCard';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const ProductList = () => {
  const { user } = useAuth(); // Get the authenticated user from context
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user) {
      router.push('/login');
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [user, router]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import { fetchProducts, createProduct, deleteProduct } from '../lib/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleProductSubmit = async (product) => {
    await createProduct(product);
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl p-4">Products</h1>
      <ProductForm product={editingProduct} onSubmit={handleProductSubmit} />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div key={product._id} className="card">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

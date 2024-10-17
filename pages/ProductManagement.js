import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Add imageUrl state
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = { name, price, imageUrl }; // Include imageUrl

        if (editingProduct) {
            await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, newProduct);
        } else {
            await axios.post('http://localhost:5000/api/products', newProduct);
        }

        fetchProducts();
        resetForm();
    };

    const handleEditProduct = (product) => {
        setName(product.name);
        setPrice(product.price);
        setImageUrl(product.imageUrl); // Set imageUrl for editing
        setEditingProduct(product);
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`/api/admin/products/${id}`);
        fetchProducts();
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setImageUrl(''); // Reset imageUrl
        setEditingProduct(null);
    };

    return (
        <div>
            <Navbar />

        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Product Management</h2>
            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded shadow-md mb-6">
                <h3 className="text-lg mb-2">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL" // Add Image URL input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={resetForm} className="ml-2 bg-gray-400 text-white py-2 px-4 rounded">Reset</button>
            </form>
            <h3 className="text-lg mb-2">Existing Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product._id} className="flex justify-between items-center border p-2 mb-2">
                        <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="font-bold">${product.price}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEditProduct(product)} className="bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-600 text-white py-1 px-2 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ProductManagement;

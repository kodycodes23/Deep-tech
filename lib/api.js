export const fetchProducts = async () => {
    //const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');
    const res = await fetch('http://localhost:5000/api/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    return data.map(product => ({
      id: product.id,
      name: product.name,
     price: product.price,
     imageUrl: product.imageUrl
    }));
  };

  export const addProduct = async (newProduct) => {
    try {
        const res = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) {
            throw new Error('Failed to add product');
        }
        return await res.json();
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (productId, updatedProduct) => {
  try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
          throw new Error('Failed to update product');
      }
      return await res.json();
  } catch (error) {
      console.error('Error updating product:', error);
      throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
      });

      if (!res.ok) {
          throw new Error('Failed to delete product');
      }
      return await res.json();
  } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
  }
};

export const login = async (email, password) => {
  try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
          throw new Error('Failed to login');
      }

      const data = await res.json();
      // You can store the token in localStorage or a cookie here
      localStorage.setItem('token', data.token);  // Save token to localStorage
      return data;
  } catch (error) {
      console.error('Error during login:', error);
      throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
      const token = localStorage.getItem('token');  // Get the token from localStorage

      const res = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  // Attach token for authenticated requests
          },
          body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
          throw new Error('Failed to add product to cart');
      }

      return await res.json();
  } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
  }
};

export const getCart = async () => {
  try {
      const token = localStorage.getItem('token');  // Get the token from localStorage

      const res = await fetch('http://localhost:5000/api/cart', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,  // Attach token for authenticated requests
          },
      });

      if (!res.ok) {
          throw new Error('Failed to fetch cart items');
      }

      return await res.json();
  } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
  }
};

export const checkout = async () => {
  try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/cart/checkout', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      if (!res.ok) {
          throw new Error('Failed to process checkout');
      }

      return await res.json();
  } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
  }
};

// Register API
export const register = async (name, email, password) => {
  try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
          throw new Error('Failed to register');
      }

      const data = await res.json();
      // Store token or handle registration success as needed
      localStorage.setItem('token', data.token);  // Optional: save token on successful registration
      return data;
  } catch (error) {
      console.error('Error during registration:', error);
      throw error;
  }
};

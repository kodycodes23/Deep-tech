import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication inside useEffect after the AuthProvider has initialized
    const checkUser = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
      if (!user && router.pathname === '/products') {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">DEEPTECH COMMERCE</h1>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
          {user ? (
            <>
              <Link href="/cart" className="text-white hover:bg-gray-700 p-2 rounded">
                Cart
              </Link>
              <Link href="/ProductManagement" className="text-white hover:bg-gray-700 p-2 rounded">
                Products
              </Link>
              <button onClick={logout} className="text-white hover:bg-gray-700 p-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:bg-gray-700 p-2 rounded">
                Login
              </Link>
              <Link href="/register" className="text-white hover:bg-gray-700 p-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
    
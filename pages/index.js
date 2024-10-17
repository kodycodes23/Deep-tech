import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Login from '../pages/login';
import ProductManagement from '../pages/ProductManagement';

const Home = () => {
  return (

    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl text-center mb-4">Featured Products</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;

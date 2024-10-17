import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

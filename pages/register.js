import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;

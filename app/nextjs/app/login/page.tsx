import AuthForm from './components/auth-form';

export default function Login() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Login</h1>
        <p className="">Konrad Gnat Web Developer Portfolio</p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}

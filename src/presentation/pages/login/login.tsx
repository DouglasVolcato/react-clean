import React from "react";
import "./login-styles.scss";
import Spinner from "../../components/spinner/spinner";
import LoginHeader from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer";

const Login: React.FC = () => {
  return (
    <div className="login">
      <LoginHeader />
      <form className="form">
        <h2>Login</h2>
        <div className="inputWrap">
          <input type="email" name="email" placeholder="Write your email" />
          <span className="status"></span>
        </div>
        <div className="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="Write your password"
          />
          <span className="status"></span>
        </div>
        <button className="submit" type="submit">
          Send
        </button>
        <span className="link">Create an account</span>
        <div className="errorWrap">
          <Spinner />
          <span className="error">Error</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;

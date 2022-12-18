import React from "react";
import "./login-styles.scss";
import LoginHeader from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer";
import Input from "../../components/input/input";
import FormStatus from "../../components/form-status/form-status";

const Login: React.FC = () => {
  return (
    <div className="login">
      <LoginHeader />
      <form className="form">
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Write your email" />
        <Input
          type="password"
          name="password"
          placeholder="Write your password"
        />
        <button className="submit" type="submit">
          Send
        </button>
        <span className="link">Create an account</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;

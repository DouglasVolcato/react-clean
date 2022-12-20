import React, { useEffect, useState } from "react";
import "./login-styles.scss";
import LoginHeader from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer";
import Input from "../../components/input/input";
import FormStatus from "../../components/form-status/form-status";
import Context from "../../contexts/form/form-context";
import { Validation } from "../../protocols/validation";
import { Authentication } from "../../../domain/usecases/authentication";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setErrorState({
      ...errorState,
      emailError: validation.validate("email", state.email),
    });
  }, [state.email]);

  useEffect(() => {
    setErrorState({
      ...errorState,
      passwordError: validation.validate("password", state.password),
    });
  }, [state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (state.isLoading) {
      return;
    }
    setState({ ...state, isLoading: true });
    await authentication.auth({ email: state.email, password: state.password });
  };

  return (
    <div className="login">
      <LoginHeader />
      <Context.Provider value={{ ...state, ...errorState, setState }}>
        <form data-testid="form" className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Write your email" />
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
          />
          <button
            data-testid="submit"
            disabled={!!errorState.emailError || !!errorState.passwordError}
            className="submit"
            type="submit"
          >
            Send
          </button>
          <span className="link">Create an account</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;

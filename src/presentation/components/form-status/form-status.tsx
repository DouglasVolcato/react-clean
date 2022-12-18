import React, { useContext } from "react";
import Spinner from "../spinner/spinner";
import "./form-status-styles.scss";
import Context from "../../contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { isLoading, mainError } = useContext(Context);

  return (
    <div data-testid="errorWrap" className="errorWrap">
      {isLoading && <Spinner />}
      {mainError && <span className="error">Error</span>}
    </div>
  );
};

export default FormStatus;

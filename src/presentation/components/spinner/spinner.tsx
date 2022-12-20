import React from "react";
import "./spinner-styles.scss";

const Spinner: React.FC = () => {
  return (
    <div data-testid="spinner" className="spinner">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;

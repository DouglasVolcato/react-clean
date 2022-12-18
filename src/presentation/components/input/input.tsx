import React, { useContext } from "react";
import "./input-styles.scss";
import Context from "../../contexts/form/form-context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const value = useContext(Context);
  const error = value[`${props.name}Error`];

  const getTitle = (): string => {
    return error;
  };

  const handleChange = (event) => {
    value.setState({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="inputWrap">
      <input data-testid={`${props.name}`} {...props} onChange={handleChange} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className="status"
      ></span>
    </div>
  );
};

export default Input;

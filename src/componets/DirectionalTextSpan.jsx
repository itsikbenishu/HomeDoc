import { useInputDirection } from "../hooks/useInputDirection";

const DirectionalTextSpan = ({ value, prefix = "", suffix = "", ...props }) => {
  const inputDirection = useInputDirection();

  const dir = inputDirection(value);

  return (
    <span {...props}>
      {prefix}
      <span dir={dir}>{value}</span>
      {suffix}
    </span>
  );
};

export default DirectionalTextSpan;

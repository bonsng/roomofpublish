import { useRef, useState, useEffect } from "react";

export const ControlledInput = (props) => {
  const { value, onChange, ...rest } = props;
  const [cursor, setCursor] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);
  const handleChange = (e) => {
    setCursor(e.target.selectionStart);
    onChange && onChange(e);
  };
  //   return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
  return (
    <textarea
      ref={ref}
      rows="10"
      cols="50"
      value={value}
      onChange={handleChange}
      placeholder="보내고 싶은 말을 적어주세요.."
      {...rest}
    />
  );
};

import "./custom-button.styles.scss";

export default function CustomButton({ children, secondary, ...otherProps }) {
  return (
    <button
      className={`${secondary ? "secondary" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

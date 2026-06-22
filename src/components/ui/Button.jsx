
const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-teal-500 px-4 py-2 font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5 hover:bg-teal-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

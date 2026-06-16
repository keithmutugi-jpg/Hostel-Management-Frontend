const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-[#24324a]">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#a7d8d2] bg-white p-3 rounded-lg text-[#24324a] focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
      />
    </div>
  );
};

export default Input;

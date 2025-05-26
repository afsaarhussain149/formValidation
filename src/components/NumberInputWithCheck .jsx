import { CheckCircle } from "lucide-react";

const NumberInputWithCheck = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error = false,
  required = true,
}) => {
  const isValid = Number(value) > 0 && (!required || !error);

  return (
    <div className="mb-8">
      <label
        className={`block font-medium mb-1 ${error ? "text-red-600" : ""}`}
      >
        {label}
        {required && " *"}
      </label>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`w-full px-3 py-2 border rounded focus:outline-none ${
            error ? "border-red-600" : "border-gray-400 focus:border-gray-400"
          }`}
          value={value}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, ""); // 🔒 only numbers
            onChange(name, numericValue);
          }}
          onBlur={() => onBlur(name)}
        />
        {isValid && (
          <CheckCircle className="absolute right-2 top-2.5 h-5 w-5 text-blue-500" />
        )}
        {required && error && (
          <p className="text-red-600 text-sm mt-1">
            {label} is mandatory. Please complete the required field.
          </p>
        )}
      </div>
    </div>
  );
};

export default NumberInputWithCheck;

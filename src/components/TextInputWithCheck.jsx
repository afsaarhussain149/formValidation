import { CheckCircle } from "lucide-react";

const TextInputWithCheck = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error = false,
  hint = "",
  minLength = 0,
}) => {
  const isValid = value.length >= minLength && !error;

  return (
    <div className="mb-8">
      <label
        className={`block font-medium mb-1 ${error ? "text-red-600" : ""}`}
      >
        {label}
      </label>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          className={`w-full px-3 py-2 border rounded focus:outline-none ${
            error ? "border-red-600" : "border-gray-400 focus:border-gray-400"
          }`}
        />
        {isValid && (
          <CheckCircle className="absolute right-2 top-2.5 h-5 w-5 text-blue-500" />
        )}
        {error ? (
          <p className="text-red-600 text-sm mt-1">
            A minimum length of {minLength} characters is required. Please edit
            the field.
          </p>
        ) : (
          hint && <p className="text-sm mt-1 text-[#8D9094]">{hint}</p>
        )}
      </div>
    </div>
  );
};

export default TextInputWithCheck;

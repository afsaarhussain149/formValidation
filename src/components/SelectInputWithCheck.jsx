import { CheckCircle } from "lucide-react";

const SelectInputWithCheck = ({
  label,
  name,
  value,
  onChange,
  options,
  required = true,
}) => {
  const isValid = value !== "";

  return (
    <div className="mb-8">
      <label className="block font-medium mb-1">
        {label} {required && "*"}
      </label>
      <div className="relative w-full max-w-md">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {isValid && (
          <CheckCircle className="absolute right-6 top-2.5 h-5 w-5 text-blue-500" />
        )}
      </div>
    </div>
  );
};

export default SelectInputWithCheck;

"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
  type = "text",
  id = "",
  name = "",
}: {
  placeholder: string;
  onChange?: (value: string) => void;
  label: string;
  type?: string;
  id?: string;
  name?: string;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

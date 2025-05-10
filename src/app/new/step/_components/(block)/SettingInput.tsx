interface SettingInputProps {
  label: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  isDefault?: boolean;
}

const SettingInput = ({
  label,
  placeholder,
  value,
  required,
  onChange,
  isDefault = false,
}: SettingInputProps) => {
  return (
    <div
      className={`flex ${
        isDefault ? "flex-row items-center gap-2" : "flex-col gap-2"
      }`}
    >
      <div className="flex flex-row">
        <label
          className={`${
            isDefault ? "square_16_SB" : "square_16_M text-gray-600"
          } text-sm`}
        >
          {label}
        </label>
        {required && <span className="text-red-600 ml-1">*</span>}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${
          isDefault
            ? "flex-1 border-b border-gray-500 p-1 suit_16_M"
            : "border border-gray-300 rounded-md px-2 py-1 suit_16_M"
        } text-sm`}
      />
    </div>
  );
};

export default SettingInput;

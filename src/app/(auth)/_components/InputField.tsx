type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  isLogin?: boolean;
};

const InputField = ({
  label,
  name,
  placeholder,
  isLogin = false,
}: InputFieldProps) => (
  <div className="flex flex-row justify-between">
    <span className={`${isLogin ? "w-20" : "w-30"} geist_16_M`}>{label}</span>
    <input
      className="flex-1 suit_16_R border-0 border-b border-main_black pb-2"
      name={name}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;

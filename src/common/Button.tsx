interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <div className="flex justify-center items-center bg-main_black rounded-[20px] border-[8px] border-black text-white suit_16_B text-xl py-2 px-10 cursor-pointer">
      {text}
    </div>
  );
};

export default Button;

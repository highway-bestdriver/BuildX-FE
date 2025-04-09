interface ButtonProps {
  text: string;
  isWhite?: boolean;
}

const Button = ({ text, isWhite = false }: ButtonProps) => {
  return (
    <div
      className={`inline-flex justify-center items-center ${
        isWhite ? "text-main_black" : "bg-main_black text-white"
      } rounded-[20px] border-[8px] border-black  suit_16_B text-xl py-2 px-10 cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default Button;

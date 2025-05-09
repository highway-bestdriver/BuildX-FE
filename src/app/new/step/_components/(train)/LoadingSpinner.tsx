"use client";

const LoadingSpinner = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center text-main_black">
      <div className="w-8 h-8 border-4 border-main_orange border-t-transparent rounded-full animate-spin" />
      <div className="suit_16_SB mt-2">{message}</div>
    </div>
  );
};

export default LoadingSpinner;

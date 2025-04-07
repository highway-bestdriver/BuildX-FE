"use client";

interface SettingModalProps {
  label: string;
  onClose: () => void;
}

const SettingModal = ({ label, onClose }: SettingModalProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10 w-80"
    >
      <div className="text-black suit_16_SB mb-2">
        <b>Settings</b> [type: {label}]
      </div>
      <div className="text-sm text-gray-600 square_16_M">
        여기에 설정 옵션이 들어갑니다.
      </div>
      <div
        onClick={onClose}
        className="cursor-pointer mt-4 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
      >
        닫기
      </div>
    </div>
  );
};
export default SettingModal;

import { IcPencil, IcUpload } from "@assets/icons";
import { useRef } from "react";

interface ClassProps {
  index: number;
}

const Class = ({ index }: ClassProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(`Class ${index} 파일 업로드됨:`, files);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 my-4">
      <div className="flex flex-row gap-4 pb-3">
        <span className="square_16_B text-[18px]">Class {index}</span>
        <IcPencil width={16} />
      </div>
      <hr className="py-2 border-t border-gray-300" />
      <div className="flex flex-row gap-3">
        <span className="suit_16_M">이미지 샘플 추가 :</span>

        <div className="flex flex-col gap-3">
          <div
            onClick={handleFileUploadClick}
            className="flex flex-row items-center bg-lightblue hover:bg-blue-100 rounded-xl px-6 py-4 cursor-pointer gap-2"
          >
            <IcUpload width={16} />
            <div className="suit_16_M text-sm text-[#3265CB] text-center">
              내 컴퓨터에서 업로드
            </div>
            <input
              type="file"
              multiple
              className="suit_16_R ml-4 w-[200px] text-gray-500"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;

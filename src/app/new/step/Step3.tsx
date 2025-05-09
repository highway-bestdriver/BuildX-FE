import Canvas from "./_components/(block)/Canvas";
import SideTab from "./_components/(sidetab)/SideTab";

const Step3 = () => {
  return (
    <div className="flex w-full min-h-[42rem] mt-6">
      <div className="w-[260px] h-full">
        <SideTab />
      </div>

      <div className="flex-1 bg-white p-4">
        <Canvas />
      </div>
    </div>
  );
};

export default Step3;

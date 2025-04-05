"use client";
import { useParams } from "next/navigation";
import Step1 from "../Step1";
import Step2 from "../Step2";
import Step3 from "../Step3";
import Step4 from "../Step4";
import Button from "@common/Button";
import Step5 from "../Step5";
import {
  Progressbar1,
  Progressbar2,
  Progressbar3,
  Progressbar4,
  Progressbar5,
} from "@assets/icons";

const StepPage = () => {
  const { step } = useParams();

  const renderStep = () => {
    switch (step) {
      case "1":
        return <Step1 />;
      case "2":
        return <Step2 />;
      case "3":
        return <Step3 />;
      case "4":
        return <Step4 />;
      case "5":
        return <Step5 />;
      default:
        return <div>존재하지 않는 단계입니다.</div>;
    }
  };

  const renderProgressBar = () => {
    switch (step) {
      case "1":
        return <Progressbar1 width={500} />;
      case "2":
        return <Progressbar2 width={500} />;
      case "3":
        return <Progressbar3 width={500} />;
      case "4":
        return <Progressbar4 width={500} />;
      case "5":
        return <Progressbar5 width={500} />;
      default:
        return <div>존재하지 않는 단계입니다.</div>;
    }
  };

  return (
    <>
      {/* 프로그레스 바 */}
      <div className="w-full flex flex-col items-end py-2">
        {renderProgressBar()}
      </div>

      {/* 단계별 컴포넌트 */}
      {renderStep()}

      {/* 단계이동 버튼 */}
      <span className="w-full flex flex-row justify-between">
        {step != "1" ? (
          <Button text="< 이전으로&nbsp;" isWhite={true} />
        ) : (
          <div></div>
        )}
        <Button text="&nbsp;다음으로 >" />
      </span>
    </>
  );
};

export default StepPage;

import { IntroDescription, IntroImg, IntroText } from "@assets/icons";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="geist_16_L pt-20">welcome to BuildX.</div>
      <IntroText width={500} className="py-6" />
      <div className="geist_16_L text-center pb-20">
        The block-based, freedom makes it easy <br />
        for beginners to get started!
      </div>
      {/* 하나씩 떠오르는 애니메이션 넣기 */}
      <IntroImg className="px-5" />

      {/* 소개란 (추후 수정)*/}
      <IntroDescription className="mt-[-5px]" />
    </div>
  );
}

import { Google } from "@assets/icons";
import Button from "@common/Button";
import InputField from "../_components/InputField";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="triangle_48_SB pt-20 pb-30">Login</div>

      {/* ID & PW */}
      <section className="w-full md:max-w-[34rem] flex flex-col gap-6">
        <InputField
          label="ID"
          name="username"
          placeholder="아이디를 입력해 주세요."
          isLogin={true}
        />
        <InputField
          label="PW"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          isLogin={true}
        />
      </section>

      <div className="h-30" />
      <Button text="로그인하기" />
      <div className="geist_16_M py-4">or</div>
      <div className="flex justify-center items-center rounded-[20px] border-[8px] border-black py-2 px-6 cursor-pointer gap-3">
        <Google width={30} />
        <span className="text-main_black square_16_B text-xl">
          Continue with Google
        </span>
      </div>
      <Link href="/signup" className="suit_16_M text-grey underline pt-10">
        아직 계정이 없나요? 회원가입하러 가기
      </Link>
    </div>
  );
};

export default LoginPage;

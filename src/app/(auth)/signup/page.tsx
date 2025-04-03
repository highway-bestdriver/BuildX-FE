import Button from "@common/Button";
import InputField from "../_components/InputField";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="triangle_48_SB py-20">Sign Up</div>

      {/* 인풋 필드 */}
      <section className="w-full md:max-w-[34rem] flex flex-col gap-6">
        <InputField
          label="Name"
          name="name"
          placeholder="이름을 입력해 주세요."
        />
        <InputField
          label="ID"
          name="username"
          placeholder="아이디를 입력해 주세요."
        />
        <InputField
          label="PW"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <InputField
          label="Confirm PW"
          name="REpassword"
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
        />
        <InputField
          label="Email"
          name="email"
          placeholder="이메일을 입력해 주세요."
        />
      </section>

      <div className="h-30" />
      <Link href="/">
        <Button text="회원가입하기" />
      </Link>
    </div>
  );
};

export default SignupPage;

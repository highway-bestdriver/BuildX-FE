"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@common/Button";
import InputField from "../_components/InputField";
import { authApi } from "@api/client/auth";

const SignupPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    if (password !== rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await authApi.postSignup(username, name, phone, password);
      router.replace("/login");
    } catch (error) {
      console.error("회원가입 실패: ", error);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="triangle_48_SB py-20">Sign Up</div>

      {/* 인풋 필드 */}
      <article className="w-full md:max-w-[34rem] flex flex-col gap-6">
        <InputField
          label="Name"
          name="name"
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="ID"
          name="username"
          placeholder="아이디를 입력해 주세요."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="PW"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Confirm PW"
          name="rePassword"
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <InputField
          label="Phone"
          name="phone"
          placeholder="휴대폰 번호를 입력해 주세요."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </article>

      <div className="h-30" />
      <span onClick={handleSignup}>
        <Button text="회원가입하기" />
      </span>
    </div>
  );
};

export default SignupPage;

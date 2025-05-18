"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@assets/icons";
import { token } from "@api/token";
import { useModelStore } from "@store/useModelStore";

const MENU_ITEMS = [
  { href: "/tutorial", label: "TUTORIAL" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/pricing", label: "PRICING" },
  { href: "/mylab", label: "MYLAB" },
] as const;

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const resetModel = useModelStore((s) => s.reset);

  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = async () => {
      const isLogin = await token.get();
      setIsLogin(!!isLogin);
    };
    checkLogin();
  }, [pathname]);

  const handleClick = () => {
    if (isLogin) {
      token.remove();
      localStorage.clear();
      resetModel();
      setIsLogin(false);
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="fixed mx-auto z-50 flex flex-row w-[95%] 2xl:max-w-[1536px] justify-between items-center rounded-[20px] shadow-[0px_2px_0px_1px_#000] pt-3 px-10 pb-2 bg-background">
      <Logo width={120} />
      <nav className="flex flex-row w-full justify-between items-center">
        <div></div>
        <div></div>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="square_16_M text-dark_blue"
          >
            {item.label}
          </Link>
        ))}
        <div></div>
      </nav>
      <span
        onClick={handleClick}
        className={`square_16_M text-white ${
          isLogin ? "bg-main_orange" : "bg-main_blue"
        } rounded-[15px] px-6 py-2 cursor-pointer`}
      >
        {isLogin ? "Logout" : "Login"}
      </span>
    </div>
  );
};

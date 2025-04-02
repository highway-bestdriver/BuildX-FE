"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@assets/icons";

const MENU_ITEMS = [
  { href: "/tutorial", label: "TUTORIAL" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/pricing", label: "PRICING" },
  { href: "/mylab", label: "MYLAB" },
] as const;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const token = getCookie("accessToken");
  //   setIsLogin(!!token);
  // }, [isOpen]);

  // const handleLogout = () => {
  //   deleteCookie("accessToken");
  //   window.localStorage.clear();
  //   setIsLogin(false);
  //   setIsOpen(false);
  //   router.push("/");
  //   window.location.reload();
  // };

  return (
    <div className="absolute flex flex-row w-[90%] justify-between items-center mt-6 rounded-[20px] shadow-[0px_2px_0px_1px_#000] px-10 pb-1">
      <Logo width={200} />
      <nav className="flex flex-row w-full justify-between items-center">
        <div></div>
        <div></div>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="body_16_M text-dark_blue"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div></div>
      </nav>
      <div className="body_16_M text-white bg-main_blue rounded-[15px] px-6 py-2 cursor-pointer">
        Login
      </div>
    </div>
  );
};

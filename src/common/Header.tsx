"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Logo from "@assets/images/logo.png";

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
    <div className="flex flex-row w-full justify-between items-center">
      <Image src={Logo} alt="Logo" width={150} />
      <nav className="flex flex-row w-full justify-between items-center">
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
        {isLogin ? (
          <button
            className="body_16_M text-dark_blue"
            //onClick={handleLogout}
          >
            LOGOUT
          </button>
        ) : (
          <Link
            href="/login"
            className="body_16_M text-dark_blue"
            onClick={() => setIsOpen(false)}
          >
            LOGIN
          </Link>
        )}
      </nav>
    </div>
  );
};

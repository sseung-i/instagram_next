"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import S from "./Header.module.css";
import HomeIcon from "../ui/icons/HomeIcon";
import HomeFillIcon from "../ui/icons/HomeFillIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import SearchFillIcon from "../ui/icons/SearchFillIcon";
import NewIcon from "../ui/icons/NewIcon";
import NewFillIcon from "../ui/icons/NewFillIcon";

export const ICON_PROPS = {
  color: "black",
  size: 28,
};

const MENU = [
  {
    href: "/",
    icon: <HomeIcon />,
    checkedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    checkedIcon: <SearchFillIcon />,
  },
  {
    href: "/content",
    icon: <NewIcon />,
    checkedIcon: <NewFillIcon />,
  },
];

const Header = () => {
  const pathName = usePathname();
  return (
    <header className={S.header}>
      <Link href="/" className={S.title}>
        Instantgram
      </Link>
      <nav className={S.nav}>
        <ul className={S.link_list}>
          {MENU.map(({ href, icon, checkedIcon }) => {
            return (
              <li key={href} className={S.link}>
                <Link href={href}>
                  {pathName === href ? checkedIcon : icon}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/login" className={S.login}>
          Sign in
        </Link>
      </nav>
    </header>
  );
};

export default Header;

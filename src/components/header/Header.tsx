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
import ColorButton from "../ui/ColorButton";

export const ICON_STYLE = {
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
      <nav>
        <ul className={S.menu_list}>
          {MENU.map(({ href, icon, checkedIcon }) => {
            return (
              <li key={href} className={S.menu}>
                <Link href={href}>
                  {pathName === href ? checkedIcon : icon}
                </Link>
              </li>
            );
          })}
          <ColorButton text="Sign in" onClick={() => {}} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

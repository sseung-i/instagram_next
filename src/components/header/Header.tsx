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
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Avatar from "../ui/Avatar";

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
  const { data: session } = useSession();
  const user = session?.user;

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
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="S" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

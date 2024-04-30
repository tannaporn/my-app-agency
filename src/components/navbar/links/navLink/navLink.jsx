"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();
//console.log(item)
  return (
    
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`} 
    userid={item.user?.id}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
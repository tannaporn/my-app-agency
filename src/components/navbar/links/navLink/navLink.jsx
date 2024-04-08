"use client"

import { usePathname } from 'next/navigation';
import style from './navLink.module.css';
import Link from 'next/link';

const NavLink =({item}) =>{
    const pathName = usePathname();
    return (
        <div className={style.container}>
            <Link href={item.path} className={`${style.container} ${pathName=== item.path && style.active} ` }  >
                {item.title}
            </Link>
            
        </div>
    )
}
export default NavLink;
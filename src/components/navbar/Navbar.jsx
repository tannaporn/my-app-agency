import Links from "../navbar/links/Links"
import Link from "next/link"
import styles from "./navbar.module.css"
import Image from "next/image"

const Navbar = () => {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        <Image 
              src="/favicon.ico"
               width={40} 
                height={40} 
                alt="" 
               // fill
                />
        </Link>
        <div>
           <Links/>
        </div>
    </div>
  );
  };
  
  export default Navbar;
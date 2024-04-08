import styles from "./footer.module.css"
import Image from "next/image";
const Footer = () => {
    return (
        <div className={styles.container}>
          <div className={styles.logo}>
              <Image 
              src="/favicon.ico"
               width={20} 
                height={20} 
                alt="" 
                // fill
                />
          </div>
          <div className={styles.text}>
              FernDev creative thoughts agency © All rights reserved.
          </div>
        </div>);
  };
  
  export default Footer;
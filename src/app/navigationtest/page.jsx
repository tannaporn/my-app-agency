"use client" 
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const NavigationTestPage =()=>{
    //CLIENT SIDE NAVIGATION
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();

    const q = query.get("q");

    console.log(pathname);
    console.log(q);
    const handleClick =()=>{
//  console.log("click");
//  router.push("/")
//  console.log(router)

//  router.forward vs  router.back 
//  router.back()	ย้อนกลับ	ย้อนกลับไปยังหน้าที่ผู้ใช้เพิ่งดู
//  router.forward()	ไปข้างหน้า	ไปยังหน้าถัดไปที่ผู้ใช้เคยดู
    router.forward(); 
//  router.back();

}
    return(
        <div >
            <Link href="/" prefetch={false}>Click here</Link>
            <button onClick={handleClick}>Write and Redirect</button>
        </div>
    )
}
export default NavigationTestPage;
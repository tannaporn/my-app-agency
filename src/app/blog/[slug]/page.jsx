
import Image from "next/image"
import styles from "./singlePost.module.css"
import { Suspense } from "react"
import PostUser from "@/components/postUser/postUser"
import GET from "@/app/api/blog/[slug]/route"

//  const tmpData =
//    {
//      img:"https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//      title:"กล้องถ่ายรูป",
//      userId:"ทดสอบ",
//      createdAt:"2567-04-07",
//      desc:"Black Fujifilm Dslr Camera , Black Fujifilm Dslr Camera",
//    }
export const metadata = {
  title: 'Agency Blog',
 description: 'Next.js starter app',
}
// const getData = async () =>{
//   const res = await fetch("http://localhost:3000/api/blog");
//  // console.log(res)
//   if(!res.ok) {
//     throw new Error("Something wrong");
//   }
//   return res.json();
  
//   };

   const getData = async ({prop}) =>{
    "use server"
    try{
      const {slug} = prop;
      const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
      if(!res.ok) {
        throw new Error("Something wrong"); 
       }
      return res.json();
      }catch(err){
        console.log(err);
        return;
      }

    };


const SinglePostPage= async ({params})=>{
     const {slug} = params;
    const postData = await getData(slug);  
    const post =postData?.data;
    return(
      
      <div className={styles.container}>
        {
         post.img && 
        (
          <div className={styles.imgContainer}>
            <Image 
            src= {post.img}
            alt="" 
            fill 
            className={styles.img} />
          </div>
        )
        }
        
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
             {post.title}            
            </h1>
          <div className={styles.detail}>
             {post && (
              <Suspense fallback={<div>Loading...</div>}>
                 <PostUser userId={post.userId} /> 
              </Suspense>
            )} 
            <div className={styles.detailText}>
              <span className={styles.detailTitle}> 
              
             { post.desc}
              </span>
              <span className={styles.detailValue}>
                 {post.createdAt}                
              </span>
            </div>
          </div>
          <div className={styles.content}>
             {post.desc}             
          </div>
        </div>
      </div>
    )
}
export default SinglePostPage;
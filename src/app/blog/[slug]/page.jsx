import Image from "next/image"
import styles from "./singlePost.module.css"
import { Suspense } from "react"
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";
//  const tmpData =
//    {
//      img:"https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//      title:"กล้องถ่ายรูป",
//      userId:"ทดสอบ",
//      createdAt:"2567-04-07",
//      desc:"Black Fujifilm Dslr Camera , Black Fujifilm Dslr Camera",
//    }

//   const getData = async (prop) =>{
//     //console.log(prop);
//      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${prop}`);
//      if(!res.ok) {
//        throw new Error("Something wrong");
//      }
//      return res.json();
    
//     };


const SinglePostPage= async ({params})=>{
  const {slug} = params;
    const post = await getPost(slug);
    return(
        <div className={styles.container}>
        {
        // post.img && 
        (
          <div className={styles.imgContainer}>
            <Image 
            src= "https://images.pexels.com/photos/235970/pexels-photo-235970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
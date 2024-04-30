"use client"
import Image from "next/image";
import styles from "./adminPosts.module.css"
import { deletePost } from "@/lib/action";


const getData = async () =>{
    console.log("Post")
    const res = await fetch("http://localhost:3000/api/blog");
    // console.log(res)
    if(!res.ok) {
      throw new Error("Something wrong");
    }
    return res.json();
    
    };
const AdminPosts= async ()=>{

    const res =  await getData();
    const posts = res? res.data:null;
    console.log(posts);
    

    return (
        <div className={styles.container}>
            <h1>Posts</h1>
            {posts.map((post)=>
            (
                <div className={styles.post} key={post._id}>
                    <div className={styles.detail} key={"detail"+post._id}>
                        <Image 
                        src={post.img || "/noavatar.png"}
                        alt=""
                        width={50}
                        height={50}
                        // fill

                        />
                        <span className={styles.postTitle}>{post.title}</span>
                    </div>
                    <form className="" action={deletePost} > 
                        <input type="hidden" name="id" value={post._id}/>
                        <button className={styles.postButton}>Delete</button>
                    </form>

                </div>
            ))}
        </div>
    )
}

export default AdminPosts
 "use client"
// "use server"

import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"

const getData = async () =>{
const res = await fetch("http://localhost:4000/api/posts");
if(!res.ok) {
  throw new Error("Something wrong");
}
return res.json();

};


const BlogPage= async () =>{
  //const posts = await getData();
const posts = await getData();

    return(
        <div className={styles.container}>
          {posts.data.map((post,index) => (
          <div className={styles.post} key={index}>
            <PostCard post={post}  key= {post._id+index} />
          </div>
        ))}  
      </div>
    )
}
export default BlogPage;
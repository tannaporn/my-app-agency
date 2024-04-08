"use client"
import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"
import { Post, User } from "../../lib/models";
// import Post from '../../lib/postModel'
import { getPosts } from "@/lib/data";

// import { getPosts } from "@/lib/data";
// var posts =[
//   {
//     id:"1",
//     img:"https://images.pexels.com/photos/6630001/pexels-photo-6630001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     slug:"Post",
//   },
//   {
//     id:"2",
//     img:"https://images.pexels.com/photos/6630001/pexels-photo-6630001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     slug:"Post1",
//   },
//   {
//     id:"3",
//     img:"https://images.pexels.com/photos/6630001/pexels-photo-6630001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     slug:"Post2",
//   },
//   {
//     id:"4",
//     img:"https://images.pexels.com/photos/6630001/pexels-photo-6630001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     slug:"Post3",
//   }
// ];
const getData = async () =>{
const res = await fetch("https://jsonplaceholder.typicode.com/posts");
if(!res.ok) {
  throw new Error("Something wrong");
}
return res.json();

};


const BlogPage= async () =>{
  const posts = await getPosts();
//  const posts = await getData();
debugger
console.log(posts);
    return(
        <div className={styles.container}>
        {/* {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))} */}
      </div>
    )
}
export default BlogPage;
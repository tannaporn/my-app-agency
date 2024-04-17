"use client"

import Image from "next/image";
import styles from "./adminUsers.module.css"
import { deleteUser } from "@/lib/action";

const getData = async () =>{
    const res = await fetch("http://localhost:4000/api/users");
   //console.log(res)
    if(!res.ok) {
      throw new Error("Something wrong");
    }
    return res.json();
    
    };

const AdminUsers= async ()=>{
    const res =  await getData();
    // console.log(res)

    const users = res? res.data :null;
  
    return (
        <div className={styles.container}>
        <h1>Users</h1>
  
        {users.map((user)=> 
        (
            
            <div className={styles.User} key={user._id}>
                <div className={styles.detail}>
                   
             <Image 
                src={user.img||"/noavatar.png"}
                alt=""
                width={50}
                height={50}
                // fill

                />      
                    <span className={styles.UserTitle}>{user.username}</span>
                </div>
                <form className="" action={deleteUser}> 
                    <input type="hidden" name="id" value={user._id}/>
                    <button className={styles.UserButton}>Delete</button>
                </form>

            </div>
        )
        )}
    </div>
    )
}

export default AdminUsers
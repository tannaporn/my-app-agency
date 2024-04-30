"use client"
import styles from "./contacts.module.css"
import { deleteContact } from "@/lib/action";

const getData = async () =>{
    
    const res = await fetch("http://localhost:3000/api/contacts");
    if(!res.ok){
        throw new Error("Something wrong");
    }
    return res.json();
}

export  const Contracts = async ()=>{
    const res = await getData();
        // console.log(res)
    const contacts = res?res.data:null;

    return (
        <div className={styles.container}>
        <h1>Contacts</h1>
        {contacts.map((cont)=>
        (
           <div className={styles.contacts} key={cont._id}>           
            <div className={styles.detail} >
               <span> {cont.name} </span>
               <span> {cont.email} </span>
               <label className={styles.shortenlabel} > { cont.message} </label>
               <span> {cont.createdAt} </span>
               <form className="" action={deleteContact}> 
                    <input type="hidden" name="id" value={cont._id}/>
                    <button className={styles.contactButton}>Delete</button>
                </form>
            </div>
            
            </div>

            ))
            }
       
        </div>
    )
}

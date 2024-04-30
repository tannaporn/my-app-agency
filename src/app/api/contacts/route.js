// "use client"

import { connectToDb } from "@/lib/utils";
import {Contact} from "@/lib/models"
import { NextResponse } from "next/server";

export const GET = async (require) =>{
    try {
        debugger
        //console.log("GET contact");
        await connectToDb();
        const contacts = await Contact.find({});
    //  console.log(contact)
        return NextResponse.json({status:200,message:"success" , data:contacts})

    } catch (error) {
        throw new Error({status:500 , message:"Error" , data:error})
        
    }
}
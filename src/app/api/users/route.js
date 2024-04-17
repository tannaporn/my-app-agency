import { connectToDb } from "@/lib/utils"
import {User} from '@/lib/models'
import { NextResponse } from "next/server";

export const GET = async (required)=>{
    try {
        await connectToDb();
        const users = await User.find({}).exec();
      return NextResponse.json({status:200,message:"Success",data:users});

    } catch (error) {
        throw new Error({status:500,message:"Error",data:error})
    }
}
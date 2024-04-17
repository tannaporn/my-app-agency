import {connectToDb} from  '@/lib/utils'
import {Post} from '@/lib/models'
import { NextResponse } from 'next/server';

//http://localhost:3000/api/blog
export const GET = async (required)=>{
   
    try {
      await  connectToDb()
      const posts = await Post.find({}).exec();
      return NextResponse.json({status:200,message:"Success",data:posts});

    } catch (error) {
      throw new Error({status:500,message:"Error",data:error})
    }
}
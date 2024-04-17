import {connectToDb} from  '@/lib/utils'
import {Post} from '@/lib/models'
import { NextResponse } from 'next/server';
//http://localhost:3000/api/blog/661a70373561a849d1e4e64a
export const GET = async (required,{params})=>{
    const {slug} = params;
    // console.log(slug)
    try {
      await  connectToDb()
    const post = await Post.findById(slug);
    // console.log(post);
      return NextResponse.json({status:200,message:"Success",data:post});
    } catch (error) {
        throw new Error({status:500,message:"Error",data:error})
    }
}
export const DELETE = async (required,{params})=>{
  const {slug} = params;
  // console.log(slug)
  try {
    await  connectToDb()
  const post = await Post.findByIdAndDelete(slug).exec();

  return NextResponse.json({status:200,message:"Success",data:"Post Deleted!"});
  } catch (error) {
      throw new Error({status:500,message:"Error",data:error})
  }
}

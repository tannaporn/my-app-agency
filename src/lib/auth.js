import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";  //โหลดการตั้งค่าการกำหนดค่าจากไฟล์ auth.config.js แยกต่างหาก อาจมีตัวเลือกสำหรับโทเค็น JWT การจัดการเซสชัน และพารามิเตอร์ที่เกี่ยวข้องกับการรับรองความถูกต้องอื่นๆ
import dotenv from 'dotenv'


const login = async (credentials) => {
  try {
     await  connectToDb();
    const user = await User.findOne({ username: credentials.username });
   
    if (!user) throw new Error("Wrong credentials!");

       const isPasswordCorrect = await bcrypt.compare(
       credentials.password,
       user.password
    );

     if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
   // console.log("login credentials error "+err);
    throw new Error("Failed to login!");
  }
};

// npx auth secret  create secret key
dotenv.config()  //โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env โดยทั่วไปใช้เพื่อเก็บข้อมูลที่ละเอียดอ่อน เช่น คีย์ API หรือข้อมูลรับรองฐานข้อมูล ไว้ให้พ้นจากโค้ด
// console.log(process.env.AUTH_SECRET);
// console.log( process.env.GITHUB_ID);
// console.log(process.env.GITHUB_SECRET);
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
   ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          //setCookie(null,'user',user)
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
     // console.log("callbacks signIn");
      if (account.provider === "github") {
      
        try {
            await  connectToDb();
           const user = await User.findOne({ email: profile?.email });
        
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile?.email,
              image: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      
      return true;
    },
    ...authConfig.callbacks,
  },
});
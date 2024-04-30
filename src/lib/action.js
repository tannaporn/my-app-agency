"use server";

import { revalidatePath } from "next/cache";
import { Contact, Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut,auth } from "./auth";
import bcrypt from "bcryptjs";
import { redirect } from 'next/navigation'



export const addPost = async (prevState,formData) => {

  const { title, desc, slug, userId,img } = Object.fromEntries(formData);
  try {

     await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
   await connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState,formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
   await connectToDb();
   const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password :hashedPassword ,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
   await connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
export const AddContact = async (formData) => {
  try {
    console.log("AddContact");
    console.log(formData);
    const { name, email, phoneNo, message } = formData;
    
    // Connect to the database
    await connectToDb();

    // Create a new instance of Contact model with the form data
    const newContact = new Contact({
      name,
      email,
      phoneNo,
      message
    });

    // Save the new contact to the database
    await newContact.save();
    console.log("saved to db");
    
    // Return success if contact is saved successfully
    return { success: true };
  } catch (error) {
    console.log(error);
    // Return error message if an error occurs
    return { error: "Something went wrong!" };
  }
};

export const deleteContact = async (formData) =>{

  const {id} = Object.fromEntries(formData);
  try {
    await connectToDb();
    await Contact.findByIdAndDelete(id);
    console.log("deleted contact from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
  
};

export const handleLogout = async () => {
  "use server";
  await signOut();
  redirect('/login')
 
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
   await  connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
 
    return { success: true };
 
  } catch (err) {

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }else  if (err.message.includes("NEXT_REDIRECT"))
    {
      return { success: true };
    } 
    return {error:"Failed to login!"}
  }
};
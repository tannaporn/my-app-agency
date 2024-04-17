import mongoose from "mongoose"
import dotenv from 'dotenv';
//    require('dotenv').config();

const connection = {};

export const connectToDb = async () => {
  try {
    
    dotenv.config();
    // console.log(process.env.MONGO);
    if(connection.isConnected) {
     // console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
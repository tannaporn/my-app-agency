import mongoose from "mongoose";

uri = "mongodb+srv://AgencyDemo:1234@tannaporn.xrzev2d.mongodb.net/?retryWrites=true&w=majority&appName=tannaporn";

let connection = null; // Global variable to hold the connection

const connectToDb = async () => {
  debugger
  if (connection && connection.readyState === 1) {
    console.log("Using existing connection");
    return;
  }

  try {
    if (!uri) {
      throw new Error("Please define the MONGO environment variable with your MongoDB connection string.");
    }

    // connection = await mongoose.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false, // Recommended for better performance and safety
    // });
     uri = "mongodb+srv://AgencyDemo:1234@tannaporn.xrzev2d.mongodb.net/?retryWrites=true&w=majority&appName=tannaporn";
    
    connection = await
      mongoose
      .connect(uri)
      .then(
        ()=>{
          console.log("Connected");
        }
      )
      .catch((err)=>{
        console.log("Connect fail ! "+err);
      })
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to allow proper handling
  }
};

export default connectToDb; // Export the default function

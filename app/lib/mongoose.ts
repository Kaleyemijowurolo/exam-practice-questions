import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function connect() {
  try {
    mongoose.connect(uri!); //the exclamation tell ts the uri will alaways be defined
    const conn = mongoose.connection;

    conn.on("connected", () => {
      console.log("Connected Successfully");
    });

    //listen for errors
    conn.on("error", (err) => {
      console.log("Connection error:" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}

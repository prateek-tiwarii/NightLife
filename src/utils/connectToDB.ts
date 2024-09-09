import mongoose from "mongoose";

export async function connectToDB() {

  const uri = process.env.MongoDbUri;

  if(!uri){
    console.log("MONGODB_URI not found in .env file");
  }

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
}

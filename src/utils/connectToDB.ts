import mongoose from "mongoose";

export async function connectToDB() {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
}

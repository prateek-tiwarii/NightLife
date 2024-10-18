import mongoose from "mongoose";


const userSchema =  new mongoose.Schema({

    name : {type : String , required : true , },
    email : {type : String , required : true , unique : true , trim: true,lowercase: true,},
    password : {type : String , required : true},
    gender: {type: String,enum: ['male', 'female', 'others'], required: true},
    age: {type: Number, required: true},
   
   
 });


 const User =  mongoose.models?.User || mongoose.model('User' , userSchema);

 export default User;
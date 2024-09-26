import mongoose from "mongoose";
import User from "./userModel";

const profileSchema = new mongoose.Schema({
    name : {type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'},
    age : {type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'},
    gender : {type: mongoose.Schema.Types.ObjectId, required: true , ref: 'User'},
    pic : {type: String, default : "https://www.gravatar.com/avatar/?d=identicon"},
    bio : {type: String, required : true},
    location : {type: String, required : true},
    interests: {
        type: [String],  
        enum: ["singing", "dance", "talking", "gaming", "reading" ,"road trips" , "photography" ,"clubing","movie" ,"sketching" , "fitness" , "cooking" , "video games" , "animals" , "business" , "thrifting" ],
        validate: {
          validator: function (v) {
            return v.length <= 5;  
          },
          message: "You can select up to 5 interests only.",
        },

     eduction : {type: String, required : true },   
      work : {type: String, required : true },




})
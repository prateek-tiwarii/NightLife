import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {type : String , required : true},
    place : {type : String , required : true},
    time : {type : String , required : true},
    date : {type : String , required : true},
    description : {type : String , required : true},
    creator : {type : mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    attendes : {type : [mongoose.Schema.Types.ObjectId], ref: "User", required: true},
    interests: {
        type: [String],  
        enum: ["singing", "dance", "talking", "gaming", "reading" ,"road trips" , "photography" ,"clubing","movie" ,"sketching" , "fitness" , "cooking" , "video games" , "animals" , "business" , "thrifting" ],
        validate: {
          validator: function (v) {
            return v.length <= 5;  
          },
          message: "You can select up to 5 interests only.",
        },
      },
      


});

 export const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);



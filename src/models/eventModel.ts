import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {type : String , required : true},
    place : {type : String , required : true},
    time : {type : String , required : true},
    date : {type : String , required : true},
    description : {type : String , required : true},
    creator : {type : mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    attendes : {type : [mongoose.Schema.Types.ObjectId], ref: "User", required: true},

});

 export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);



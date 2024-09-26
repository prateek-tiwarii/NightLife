import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date : {type : String , required : true},
    description: { type: String, required: true },
    address: { type: String, required: true },
    photo : {type : String , required : true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    visiting  : {type: Boolean, required : true}
});


const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

export default Place;
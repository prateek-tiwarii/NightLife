import mongoose from "mongoose";


const connectionRequestSchema = new mongoose.Schema({
fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
toUser : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
status : {type: String, enum: ['accepted', 'pending', 'rejected'], required: true},

},{
    timestamps: true
})


const connectionSchema = new mongoose.Schema({


    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'

    },


})

export const Connection = mongoose.models?.Connection || mongoose.model("Connection", connectionSchema);

export const ConnectionRequest = mongoose.models?.Connection || mongoose.model('ConnectionRequest', connectionRequestSchema);
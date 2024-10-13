import mongoose, { model, Schema } from "mongoose";


const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
}, {timestamps: true})

const Message = model("Message", messageSchema)

export default Message
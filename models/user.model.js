import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    },
    gender: {
        type: String,
        required: true,
        enum:["mail", "femail"]
    },
    profilePic:{
        type: String,
        default: ""
    },
            
});


const User = mongoose.model("User", userSchema);
export default User;


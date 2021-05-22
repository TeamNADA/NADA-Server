import { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isOB: {
        type: Boolean,
        required: true,
    },
    part: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    insta: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    station: {
        type: String,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
    detail: [
        {
            favBaskin: {
                type: String,
                required: true,
            },
            favFood: {
                type: String,
                required: true,
            },
            nickname: {
                type: String,
                required: true,
            },
            msg: {
                type: String,
                required: true,
            },
        }
    ],
    essential: [
        {
            mbti: {
                type: String,
                required: true,
            },
            isMincho: {
                type: Boolean,
                required: true,
            },
            isBumuk: {
                type: Boolean,
                required: true,
            },
            isSoju: {
                type: Boolean,
                required: true
            }
        }
    ]
});
export default mongoose.model<IUser & mongoose.Document>("User",UserSchema);
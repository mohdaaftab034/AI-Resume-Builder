import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    role: { type: String, default: "Member" },
    platforms: [
        {
            name: String, // e.g., LeetCode, GitHub, etc.
            url: String,
            username: String,
            lastFetch: Date,
            status: { type: String, default: "unverified" }, // "unverified", "verified", "failed"
            data: mongoose.Schema.Types.Mixed // For storing platform-specific stats
        }
    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;
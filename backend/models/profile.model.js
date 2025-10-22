import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    occupation: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    linkedInUrl: { type: String },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);

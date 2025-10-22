import { Profile } from "../models/profile.model.js";
import { fetchLinkedinImage } from "../utils/fetchLinkedinImage.js";

// create profile logic
export const createProfile = async (req, res) => {
  try {
    const { fullName, occupation, location, bio, linkedInUrl } = req.body;

    if (!fullName || !occupation || !location || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = await fetchLinkedinImage(linkedInUrl);

    const newProfile = new Profile({
      fullName,
      occupation,
      location,
      bio,
      linkedInUrl,
      imageUrl
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// logic to fetch all profiles
export const getAllProfiles = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } }
        ]
      };
    }

    const profiles = await Profile.find(query).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get a single profile 
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    return res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//profile update logic
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find existing profile
    const existing = await Profile.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // If LinkedIn URL is updated try fetching a new image
    if (updates.linkedInUrl && updates.linkedInUrl !== existing.linkedInUrl) {
      try {
        updates.imageUrl = await fetchLinkedinImage(updates.linkedInUrl);
      } catch (err) {
        console.warn("LinkedIn image fetch failed during update:", err?.message ?? err);
      }
    }

    // Update only the fields sent in request
    if (updates.fullName !== undefined) existing.fullName = updates.fullName;
    if (updates.occupation !== undefined) existing.occupation = updates.occupation;
    if (updates.location !== undefined) existing.location = updates.location;
    if (updates.bio !== undefined) existing.bio = updates.bio;
    if (updates.linkedInUrl !== undefined) existing.linkedInUrl = updates.linkedInUrl;
    if (updates.imageUrl !== undefined) existing.imageUrl = updates.imageUrl;

    const updatedProfile = await existing.save();
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// logic to delet a profile
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Endpoint to filter profiles by name or location
export const searchProfiles = async (req, res) => {
  try {
    const { name, location } = req.query;

    // Build flexible query conditions
    const queryConditions = [];

    if (name) {
      queryConditions.push({ fullName: { $regex: name, $options: "i" } });
    }
    if (location) {
      queryConditions.push({ location: { $regex: location, $options: "i" } });
    }

    // If no search terms provided, return all
    const filter =
      queryConditions.length > 0 ? { $or: queryConditions } : {};

    const profiles = await Profile.find(filter);

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    return res.json(profiles);
  } catch (error) {
    console.error("Error searching profiles:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


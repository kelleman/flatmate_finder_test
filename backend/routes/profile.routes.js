import express from "express";
import { 
  createProfile, 
  getAllProfiles, 
  getProfileById,     
  searchProfiles,       
  deleteProfile, 
  updateProfile 
} from "../controllers/profile.controller.js";

const router = express.Router();
router.post("/profiles", createProfile);
router.get("/profiles", getAllProfiles);
router.get("/profiles/:id", getProfileById);
router.patch("/profiles/:id", updateProfile);
router.delete("/profiles/:id", deleteProfile);

//Search by name or location
router.get("/profiles/search/filter", searchProfiles);



export default router;

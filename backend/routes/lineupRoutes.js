import express from "express";
import { submitLineup } from "../controllers/lineupController.js";

const router = express.Router();
router.post("/", submitLineup);

export default router;

import { Router } from "express";
import getFileControllerInstance from "../controller/file/file.controller";
import upload from "../config/multer.config";

const fileRouter = Router();
const fileControllerInstance = getFileControllerInstance();

fileRouter.post("resume/upload", upload.single("resume"),fileControllerInstance.uploadResume);

export default fileRouter;

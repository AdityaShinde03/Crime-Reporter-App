import { Router } from "express";
import {authMiddleware} from "../middlewares/authMiddelware.js"
import { createReport, deleteReport, getAllReports, getReportById, updateReport } from "../controllers/reportcontroller.js";

const reportRouter = Router();

reportRouter.get("/getreportbyid/:id",authMiddleware,getReportById);
reportRouter.get("/getallreports",authMiddleware,getAllReports);
reportRouter.post("/createreport",authMiddleware,createReport);
reportRouter.put("/updatereport",authMiddleware,updateReport);
reportRouter.delete("/deletereport",authMiddleware,deleteReport);

export default reportRouter;
import { Router } from "express";
import {authMiddleware} from "../middlewares/authMiddelware.js"
import { createReport, deleteReport, getAllReports, getReportById, updateReport } from "../controllers/reportcontroller.js";

const reportRouter = Router();

reportRouter.get("/getreportbyid/:id",getReportById);
reportRouter.get("/getallreports",getAllReports);
reportRouter.post("/createreport",createReport);
reportRouter.put("/updatereport",authMiddleware,updateReport);
reportRouter.delete("/deletereport",authMiddleware,deleteReport);

export default reportRouter;
import ReportModel from "../models/ReportModel.js";

export const createReport = async (req, res) => {
  try {
    const { userId, ...otherDetails } = req.body;
    const newReport = new ReportModel({ ...otherDetails, userId });
    const report = await newReport.save();
    res
      .status(201)
      .json({ success: true, message: "Report Creation Successfull", report });
  } catch (error) {
    console.log("Error Creating Report", error);
    res
      .status(500)
      .json({ success: false, message: "Error Creating Report", error });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res
      .status(200)
      .json({ success: true, message: "Getting Reports Successfull", reports });
  } catch (error) {
    console.log("Error Getting Report", error);
    res
      .status(500)
      .json({ success: false, message: "Error Getting Report", error });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await ReportModel.findById(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Getting Report Successfull", report });
  } catch (error) {
    console.log("Error Getting Report", error);
    res
      .status(500)
      .json({ success: false, message: "Error Getting Report", error });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await ReportModel.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Updating Report Successfull", report });
  } catch (error) {
    console.log("Error Updating Report", error);
    res
      .status(500)
      .json({ success: false, message: "Error Updating Report", error });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await ReportModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Deleting report Successfull", report });
  } catch (error) {
    console.log("Error Deleting Report", error);
    res
      .status(500)
      .json({ success: false, message: "Error Deleting Report", error });
  }
};

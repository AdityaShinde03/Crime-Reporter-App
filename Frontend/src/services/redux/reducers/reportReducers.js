import { createSlice } from "@reduxjs/toolkit";
import { createReport, getAllReports, getReportById, updateReport, deleteReport } from "../actions/reportactions";

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        report: {},
        error: null,
        loading: false,
        success: false,
        message: null,
    },
    reducers: {
        updateReportInState: (state, action) => {
            const { id, data } = action.payload;
            const index = state.reports.findIndex(report => report._id === id);
            if (index !== -1) {
                state.reports[index] = { ...state.reports[index], ...data };
            }
        },
        removeReportFromState: (state, action) => {
            const { id } = action.payload;
            state.reports = state.reports.filter(report => report._id !== id);
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Report
            .addCase(createReport.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.reports.push(action.payload);
                state.message = "Report created successfully";
            })
            .addCase(createReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Get All Reports
            .addCase(getAllReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(getAllReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Get Report By Id
            .addCase(getReportById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReportById.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
            })
            .addCase(getReportById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Report
            .addCase(updateReport.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const index = state.reports.findIndex(report => report._id === action.payload._id);
                if (index !== -1) {
                    state.reports[index] = action.payload;
                }
                state.message = "Report updated successfully";
            })
            .addCase(updateReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete Report
            .addCase(deleteReport.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.reports = state.reports.filter(report => report._id !== action.payload._id);
                state.message = "Report deleted successfully";
            })
            .addCase(deleteReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { updateReportInState, removeReportFromState } = reportSlice.actions;

export default reportSlice.reducer;

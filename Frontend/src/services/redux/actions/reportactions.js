import axios from "axios";
import config from "../../config"
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosInstance = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
})

export const createReport = createAsyncThunk('Report/Create',
    async (payload) => {
        const response = await axiosInstance.post('/createreport', payload);
        return response.data;
    }
)

export const getAllReports = createAsyncThunk('Report/GetAll',
    async() => {
        const response = await axiosInstance.get('/getallreports');
        console.log(response)
        return response.data;
    }
)

export const getReportById = createAsyncThunk('Report/GetById',
    async(id) => {
        const response = await axiosInstance.get(`/getreportbyid/${id}`)
        return response.data;
    }
)

export const updateReport = createAsyncThunk('Report/Update',
    async(id,payload) => {
        const response = await axiosInstance.put(`/updatereport/${id}`, payload);
        return response.data;
    }
)

export const deleteReport = createAsyncThunk('Report/Delete',
    async(id) => {
        const response = await axiosInstance.delete(`/deletereport/${id}`);
        return response.data;
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Assuming the type structure based on useRegister usage
// In a real scenario I might import the type, but let's define a local interface or use any for flexibility if imports are tricky
type TFormData = {
    username?: string;
    email?: string;
    password?: string;
    [key: string]: any;
}

const actAuthRegister = createAsyncThunk(
    "auth/register",
    async (formData: TFormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || error.message);
            } else {
                return rejectWithValue("An unexpected error occurred");
            }
        }
    }
);

export default actAuthRegister;

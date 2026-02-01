import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";

export interface IAuthState {
  user: {
    id: string;
    email: string;
    username: string;
  } | null;
  accessToken: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}
const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken
    },
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  }
});

export { actAuthRegister };
export const { setUser, resetUI } = authSlice.actions;
export default authSlice.reducer;
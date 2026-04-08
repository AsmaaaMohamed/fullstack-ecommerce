import { createSlice } from "@reduxjs/toolkit";

export type TCurrencyCode = "usd" | "euro" | "rubi" | "rubol";

type TCurrencyState = {
  value: TCurrencyCode;
};

const initialState: TCurrencyState = {
  value: "usd",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: { payload: TCurrencyCode }) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;

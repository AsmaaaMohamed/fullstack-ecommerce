import { createSlice } from "@reduxjs/toolkit";

export type TLanguageCode = "en" | "it" | "ru" | "ch";

type TLanguageState = {
  value: TLanguageCode;
};

const initialState: TLanguageState = {
  value: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: TLanguageCode }) => {
      state.value = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

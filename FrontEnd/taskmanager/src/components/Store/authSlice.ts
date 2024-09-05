import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  userData: {
    firstName: "",
    email: "",
    userId: "",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateValue,
  reducers: {
    addUserData: (state, action) => {},
  },
});

export const { addUserData } = authSlice.actions;

export default authSlice.reducer;

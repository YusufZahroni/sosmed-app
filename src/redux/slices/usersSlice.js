import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "",
    email: "",
  },
  reducers: {
    loginAction: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logoutAction: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAction, logoutAction } = usersSlice.actions;

export default usersSlice.reducer;

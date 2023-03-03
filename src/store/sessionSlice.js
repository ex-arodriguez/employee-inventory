import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SessionSlice = createSlice({
  name: "session",
  initialState: { isAuthenticated: false, name: "", lastName: "", rol: "" },
  reducers: {
    startSession(state, action) {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.rol = action.payload.rol;
      localStorage.setItem("session", JSON.stringify(state));
    },
  },
});

export default SessionSlice;

export const login = createAsyncThunk(
  "session/login",
  async (payload, { dispatch }) => {
    const user = {
      name: "Juan",
      lastName: "Perez",
      rol: "admin",
    };
    dispatch(SessionSlice.actions.startSession(user));
  }
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  name: "",
  lastName: "",
  rol: "",
};

const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession(state, action) {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.rol = action.payload.rol;
      state.id = action.payload.id;
      localStorage.setItem("session", JSON.stringify(state));
    },
    logoutSession(state, action) {
      state.isAuthenticated = false;
      localStorage.removeItem("session");
    },
  },
});

export default SessionSlice;

export const login = createAsyncThunk(
  "session/login",
  async (payload, { dispatch }) => {
    const { data } = await axios.get(
      `http://localhost:3001/employees?user=${payload.user}&password=${payload.password}`
    );
    if (data.length > 0) {
      const objectData = {
        name: data[0].names,
        lastName: data[0].lastnames,
        rol: data[0].rol,
        id: data[0].id,
      };
      dispatch(SessionSlice.actions.startSession(objectData));
    } else {
      alert("Ingrese las credenciales correctas.");
    }
  }
);

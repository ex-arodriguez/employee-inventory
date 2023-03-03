import { configureStore } from "@reduxjs/toolkit";
import SessionSlice from "./sessionSlice";

function loadState() {
  const session = localStorage.getItem("session");
  console.log("sesiones", session);
  // if (!session) return undefined;

  // return JSON.parse(session);
}

const store = configureStore({
  reducer: { session: SessionSlice.reducer },
  preloadedState: { session: loadState() },
});

export default store;

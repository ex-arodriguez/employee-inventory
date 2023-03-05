import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./employeeSlice";
import SessionSlice from "./sessionSlice";

function loadState() {
  const session = localStorage.getItem("session");
  if (!session) return undefined;
  return JSON.parse(session);
}

const store = configureStore({
  reducer: { session: SessionSlice.reducer, employee: EmployeeSlice.reducer },
  preloadedState: { session: loadState() },
});

export default store;

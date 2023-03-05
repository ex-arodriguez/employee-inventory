import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generatedUser } from "../utils/formUtils";

const EmployeeSlice = createSlice({
  name: "employee",
  initialState: { employees: [] },
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
    removeEmployee(state, action) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee(state, action) {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index >= 0) {
        state.employees[index] = action.payload;
      }
    },
  },
});

export default EmployeeSlice;

export const listEmployee = createAsyncThunk(
  "employee/listEmployee",
  async (payload, { dispatch }) => {
    const { data } = await axios.get(`http://localhost:3001/employees`);
    dispatch(EmployeeSlice.actions.setEmployees(data));
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (payload, { dispatch }) => {
    const employee = {
      dni: payload.dni,
      names: payload.name,
      lastnames: payload.lastName,
      email: payload.email,
      dateBirthday: payload.dateBirthday,
      phone: payload.phone,
      address: payload.address,
      vaccinated: payload.vaccinated,
      vaccinatedType: payload.vaccinatedType,
      dateVaccinated: payload.dateVaccinated,
      numberDosis: payload.numberDosis,
      user: generatedUser(payload.name, payload.lastName),
      password: Math.random().toString(36).slice(-8),
      rol: "employee",
    };
    const { data } = await axios.post(
      `http://localhost:3001/employees`,
      employee
    );
    dispatch(EmployeeSlice.actions.addEmployee(data));
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `http://localhost:3001/employees/${id}`
    );
    if (response.status === 200) {
      dispatch(EmployeeSlice.actions.removeEmployee(id));
      alert("Se eliminó correctamente");
    } else {
      alert("No se pudo eliminar el empleado");
    }
  }
);

export const modifyEmployee = createAsyncThunk(
  "employee/modifyEmployee",
  async (payload, { dispatch }) => {
    const employee = {
      dni: payload.dni,
      names: payload.name,
      lastnames: payload.lastName,
      email: payload.email,
      dateBirthday: payload.dateBirthday,
      phone: payload.phone,
      address: payload.address,
      vaccinated: payload.vaccinated,
      vaccinatedType: payload.vaccinatedType,
      dateVaccinated: payload.dateVaccinated,
      numberDosis: payload.numberDosis,
      user: payload.user,
      password: payload.password,
      rol: payload.rol,
    };
    const { data } = await axios.put(
      `http://localhost:3001/employees/${payload.id}`,
      employee
    );
    dispatch(EmployeeSlice.actions.updateEmployee(data));
  }
);

export const searchEmployees = createAsyncThunk(
  "employee/searchEmployees",
  async (payload, { dispatch }) => {
    let url = `http://localhost:3001/employees?vaccinated=${payload.vaccinated}`;
    if (payload.vaccinatedType) {
      url = `${url}&vaccinatedType=${payload.vaccinatedType}`;
    }

    let { data } = await axios.get(url);
    if (payload.startDate && payload.endDate) {
      data = data.filter((employee) => {
        const dateVaccinated = new Date(employee.dateVaccinated);
        if (
          new Date(payload.startDate) >= dateVaccinated &&
          dateVaccinated <= new Date(payload.endDate)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    dispatch(EmployeeSlice.actions.setEmployees(data));
  }
);

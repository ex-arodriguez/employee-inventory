import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { VacunadoSwitch } from "../../utils/formUtils";
import { useDispatch } from "react-redux";
import { searchEmployees } from "../../store/employeeSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import styles from "./index.module.css";

export default function DrawerFilter() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { right } = state;
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, setValue } = useForm();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      event.type === "click" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, right: open });
  };
  const onFormSubmit = (data) => {
    const datas = {
      vaccinated: data.vaccinated,
      vaccinatedType: data.vaccinatedType,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    dispatch(searchEmployees(datas));
  };
  const list = () => (
    <div className={styles.filterContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <h3>Filtros</h3>

          <Controller
            name="vaccinated"
            control={control}
            defaultValue={true}
            render={({ field: { onChange, value } }) => (
              <FormGroup sx={{ marginBottom: "10px" }}>
                <FormControlLabel
                  control={<VacunadoSwitch defaultChecked />}
                  label="Vacunado"
                  value={value}
                  onChange={onChange}
                />
              </FormGroup>
            )}
          />

          <Controller
            name="vaccinatedType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth sx={{ marginBottom: "25px" }}>
                <InputLabel id="demo-simple-select-label">
                  Tipo de Vacuna
                </InputLabel>
                <Select
                  labelId="tipoDeVacuna"
                  id="idTipoVacuna"
                  label="Vacuna"
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value={"Sputnik"}>Sputnik</MenuItem>
                  <MenuItem value={"AstraZeneca"}>AstraZeneca</MenuItem>
                  <MenuItem value={"Pfizer"}>Pfizer</MenuItem>
                  <MenuItem value={"Jhonson&Jhonson"}>Jhonson&Jhonson</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{ marginBottom: "25px" }}
                id="dateVaccinatedId"
                label="Fecha inicio de vacunación"
                variant="outlined"
                value={value}
                onChange={onChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="dateVaccinatedId"
                label="Fecha fin de vacunación"
                variant="outlined"
                value={value}
                onChange={onChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </div>
        <Button variant="contained" color="warning" type="submit">
          Buscar{" "}
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} color="warning" variant="contained">
        <FilterAltIcon />
      </Button>
      <Drawer
        disablePortal
        anchor={"right"}
        open={right}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}

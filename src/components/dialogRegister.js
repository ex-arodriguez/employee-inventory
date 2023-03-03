import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const VacunadoSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
export default function DialogRegister({ open, onClose, employee, onSubmit }) {
  const { control, handleSubmit, getValues } = useForm();
  const session = useSelector((state) => state.session);

  const validateLettersOnly = (value) => {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Solo se permiten letras y espacios";
    } else if (/\d/.test(value)) {
      return "No se permiten números";
    } else {
      return true;
    }
  };

  const validateEmail = (value) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return "El correo electrónico no es válido";
    } else if (/\d/.test(value)) {
      return "El correo electrónico es válido";
    } else {
      return true;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onClose={onClose} disablePortal>
        <DialogTitle>Datos personales del empleado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llenar todos los datos correspondientes.
          </DialogContentText>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={12}>
              <Controller
                name="dni"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: 10,
                  pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "55%" }}
                    label="Cédula"
                    required
                    type="number"
                    value={value}
                    inputProps={{ maxLength: 10 }}
                    onChange={(event) => {
                      const inputValue = event.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      onChange(inputValue);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: validateLettersOnly,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="nameId"
                    label="Nombres"
                    variant="outlined"
                    required
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: validateLettersOnly,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="lastanmeId"
                    label="Apellidos"
                    variant="outlined"
                    required
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            {session.rol === "employee" && (
              <>
                <Grid item xs={8}>
                  <Controller
                    name="dateBirthday"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        style={{ width: "100%" }}
                        id="dateBirthdayId"
                        label="Fecha de nacimiento"
                        variant="outlined"
                        required
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        style={{ width: "100%" }}
                        id="phoneId"
                        label="Teléfono móvil"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={16}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: validateEmail,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="emailId"
                    label="Correo electrónico"
                    variant="outlined"
                    required
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            {session.rol === "employee" && (
              <>
                <Grid item xs={16}>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        style={{ width: "100%" }}
                        id="addressId"
                        label="Dirección de domicilio"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="vaccinated"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormGroup>
                        <FormControlLabel
                          control={<VacunadoSwitch defaultChecked />}
                          label="Vacunado"
                          {...field}
                        />
                      </FormGroup>
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="vaccinatedType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tipo de Vacuna
                        </InputLabel>
                        <Select
                          labelId="tipoDeVacuna"
                          id="idTipoVacuna"
                          label="Vacuna"
                          disabled={getValues("vaccinated")}
                          {...field}
                        >
                          <MenuItem value={"Sputnik"}>Sputnik</MenuItem>
                          <MenuItem value={"AstraZeneca"}>AstraZeneca</MenuItem>
                          <MenuItem value={"Pfizer"}>Pfizer</MenuItem>
                          <MenuItem value={"Jhonson&Jhonson"}>
                            Jhonson&Jhonson
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">{employee ? "Actualizar" : "Registrar"}</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

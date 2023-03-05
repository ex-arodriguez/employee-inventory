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
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  VacunadoSwitch,
  validateEmail,
  validateLettersOnly,
} from "../../utils/formUtils";

export default function DialogRegister({
  open,
  onClose,
  editMode,
  onCreate,
  onEdit,
  selectedEmployee,
}) {
  const formDefaultValues = {
    dni: "",
    name: "",
    lastName: "",
    email: "",
    dateBirthday: "",
    phone: "",
    address: "",
    vaccinated: false,
    vaccinatedType: "",
    dateVaccinated: "",
    numberDosis: "",
    user: "",
    password: "",
    rol: "",
  };
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    if (selectedEmployee) {
      setValue("dni", selectedEmployee.dni);
      setValue("name", selectedEmployee.names);
      setValue("lastName", selectedEmployee.lastnames);
      setValue("email", selectedEmployee.email);
      setValue("dateBirthday", selectedEmployee.dateBirthday);
      setValue("phone", selectedEmployee.phone);
      setValue("address", selectedEmployee.address);
      setValue("vaccinated", selectedEmployee.vaccinated);
      setValue("vaccinatedType", selectedEmployee.vaccinatedType);
      setValue("dateVaccinated", selectedEmployee.dateVaccinated);
      setValue("numberDosis", selectedEmployee.numberDosis);
      setValue("user", selectedEmployee.user);
      setValue("password", selectedEmployee.password);
      setValue("rol", selectedEmployee.rol);
    }
  }, [selectedEmployee, editMode]);

  useEffect(() => {
    if (!open) {
      reset(formDefaultValues);
    }
  }, [open]);

  const onFormSubmit = (data) => {
    if (editMode) {
      onEdit(data);
    } else {
      onCreate(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Dialog open={open} onClose={onClose} disablePortal>
        <DialogTitle>Datos personales del empleado</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "15px" }}>
            Llenar todos los datos correspondientes.
          </DialogContentText>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={12}>
              <Controller
                name="dni"
                control={control}
                rules={{
                  maxLength: 10,
                  pattern: { value: /^(0|[0-9]\d*)(\.\d+)?$/ },
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

            <Grid item xs={8}>
              <Controller
                name="dateBirthday"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="dateBirthdayId"
                    label="Fecha de nacimiento"
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
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="phoneId"
                    label="Teléfono móvil"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={16}>
              <Controller
                name="email"
                control={control}
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
            <Grid item xs={16}>
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="addressId"
                    label="Dirección de domicilio"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="vaccinated"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<VacunadoSwitch checked={value} />}
                      label="Vacunado"
                      value={value}
                      onChange={onChange}
                    />
                  </FormGroup>
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="vaccinatedType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth>
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
                      <MenuItem value={"Jhonson&Jhonson"}>
                        Jhonson&Jhonson
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="dateVaccinated"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="dateVaccinatedId"
                    label="Fecha de vacunación"
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
            </Grid>
            <Grid item xs={8}>
              <Controller
                name="numberDosis"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: "100%" }}
                    id="numberDosisId"
                    label="Número de dosis"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            {editMode && (
              <>
                <Grid item xs={8}>
                  <Controller
                    name="user"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: "100%" }}
                        id="userId"
                        label="Usuario"
                        variant="outlined"
                        {...field}
                        disabled
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        style={{ width: "100%" }}
                        id="passwordId"
                        label="Password"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                        disabled
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="warning" type="submit">
            {editMode ? "Editar" : "Registrar"}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

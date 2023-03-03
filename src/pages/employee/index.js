import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import DialogRegister from "../../components/dialogRegister";
import InformationEmployee from "../../components/informationEmployee";

export default function EmployeePage() {
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState(false);
  const session = useSelector((state) => state.session);

  const handleClickOpen = () => {
    setOpen(true);

    if (session.rol === "employee") {
      setEmployee(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid
      container
      spacing={2}
      columns={16}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={16} justifyContent="center" alignItems="center">
        <Button variant="outlined" onClick={handleClickOpen}>
          Actualizar mi información
        </Button>
        <DialogRegister open={open} onClose={handleClose} employee={employee} />
      </Grid>
      <Grid item xs={16}>
        <InformationEmployee />
      </Grid>
    </Grid>
  );
}

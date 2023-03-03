import { Button, Grid } from "@mui/material";
import * as React from "react";
import DialogRegister from "../../components/dialogRegister";
import SearchEmployees from "../../components/searchEmployees";
import TableEmployees from "../../components/tableEmployees";

export default function AdminPage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterEmployee = (data) => {
    handleClose();
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
          Registrar empleado
        </Button>
        <DialogRegister
          open={open}
          onClose={handleClose}
          onSubmit={handleRegisterEmployee}
        />
      </Grid>
      <Grid item xs={16}>
        <SearchEmployees />
      </Grid>
      <Grid item xs={12}>
        <TableEmployees />
      </Grid>
    </Grid>
  );
}

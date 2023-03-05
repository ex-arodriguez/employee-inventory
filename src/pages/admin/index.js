import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLogout from "../../components/buttonLogout";
import DialogRegister from "../../components/dialogRegister";
import DrawerFilter from "../../components/drawerFilter";
import TableEmployees from "../../components/tableEmployees";
import {
  createEmployee,
  deleteEmployee,
  listEmployee,
  modifyEmployee,
} from "../../store/employeeSlice";
import img from "../../img/logo-Kruger-Principal.png";
import AddIcon from "@mui/icons-material/Add";
import styles from "./index.module.css";

export default function AdminPage() {
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const dataEmployees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleRegisterEmployee = (data) => {
    dispatch(createEmployee(data));
    handleClose();
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleSelectEmployee = (id) => {
    setOpen(true);
    setEditMode(true);
    setSelectedEmployee(dataEmployees.find((employee) => employee.id === id));
  };

  const handleEditEmployee = (data) => {
    dispatch(modifyEmployee({ id: selectedEmployee.id, ...data }));
    handleClose();
  };

  React.useEffect(() => {
    dispatch(listEmployee());
  }, []);

  return (
    <div className={styles.container}>
      <header className="header">
        <img className="logoPage" src={img} alt={"Krugger"} />
        <ButtonLogout />
      </header>
      <main className="main">
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Listado de empleados</h2>
          <div className={styles.options}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleClickOpen}
              color="warning"
            >
              Registrar empleado
            </Button>
            <DrawerFilter />
          </div>
        </div>
        <div className={styles.tableEmployees}>
          <TableEmployees
            employees={dataEmployees}
            onDelete={handleDeleteEmployee}
            onEdit={handleSelectEmployee}
          />
        </div>

        <DialogRegister
          open={open}
          onClose={handleClose}
          onCreate={handleRegisterEmployee}
          onEdit={handleEditEmployee}
          editMode={editMode}
          selectedEmployee={selectedEmployee}
        />
      </main>
    </div>
  );
}

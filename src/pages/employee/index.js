import { Button, Grid } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import DialogRegister from "../../components/dialogRegister";
import InformationEmployee from "../../components/informationEmployee";
import { listEmployee, modifyEmployee } from "../../store/employeeSlice";
import SessionSlice, { login } from "../../store/sessionSlice";
import { useHistory } from "react-router-dom";
import ButtonLogout from "../../components/buttonLogout";
import img from "../../img/logo-Kruger-Principal.png";
import styles from "./index.module.css";

export default function EmployeePage() {
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const dataEmployees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  var session = JSON.parse(localStorage.getItem("session"));

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleSelectEmployee = () => {
    const id = session.id;
    setSelectedEmployee(dataEmployees.find((employee) => employee.id === id));
  };

  const handleEditEmployee = (data) => {
    dispatch(modifyEmployee({ id: session.id, ...data }));
    handleClose();
  };

  React.useEffect(() => {
    const id = session.id;
    dispatch(listEmployee());
  }, []);

  React.useEffect(() => {
    handleSelectEmployee();
  }, [dataEmployees]);

  return (
    <div className={styles.container}>
      <header className="header">
        <img className="logoPage" src={img} alt={"Krugger"} />
        <ButtonLogout />
      </header>
      <main className="main">
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Datos personales</h2>
          <div className={styles.options}>
            <Button
              variant="contained"
              color="warning"
              onClick={handleClickOpen}
            >
              Actualizar mi información
            </Button>
            <DialogRegister
              open={open}
              onClose={handleClose}
              //onCreate={handleRegisterEmployee}
              onEdit={handleEditEmployee}
              editMode={editMode}
              selectedEmployee={selectedEmployee}
            />
          </div>
        </div>
        {selectedEmployee && (
          <InformationEmployee selectedEmployee={selectedEmployee} />
        )}
      </main>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     gap: "50px",
    //     marginTop: "20px",
    //   }}
    // >
    //   <div>

    //   </div>

    //   <div>
    //
    //   </div>
    //   <div>
    //     <ButtonLogout />
    //   </div>
    // </div>
  );
}

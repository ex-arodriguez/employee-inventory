import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import img from "../../img/usuario.png";

export default function InformationEmployee({ selectedEmployee }) {
  return (
    <Card sx={{ marginTop: "55px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={{
            objectFit: "contain",
            height: "75px",
            marginTop: "20px",
          }}
          image={img}
          alt="Kruger "
        />
        <CardContent>
          <Typography
            textTransform={"uppercase"}
            fontWeight={"bold"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {`${selectedEmployee?.names} ${selectedEmployee.lastnames}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`DNI: ${selectedEmployee.dni}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Fecha de nacimiento: ${selectedEmployee.dateBirthday}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Tléfono: ${selectedEmployee.phone}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Dirección: ${selectedEmployee.address}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Vacunado: ${selectedEmployee.vaccinated}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Tipo de vacuna: ${selectedEmployee.vaccinatedType}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Fecha de vacuna: ${selectedEmployee.dateVaccinated}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Número de dosis: ${selectedEmployee.numberDosis}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Usuario: ${selectedEmployee.user}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Contraseña: ${selectedEmployee.password}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Rol: ${selectedEmployee.rol}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TableEmployees({ employees, onDelete, onEdit }) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cédula</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Fecha de nacimiento</TableCell>
            <TableCell>Vacunado</TableCell>
            <TableCell>Tipo de vacuna</TableCell>
            <TableCell>Fecha de vacuna</TableCell>
            <TableCell># de dosis</TableCell>
            <TableCell>Eliminar/Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dni}</TableCell>
              <TableCell>{row.names}</TableCell>
              <TableCell>{row.lastnames}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.dateBirthday}</TableCell>
              <TableCell>{row.vaccinated ? "Si" : "No"}</TableCell>
              <TableCell>{row.vaccinatedType}</TableCell>
              <TableCell>{row.dateVaccinated}</TableCell>
              <TableCell>{row.numberDosis}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => onDelete(row.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => onEdit(row.id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

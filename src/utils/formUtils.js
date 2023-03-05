import { styled, Switch } from "@mui/material";

export const validateLettersOnly = (value) => {
  if (!/^[a-zA-Z\s]*$/.test(value)) {
    return "Solo se permiten letras y espacios";
  } else if (/\d/.test(value)) {
    return "Correcto";
  } else {
    return true;
  }
};

export const validateEmail = (value) => {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return "El correo electrónico no es válido";
  } else if (/\d/.test(value)) {
    return "El correo electrónico es válido";
  } else {
    return true;
  }
};

export const VacunadoSwitch = styled(Switch)(({ theme }) => ({
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

export const generatedUser = (name, lastname) => {
  const firstLetter = name.slice(0, 1);
  const secondLetter = lastname.split(" ")[0];
  const user = firstLetter + secondLetter;
  return user;
};

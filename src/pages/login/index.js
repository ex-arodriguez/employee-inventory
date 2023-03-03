import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/sessionSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const session = useSelector((state) => state.session);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("session", data);
  };

  React.useEffect(() => {
    if (session.isAuthenticated) {
      if (session.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    }
  }, [session]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField label="Usuario" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl variant="outlined">
              <InputLabel htmlFor="passwordId">Contraseña</InputLabel>
              <OutlinedInput
                id="passwordId"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                {...field}
              />
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </div>
    </form>
  );
}

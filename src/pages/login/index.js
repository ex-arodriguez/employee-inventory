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
import img from "../../img/logo-Kruger-Principal.png";
import styles from "./index.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const session = useSelector((state) => state.session);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const objData = {
      user: data.user,
      password: data.password,
      id: data.id,
    };
    dispatch(login(objData));
  };

  React.useEffect(() => {
    if (session?.isAuthenticated) {
      if (session.rol === "admin") {
        navigate("/admin");
      } else if (session.rol === "employee") {
        navigate("/employee");
      }
    } else {
      navigate("/");
    }
  }, [session]);
  return (
    <div className={styles.bodyLogin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img className={styles.logo} src={img} alt={"Krugger"} />
        </div>
        <Controller
          name="user"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField sx={{ width: "100%" }} label="Usuario" {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              sx={{ width: "100%", marginTop: "25px" }}
              variant="outlined"
            >
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

        <Button
          sx={{ width: "100%", marginTop: "25px" }}
          type="submit"
          variant="contained"
          color="warning"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}

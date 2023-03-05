import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SessionSlice from "../../store/sessionSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function ButtonLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(SessionSlice.actions.logoutSession());
    navigate("/");
  };
  return (
    <div>
      <Button
        color="warning"
        variant="contained"
        startIcon={<ExitToAppIcon />}
        onClick={handleClickLogout}
      >
        Salir
      </Button>
    </div>
  );
}

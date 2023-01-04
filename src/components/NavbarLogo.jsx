import logo from "../static/dyad-logo.svg";
import { useNavigate } from "react-router-dom";

export default function NavbarLogo() {
  let navigate = useNavigate();

  return (
    <img src={logo} alt="logo" className="w-14" onClick={() => navigate("/")} />
  );
}

import "./style.css"; // Importa o CSS que você forneceu
import { Outlet } from "react-router-dom";
import Root from "../../componentes/SideBar";

const MaisScreen = () => {
  return (
    <div id="root2">
      <Root />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default MaisScreen;

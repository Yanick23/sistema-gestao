import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.css";
import { useAuth } from "../../context/AuthContextTYpe";
import {
  FaAssistiveListeningSystems,
  FaAtom,
  FaFileContract,
  FaFlask,
  FaProjectDiagram,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { Modal } from "@mui/material";
export default function Root() {
  const user = useAuth();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation(); // Hook para obter a localização atual

  const handleLogout = () => {
    user.logout();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <div id="search-spinner" aria-hidden hidden={true} />
            <h1>Laboratorio Virtual</h1>
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>

        <nav>
          <ul>
            <li
              className={
                location.pathname === "/admin/parceiros" ? "active" : ""
              }
            >
              <Link to={`/admin/parceiros`}>
                <FaAtom /> Simulador
              </Link>
            </li>
            {/** <li
              className={
                location.pathname === "/admin/projectos" ? "active" : ""
              }
            >
              <Link to={`/admin/projectos`}>
                <FaProjectDiagram /> Projectos
              </Link>
            </li> */}
            {user.user!.role === "ROLE_ADMIN" && (
              <li
                className={
                  location.pathname === "/admin/contratos" ? "active" : ""
                }
              >
                <Link to={`/admin/contratos`}>
                <FaAssistiveListeningSystems style={{ marginRight: '8px' }} /> Assistente
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <button className="logout-btn" onClick={toggleModal}>
          <FaSignOutAlt /> Log Out
        </button>
      </div>

      <Modal open={showModal} className="modal">
        <div className="modal-content-2">
          <h2>Confirmar Logout</h2>
          <p>Tem certeza de que deseja sair?</p>
          <button onClick={handleLogout} className="confirm-btn">
            Sim
          </button>
          <button onClick={toggleModal} className="cancel-btn">
            Não
          </button>
        </div>
      </Modal>
    </>
  );
}

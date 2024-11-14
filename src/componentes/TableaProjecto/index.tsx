import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

import { toast } from "react-toastify";
import { ProjectoDTO } from "../../models";
import { FaEdit, FaSync } from "react-icons/fa";
import { Container, Modal, Button, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa6";

interface TabelaProjectProps {
  onEditProject: (projecto: ProjectoDTO) => void;
}

const TabelaProject: React.FC<TabelaProjectProps> = ({ onEditProject }) => {
  const [projectos, setProjectos] = useState<ProjectoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const URL = "http://localhost:8080/projectos";
  const [modalOpen, setModalOpen] = useState(false);
  const [, setEditModalOpen] = useState(false);
  const [selectedProjecto, setSelectedProjecto] = useState<ProjectoDTO | null>(
    null
  );

  const carregarProjecto = () => {
    axios
      .get("http://localhost:8080/projectos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjectos(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Erro ao buscar projectos:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    carregarProjecto(); // Carrega Projectos ao montar o componente
  }, []);

  const handleDelete = async () => {
    try {
      var id = selectedProjecto?.id;
      await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjectos(projectos.filter((projecto) => projecto.id !== id));
      handleCloseModal();
      toast.success("projecto excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir projecto:", error);
      toast.error("Erro ao excluir projecto");
      handleCloseModal();
    }
  };

  const handleEdit = (projecto: ProjectoDTO) => {
    onEditProject(projecto);
  };

  const handleOpenDeleteModal = (projecto: ProjectoDTO) => {
    setSelectedProjecto(projecto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    setSelectedProjecto(null);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "custom-header",
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 200,
      headerClassName: "custom-header",
    },
    {
      field: "descricao",
      headerName: "Descricao",
      width: 250,
      headerClassName: "custom-header",
    },

    {
      field: "acoes",
      headerName: "AÇÕES",
      width: 400,
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        const projecto = params.row as ProjectoDTO;
        return (
          <>
            <button
              onClick={() => handleEdit(projecto)}
              style={{ marginRight: "10px" }}
            >
              <FaEdit />
            </button>
            <button onClick={() => handleOpenDeleteModal(projecto)}>
              <FaTrash />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <main className="main-container-table">
      <button
        className="refresh-button"
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onClick={carregarProjecto}
      >
        <FaSync size={20} />
      </button>
      <div className="table_body base-card">
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="registering">
              Carregando<span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </div>
          </div>
        ) : (
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={projectos}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              pageSizeOptions={[10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                fontSize: "16px",
                height: "600px",
              }}
              getRowHeight={() => 80}
            />
          </div>
        )}
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal} className="modal">
        <Container className="modal-content-2">
          <Typography variant="h6" gutterBottom>
            Confirmar Exclusão
          </Typography>
          <Typography variant="body1">
            Tem certeza de que deseja excluir o projecto{" "}
            <strong>{selectedProjecto?.nome}</strong>?
            <br />
            <strong>Aviso:</strong> Ao excluir o projecto, todos os contratos
            associados serão excluídos automaticamente.
          </Typography>
          <div className="modal-actions">
            <Button variant="contained" onClick={handleDelete}>
              Excluir
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </div>
        </Container>
      </Modal>
    </main>
  );
};

export default TabelaProject;

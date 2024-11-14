import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Contrato } from "../../models";
import { FaEdit, FaSync, FaTrash } from "react-icons/fa";
import "./style.css";
import { Button, Container, Modal, Typography } from "@mui/material";
interface Props {
  onEditContrato: (contrato: Contrato) => void;
}

const TabelaContrato: React.FC<Props> = ({ onEditContrato }) => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [contrato, setContrato] = useState<Contrato>();
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(
    null
  );

  const ColoseeModal = () => {
    setContrato(contrato);
    setShowModal(!showModal);
  };

  const carregarContratos = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/contratos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContratos(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar contratos:", error);
        setIsLoading(false);
      });
  };

  const handleOpenDeleteModal = (contrato: Contrato) => {
    setSelectedContrato(contrato);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);

    setSelectedContrato(null);
  };

  useEffect(() => {
    carregarContratos();
  }, []);
  const handleEdit = (contrato: Contrato) => {
    toast.info(`Editando contrato ${contrato.id}`);
    onEditContrato(contrato);
  };

  const handleDelete = async () => {
    try {
      var id = selectedContrato?.id;
      await axios.delete(`http://localhost:8080/contratos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContratos(contratos.filter((contrato) => contrato.id !== id));
      toast.done("Contrato excluido com sucesso");
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      toast.error("Erro ao excluir contrato");
    }

    handleCloseModal();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "dataInicio", headerName: "Data Início", width: 150 },
    { field: "dataFim", headerName: "Data Fim", width: 150 },
    {
      field: "parceiroDTO",
      headerName: "contrato",
      width: 150,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const contrato = params.row as Contrato;

        return <>{contrato.parceiroDTO.nome}</>;
      },
    },
    {
      field: "projectoDTO",
      headerName: "Projecto",
      width: 150,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const contrato = params.row as Contrato;

        return <>{contrato.projectoDTO.nome}</>;
      },
    },

    {
      field: "acoes",
      headerName: "Ações",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const contrato = params.row as Contrato;
        return (
          <>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => handleEdit(contrato)}
              className="table-content"
            >
              <FaEdit />
            </button>
            <button onClick={() => handleOpenDeleteModal(contrato)}>
              <FaTrash />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="toolbar-container">
        <button
          className="refresh-button"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={carregarContratos}
        >
          <FaSync size={20} />
        </button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <DataGrid
          rows={contratos}
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
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content-2">
            <h2>Confirmar delete</h2>
            <p>Tem certeza de que deseja apagar o contrato?</p>
            <button onClick={handleDelete} className="confirm-btn">
              Sim
            </button>
            <button onClick={ColoseeModal} className="cancel-btn">
              Não
            </button>
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={handleCloseModal} className="modal">
        <Container className="modal-content-2">
          <Typography variant="h6" gutterBottom>
            Confirmar Exclusão
          </Typography>
          <Typography variant="body1">
            Tem certeza de que deseja excluir o contrato{" "}
            <strong>{selectedContrato?.nome}</strong>?
          </Typography>
          <div className="modal-actions">
            <Button
              variant="contained"
              className="exluir"
              onClick={handleDelete}
            >
              Excluir
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default TabelaContrato;

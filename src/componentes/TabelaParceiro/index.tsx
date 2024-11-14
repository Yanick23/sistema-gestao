import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import "./style.css";
import DeleteIcon from "../../assets/imagens/delete_FILL0_wght400_GRAD0_opsz24.svg";
import EditIcon from "../../assets/imagens/edit_FILL0_wght400_GRAD0_opsz24.svg";
import { toast } from "react-toastify";
import { ParceiroDTO } from "../../models";
import { FaEdit, FaSync, FaTrash } from "react-icons/fa";
import { Container, Modal, Button, Typography } from "@mui/material";

interface TabelaParceiroProps {
  onEditParceiro: (parceiroDTO: ParceiroDTO) => void;
}

const TabelaParceiro: React.FC<TabelaParceiroProps> = ({ onEditParceiro }) => {
  const [parceiros, setParceiros] = useState<ParceiroDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedParceiro, setSelectedParceiro] = useState<ParceiroDTO | null>(
    null
  );

  const URL = "http://localhost:8080/parceiros";
  const token = localStorage.getItem("authToken");

  const carregarParceiros = () => {
    setIsLoading(true);
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParceiros(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar parceiros:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    carregarParceiros();
  }, []);

  const handleDelete = async () => {
    if (selectedParceiro) {
      try {
        await axios.delete(`${URL}/${selectedParceiro.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParceiros(
          parceiros.filter((parceiro) => parceiro.id !== selectedParceiro.id)
        );
        toast.success("Parceiro excluído com sucesso");
        handleCloseModal();
      } catch (error) {
        console.error("Erro ao excluir parceiro:", error);
        toast.error("Erro ao excluir parceiro");
        handleCloseModal();
      }
    }
  };

  const handleEdit = (parceiro: ParceiroDTO) => {
    onEditParceiro(parceiro);
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (parceiro: ParceiroDTO) => {
    setSelectedParceiro(parceiro);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    setSelectedParceiro(null);
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
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "custom-header",
    },
    {
      field: "dataCadastro",
      headerName: "Data de Cadastro",
      width: 200,
      headerClassName: "custom-header",
      renderCell: (params) => {
        const date = new Date(params.value as string);
        return <>{date.toLocaleDateString()}</>;
      },
    },
    {
      field: "acoes",
      headerName: "AÇÕES",
      width: 400,
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        const parceiro = params.row as ParceiroDTO;
        return (
          <>
            <button
              onClick={() => handleEdit(parceiro)}
              style={{ marginRight: "10px" }}
            >
              <FaEdit />
            </button>
            <button onClick={() => handleOpenDeleteModal(parceiro)}>
              <FaTrash />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <main className="main-container-table">
      {/*   <div className="toolbar-container">
        <button
          className="refresh-button"
          style={{ marginTop: "10px", marginBottom: "10px" }}
          onClick={carregarParceiros}
        >
          <FaSync size={20} />
        </button>
      </div>
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
  rows={parceiros} // Define os dados que serão exibidos na tabela. A variável 'parceiros' deve ser um array de objetos que representam os dados das linhas da tabela.

  columns={columns} // Define as colunas da tabela. 'columns' deve ser um array de objetos com a configuração das colunas, como título, campo de dados e formatação.

  initialState={{
    pagination: { paginationModel: { page: 0, pageSize: 10 } }, // Define o estado inicial da paginação. A tabela começará na primeira página (page: 0) e exibirá 10 linhas por página (pageSize: 10).
  }}

  slots={{ toolbar: GridToolbar }} // Adiciona uma barra de ferramentas personalizada à tabela. 'GridToolbar' é um componente de barra de ferramentas padrão do MUI, oferecendo funcionalidades como filtros e exportação.

  pageSizeOptions={[10, 25]} // Define as opções de tamanho da página que o usuário pode selecionar. Aqui, ele pode escolher entre 10 ou 25 linhas por página.

  checkboxSelection // Habilita a seleção de múltiplas linhas com caixas de seleção (checkbox) na tabela.

  disableRowSelectionOnClick // Impede a seleção de linha ao clicar em qualquer parte da linha, permitindo apenas selecionar via checkbox.

  style={{
    backgroundColor: "white", // Define a cor de fundo da tabela como branca.
    border: "1px solid #ddd", // Define uma borda fina e clara ao redor da tabela.
    fontSize: "16px", // Define o tamanho da fonte de todas as células para 16px.
    height: "600px", // Define a altura da tabela como 600px.
  }}

  getRowHeight={() => 80} // Define a altura de cada linha da tabela para 80px.
  
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
            Tem certeza de que deseja excluir o parceiro{" "}
            <strong>{selectedParceiro?.nome}</strong>?
            <br />
            <strong>Aviso:</strong> Ao excluir o parceiro, todos os contratos
            associados serão excluídos automaticamente.
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
      </Modal>*/}
    </main>
  );
};

export default TabelaParceiro;

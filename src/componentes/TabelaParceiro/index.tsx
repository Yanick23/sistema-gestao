import React from "react";

import { ParceiroDTO } from "../../models";

interface TabelaParceiroProps {
  onEditParceiro: (parceiroDTO: ParceiroDTO) => void;
}

const TabelaParceiro: React.FC<TabelaParceiroProps> = () => {
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

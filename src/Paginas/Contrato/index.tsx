import ChatbotComponent from "./chatbotComponent";

function Contrato() {
  return (
    <>
      <div className="assistente-page">
        <h1>
          Assistente virtual para dúvidas relacionadas à instrumentação e
          medidas
        </h1>
      </div>

      <ChatbotComponent />
      {/** <FormContrato carregarDados={limparFormulario} contrato={selectedContrato} />
      <TabelaContrato onEditContrato={carregarContrato} />*/}
    </>
  );
}

export default Contrato;

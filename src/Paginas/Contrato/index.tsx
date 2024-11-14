import { useState } from "react";

import type { Contrato as ContratoDTO } from "../../models"; // Importar como tipo
import FormContrato from "../../componentes/ContratoForm";
import TabelaContrato from "../../componentes/tabelaContrato";
import Oscilloscope from "../../componentes/Oscilloscope";
import ChatbotComponent from "./chatbotComponent";

function Contrato() {
  const [selectedContrato, setSelectedContrato] = useState<ContratoDTO | null>(
    null
  );

  const carregarContrato = (contrato: ContratoDTO) => {
    setSelectedContrato(contrato);
  };

  const limparFormulario = () => {
    setSelectedContrato(null);
  };

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

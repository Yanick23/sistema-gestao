import { useState } from "react";
import FormComponent from "../../../componentes/ParceiroForm";
import TabelaParceiro from "../../../componentes/TabelaParceiro";
import { ParceiroDTO } from "../../../models";

function Parceiro() {
  const [selectedProject, setSelectedProject] = useState<ParceiroDTO | null>(
    null
  );

  const carregarm = (parceiro: ParceiroDTO) => {
    setSelectedProject(parceiro);
  };

  const limparFormulario = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <FormComponent
        carregarDadods={limparFormulario}
        parceiro={selectedProject}
      />
      <TabelaParceiro onEditParceiro={carregarm} />
    </>
  );
}

export default Parceiro;

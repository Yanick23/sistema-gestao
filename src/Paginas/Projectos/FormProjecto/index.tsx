import { useState } from "react";
import FormComponent from "../../../componentes/ParceiroForm";
import FormProject from "../../../componentes/ProjectoForm";
import TabelaParceiro from "../../../componentes/TabelaParceiro";
import TabelaProject from "../../../componentes/TableaProjecto";
import { ParceiroDTO, ProjectoDTO } from "../../../models";

function Projecto() {
  const [selectedProject, setSelectedProject] = useState<ProjectoDTO | null>(
    null
  );

  const carregarm = (projecto: ProjectoDTO) => {
    setSelectedProject(projecto);
  };

  const limparFormulario = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <FormProject
        carregarDadods={limparFormulario}
        projecto={selectedProject}
      />
      {/** <TabelaProject onEditProject={carregarm} />*/}
    </>
  );
}

export default Projecto;

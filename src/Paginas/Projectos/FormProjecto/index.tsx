import { useState } from "react";

import FormProject from "../../../componentes/ProjectoForm";

import { ProjectoDTO } from "../../../models";

function Projecto() {
  const [selectedProject, setSelectedProject] = useState<ProjectoDTO | null>(
    null
  );

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



export interface ParceiroDTO {
    id: number;
    nome: string;
    dataCadastro: string;
    email:string;
    contratos: Contrato[]; 
  }
  
  export interface ProjectoDTO {
    id: number;
    nome: string;
    descricao: string;
    contratos: Contrato[]; 
    dataCadastro: string;
  }
  
  export interface Contrato {
    id: number;
    nome: string;
    dataInicio: string; 
    dataFim: string;    
    parceiroDTO: ParceiroDTO;
    projectoDTO: ProjectoDTO;
  }
  
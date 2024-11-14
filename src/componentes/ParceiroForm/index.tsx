import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { ParceiroDTO } from "../../models";
import CircuitSimulator from "../tabelaContrato/CircuitSimulator";

interface FormData {
  id: number;
  nome: string;
  email: string;
  dataCadastro: string;
}

interface Props {
  carregarDadods: () => void;
  parceiro?: ParceiroDTO | null;
}

const FormComponent: React.FC<Props> = ({ parceiro }) => {
  const { setValue } = useForm<FormData>();

  useEffect(() => {
    if (parceiro) {
      setValue("id", parceiro.id);
      setValue("nome", parceiro.nome);
      setValue("email", parceiro.email);
      setValue("dataCadastro", parceiro.dataCadastro);
    } else {
      setValue("id", 0);
      setValue("nome", "");
      setValue("email", "");

      setValue("dataCadastro", "");
    }
  }, [parceiro, setValue]);

  return <CircuitSimulator />;
};

export default FormComponent;

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { ParceiroDTO } from "../../models";
import { FaEdit, FaEraser, FaSave } from "react-icons/fa";
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

const FormComponent: React.FC<Props> = ({ carregarDadods, parceiro }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const token = localStorage.getItem("authToken");
    try {
      if (data.id) {
        const response = await axios.put(
          `http://localhost:8080/parceiros/${data.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Parceiro atualizado com sucesso!");
        console.log("Parceiro atualizado com sucesso:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:8080/parceiros",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Parceiro adicionado com sucesso!");
        console.log("Parceiro adicionado com sucesso:", response.data);
      }
      carregarDadods();
    } catch (error) {
      toast.error("Erro ao realizar a operação. Tente novamente.");
      console.error("Erro ao registrar parceiro:", error);
    }
  };

  return <CircuitSimulator />;
};

export default FormComponent;

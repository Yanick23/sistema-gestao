import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectoDTO } from "../../models";
import { FaEdit, FaEraser, FaSave } from "react-icons/fa";

interface FormData {
  id: number;
  nome: string;
  descricao: string;
  dataCadastro: string;
}

interface Props {
  carregarDadods: () => void;
  projecto?: ProjectoDTO | null;
}

const FormProject: React.FC<Props> = ({ carregarDadods, projecto }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (projecto) {
      setValue("id", projecto.id);
      setValue("nome", projecto.nome);
      setValue("descricao", projecto.descricao);
      setValue("dataCadastro", projecto.dataCadastro);
    } else {
      setValue("id", 0);
      setValue("nome", "");
      setValue("descricao", "");
      setValue("dataCadastro", "");
    }
  }, [projecto, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let response;
      const token = localStorage.getItem("authToken");
      if (data.id) {
        response = await axios.put(
          `http://localhost:8080/projectos/${data.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Projecto atualizado com sucesso!");
      } else {
        response = await axios.post("http://localhost:8080/projectos", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Projecto registrado com sucesso!");
      }

      carregarDadods();
      console.log("Operação realizada com sucesso:", response.data);
    } catch (error) {
      toast.error("Erro ao realizar a operação. Tente novamente.");
      console.error("Erro ao realizar a operação:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>
        {projecto ? "Editar Projecto" : "Formulário de Cadastro de Projecto"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input id="id" type="number" readOnly {...register("id")} />
        </div>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            {...register("nome", { required: "O nome é obrigatório" })}
          />
          {errors.nome && <p className="error">{errors.nome.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <input
            id="descricao"
            type="text"
            {...register("descricao", {
              required: "A descrição é obrigatória",
            })}
          />
          {errors.descricao && (
            <p className="error">{errors.descricao.message}</p>
          )}
        </div>
        <button type="submit" style={{ marginTop: "30px" }}>
          {projecto ? (
            <>
              <FaEdit /> Atualizar
            </>
          ) : (
            <>
              <FaSave /> Salvar
            </>
          )}
        </button>
        <button
          type="reset"
          style={{ marginTop: "30px" }}
          onClick={carregarDadods}
        >
         <FaEraser /> Limpar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormProject;

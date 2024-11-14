import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type {
  Contrato as ContratoDTO,
  ParceiroDTO,
  ProjectoDTO,
} from "../../models";
import { FaEdit, FaEraser, FaSave } from "react-icons/fa";

interface FormData {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  parceiroId: number;
  projectoId: number;
}

interface Props {
  carregarDados: () => void;
  contrato?: ContratoDTO | null;
}

const FormContrato: React.FC<Props> = ({ carregarDados, contrato }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [parceiros, setParceiros] = useState<ParceiroDTO[]>([]);
  const [projectos, setProjectos] = useState<ProjectoDTO[]>([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parceirosResponse = await axios.get(
          "http://localhost:8080/parceiros",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setParceiros(parceirosResponse.data);

        const projectosResponse = await axios.get(
          "http://localhost:8080/projectos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectos(projectosResponse.data);

        if (contrato) {
          reset({
            id: contrato.id,
            nome: contrato.nome,
            dataInicio: contrato.dataInicio,
            dataFim: contrato.dataFim,
            parceiroId: contrato.parceiroDTO.id,
            projectoId: contrato.projectoDTO.id,
          });
        } else {
          reset({
            id: 0,
            nome: "",
            dataInicio: "",
            dataFim: "",
            parceiroId: 0,
            projectoId: 0,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar dados.");
      }
    };

    fetchData();
  }, [contrato, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const contratoPayload = {
      id: data.id,
      nome: data.nome,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      parceiroDTO: {
        id: data.parceiroId,
      },
      projectoDTO: {
        id: data.projectoId,
      },
    };

    try {
      if (data.id === 0) {
        await axios.post("http://localhost:8080/contratos", contratoPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Contrato registrado com sucesso!");
      } else {
        await axios.put(
          `http://localhost:8080/contratos/${data.id}`,
          contratoPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Contrato atualizado com sucesso!");
      }
      carregarDados();
    } catch (error) {
      console.error("Erro ao registrar ou atualizar contrato:", error);
      toast.error("Erro ao registrar contrato. Tente novamente.");
    }
  };

  return (
    <div className="form-container">
      <h1>Formulário de Cadastro de Contrato</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid-form">
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
          <label htmlFor="dataInicio">Data Início:</label>
          <input
            id="dataInicio"
            type="date"
            {...register("dataInicio", {
              required: "A data de início é obrigatória",
            })}
          />
          {errors.dataInicio && (
            <p className="error">{errors.dataInicio.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dataFim">Data Fim:</label>
          <input
            id="dataFim"
            type="date"
            {...register("dataFim", {
              required: "A data de fim é obrigatória",
            })}
          />
          {errors.dataFim && <p className="error">{errors.dataFim.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="parceiroId">Parceiro:</label>
          <select
            id="parceiroId"
            {...register("parceiroId", { required: "Selecione um parceiro" })}
          >
            <option value="">Selecione um parceiro</option>
            {parceiros.map((parceiro) => (
              <option key={parceiro.id} value={parceiro.id}>
                {parceiro.nome}
              </option>
            ))}
          </select>
          {errors.parceiroId && (
            <p className="error">{errors.parceiroId.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="projectoId">Projecto:</label>
          <select

            id="projectoId"
            {...register("projectoId", { required: "Selecione um projecto" })}
          >
            <option value="">Selecione um projecto</option>
            {projectos.map((projecto) => (
              <option key={projecto.id} value={projecto.id}>
                {projecto.nome}
              </option>
            ))}
          </select>
          {errors.projectoId && (
            <p className="error">{errors.projectoId.message}</p>
          )}
        </div>

        <div className="form-group">
          <button type="submit" className="grid-btn">
            {contrato ?(
            <>
              <FaEdit /> Atualizar
            </>
          ) : (
            <>
              <FaSave /> Salvar
            </>
          )}
          </button>
        </div>

        <div className="form-group">
          <button type="reset" className="grid-btn" onClick={carregarDados}>
          <FaEraser/> Limpar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormContrato;

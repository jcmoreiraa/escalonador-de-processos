import { useState } from "react";

type Props = {
  numeroDoProcesso: number;
  onClick: (chegada: string, duracao: string, deadline: string) => void;
};

const Modal = ({ numeroDoProcesso, onClick: criarProcesso }: Props) => {
  const [chegada, setChegada] = useState("");
  const [duracao, setDuracao] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleClick = () => {
    criarProcesso(chegada, duracao, deadline);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <h2>Processo: {numeroDoProcesso}</h2>
        <div className="flex flex-col gap-px">
          <label htmlFor="chegada">Chegada</label>
          <input
            type="number"
            id="chegada"
            className="py-2 px-3 rounded-lg"
            value={chegada}
            onChange={(e) => setChegada(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="duracao">Duração</label>
          <input
            type="number"
            id="duracao"
            className="py-2 px-3 rounded-lg"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-px">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="number"
            id="deadline"
            className="py-2 px-3 rounded-lg"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button onClick={handleClick} className="w-full bg-slate-300 py-2 mt-3 rounded-lg">
          Criar processo
        </button>
      </div>
    </div>
  );
};

export default Modal;

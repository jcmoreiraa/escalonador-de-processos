'use client'
import { useState } from "react";
import Botoes from "@/components/botoes";
import Quantum from "@/components/quantum";
import Coluna from "@/components/coluna";
import Modal from "@/components/modal";
import FIFO from "@/components/FIFO";
import SJF from "@/components/SJF";
import Image from "next/image";
import styled from "styled-components";
import EDF from "@/components/EDF";
import RR from "@/components/RR";

const TableContainer = styled.div`
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px; 
  gap:10px;
`;

type Processo = {
  chegada: number;
  duracao: number;
  deadline: number;
  codigo: number;


}

export default function Home() {
  const [numeroDoProcesso, setNumeroDoProcesso] = useState(1);
  const [chegada, setChegada] = useState("");
  const [duracao, setDuracao] = useState("");
  const [deadline, setDeadline] = useState("");
  const [quantum, setQuantum] = useState('');
  const [sobrecarga, setSobrecarga] = useState('');
  const [tabelaProcessos, setTabelaProcessos] = useState<Processo[]>([]);
  const [selecionarEscalonamento, setSelecionarEscalonamento] = useState<string | null>(null);

  function handleCreateProcess(chegada: string, duracao: string, deadline: string) {
    const newProcesso: Processo = {
      chegada: Number(chegada),
      duracao: Number(duracao),
      deadline: Number(deadline),
      codigo: numeroDoProcesso
    };

    console.log(newProcesso);

    setTabelaProcessos((prevTabelaProcessos) => [...prevTabelaProcessos, newProcesso]);
    setNumeroDoProcesso((prevNumero) => prevNumero + 1);
  }

  const excluirProcesso = (codigo: number) => {
    setTabelaProcessos((prevTabelaProcessos) =>
      prevTabelaProcessos.filter(processo => processo.codigo !== codigo)
    );
  };

  return (
    <main className="flex flex-col align-center justify-center bg-white p-24 gap-10">
      <div className="flex flex-row justify-between bg-slate-100 min-h-36 gap-y-44 p-5 rounded-3xl">
        <div className="flex flex-col justify-between px-5 py-16 gap-10">
          <Botoes selecionarEscalonamento={selecionarEscalonamento} setSelecionarEscalonamento={setSelecionarEscalonamento} />
          <Quantum valorQuantum={setQuantum} valorSobrecarga={setSobrecarga} />
        </div>
        <Modal numeroDoProcesso={numeroDoProcesso} onClick={handleCreateProcess} />
        <TableContainer>
          {tabelaProcessos.map((processo) => (
            <div key={processo.codigo} className="flex justify-between items-center p-2 border-b">
              <span>{`Processo:  ${processo.codigo}`}</span>
              <p> {`Chegada:  ${processo.chegada}`} </p>
              <p> {`Duração:  ${processo.duracao}`}
                <p> {`DeadLine:  ${processo.deadline ? processo.deadline : 0}`}  </p>
              </p>
              <button
                onClick={() => excluirProcesso(processo.codigo)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          ))}
        </TableContainer>
      </div>
      {/* <Coluna /> */}
      {selecionarEscalonamento === 'FIFO' && <FIFO tabela={tabelaProcessos} linhas={tabelaProcessos.length} />}
      {selecionarEscalonamento === 'SJF' && <SJF tabela={tabelaProcessos} linhas={tabelaProcessos.length} />}
      {selecionarEscalonamento === 'EDF' && <EDF tabela={tabelaProcessos} linhas={tabelaProcessos.length} quantum={Number(quantum)} sobrecarga={Number(sobrecarga)} />}
      {selecionarEscalonamento === 'RR' && <RR tabela={tabelaProcessos} linhas={tabelaProcessos.length} quantum={Number(quantum)} sobrecarga={Number(sobrecarga)} />}

    </main>
  );
}

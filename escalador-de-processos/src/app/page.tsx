'use client'
import Botoes from "@/components/botoes";
import Quantum from "@/components/quantum";
import Coluna from "@/components/coluna";
import Modal from "@/components/modal";
import Image from "next/image";
import { useState } from "react";

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
  const [tabelaProcessos, setTabelaProcessos] = useState<Processo[]>([]);

  return (
    <main className="flex flex-col align-center justify-center bg-white p-24 gap-y-80">
      <div className=" flex flex-row justify-around bg-slate-100 w-1/2 min-h-36 gap-y-44 p-5 rounded-3xl">
        <Botoes />
        <Quantum />
        <Modal numeroDoProcesso={numeroDoProcesso} onClick={handleCreateProcess} />
        <table>
          <thead>
            <tr>
              <th>Processos</th>
            </tr>
          </thead>
          <tbody>
            {tabelaProcessos.map((processo) => (
              <tr key={processo.codigo}>
                <td className="border px-4 py-2">{processo.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <Coluna />
    </main>
  );
}

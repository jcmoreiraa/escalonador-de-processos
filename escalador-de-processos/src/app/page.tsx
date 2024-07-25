'use client'
import Botoes from "@/components/botoes";
import Quantum from "@/components/quantum";
import Coluna from "@/components/coluna";
import Processo from "@/components/processo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col align-center justify-center p-24 gap-y-80">
        <div className=" flex flex-row justify-around bg-white w-1/2 min-h-36 gap-y-44 p-5 rounded-3xl">
          <Botoes/>
          <Quantum/>
        </div>
        <Processo/>
        <Coluna/>

    </main>
  );
}

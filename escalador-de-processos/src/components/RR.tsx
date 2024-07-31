import React from 'react';

type Processo = {
    [x: string]: any;
    chegada: number;
    duracao: number;
    codigo: number;
};

type Props = {
    linhas: number;
    tabela: Processo[];
    quantum: number;
    sobrecarga: number;
};
const RR = ({ linhas, tabela, sobrecarga, quantum }: Props) => {
    const NUM_LINHAS = linhas;

    const sortedTabela: Processo[] = tabela.map((processo, index) => ({
        ...processo,
        originalIndex: index
    })).sort((a, b) => a.chegada - b.chegada);

    let TOTAL_QUANTUM = tabela.reduce((acumulador, item) => acumulador + item.duracao, 0);
    const statusGrid: string[][] = Array(NUM_LINHAS).fill(null).map(() => []);
    let processoTerminou = 0;
    let numColunas = 0;

    let fila: Processo[] = [...sortedTabela];
    let processoAtual: Processo | undefined = undefined;

    while (TOTAL_QUANTUM > 0) {
        if (!processoAtual || processoAtual.duracao <= 0) {
            processoAtual = fila.find(p => p.chegada <= processoTerminou);
            if (processoAtual) {
                fila = fila.filter(p => p !== processoAtual);
            }
        }

        if (processoAtual === undefined) {
            processoTerminou++;
            continue;
        }

        const startRow = processoAtual.originalIndex;
        const startCol = Math.max(processoAtual.chegada, processoTerminou);
        const tempoExecucao = Math.min(processoAtual.duracao, quantum);
        processoAtual.duracao -= tempoExecucao;
        TOTAL_QUANTUM -= tempoExecucao;
        processoTerminou += tempoExecucao;

        for (let col = startCol; col < startCol + tempoExecucao; col++) {
            if (!statusGrid[startRow]) {
                statusGrid[startRow] = [];
            }
            statusGrid[startRow][col] = 'green';
        }

        if (processoAtual.duracao > 0) {
            for (let col = processoTerminou; col < processoTerminou + sobrecarga; col++) {
                if (!statusGrid[startRow]) {
                    statusGrid[startRow] = [];
                }
                statusGrid[startRow][col] = 'red';
            }
            processoTerminou += sobrecarga;
        }

        for (let col = processoAtual.chegada; col < startCol; col++) {
            if (!statusGrid[startRow]) {
                statusGrid[startRow] = [];
            }
            if (statusGrid[startRow][col] === undefined) {
                statusGrid[startRow][col] = 'yellow';
            }
        }

        const proximoProcesso = fila.find(p => p.chegada <= processoTerminou);
        if (processoAtual.duracao > 0 && proximoProcesso) {
            fila.push(processoAtual);
            processoAtual = undefined;
        }

        numColunas = Math.max(numColunas, processoTerminou);
    }

    const createGridItems = () => {
        const items = [];
        for (let row = 0; row < NUM_LINHAS; row++) {
            for (let col = 0; col < numColunas; col++) {
                const status = statusGrid[row][col];
                items.push(
                    <div
                        key={`${row}-${col}`}
                        className={`flex items-center justify-center border border-black w-8 h-8 rounded-md ${status === 'green' ? 'bg-green-500' : (status === 'yellow' ? 'bg-yellow-500' : (status === 'red' ? 'bg-red-500' : 'bg-white'))}`}
                    >
                    </div>
                );
            }
        }
        return items;
    };

    const calculateTurnaroundTime = () => {
        let totalTurnaroundTime = 0;
        sortedTabela.forEach(processo => {
            const tempoFinal = statusGrid[processo.originalIndex].length;
            const tempoChegada = processo.chegada;
            totalTurnaroundTime += (tempoFinal - tempoChegada);
        });
        return totalTurnaroundTime / linhas;
    };

    const turnaroundTime = calculateTurnaroundTime();

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-3xl">
            <div className="mb-4">
                <h3 className="text-lg font-bold">Tabela de Processos Ordenada:</h3>
                <ul>
                    {sortedTabela.map(processo => (
                        <li key={processo.codigo} className="mb-2">
                            <span>{`Código: ${processo.codigo}`}</span>
                            <span>{` Chegada: ${processo.chegada}`}</span>
                            <span>{` Duração: ${processo.duracao}`}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${numColunas}, 1fr)`,
                    gridTemplateRows: `repeat(${NUM_LINHAS}, 1fr)`,
                }}
            >
                {createGridItems()}
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-bold">Turnaround:</h4>
                <p>{turnaroundTime}</p>
            </div>
        </div>
    );
};

export default RR;

import React from 'react';

type Processo = {
    chegada: number;
    duracao: number;
    deadline?: number;
    codigo: number;
}

type Props = {
    linhas: number;
    tabela: Processo[];
};

const SJF = ({ linhas, tabela }: Props) => {
    const NUM_LINHAS = linhas; 

    const originalIndex = tabela.map((processo, index) => ({ ...processo, originalIndex: index }));

    const sortedTabela = originalIndex.slice().sort((a, b) => {
        if (a.chegada === b.chegada) {
            if (a.duracao === b.duracao) {
                return a.codigo - b.codigo;
            }
            return a.duracao - b.duracao;
        }
        return a.chegada - b.chegada;
    });

    // Função para criar a grid com base na ordem de chegada e duração dos processos
    const createGridItems = () => {
        const items = [];
        const statusGrid: string[][] = Array(NUM_LINHAS).fill(null).map(() => []);
        let processoTerminou = 0;
        let numColunas = 0;

        sortedTabela.forEach((processo) => {
            const startRow = processo.originalIndex; // Usa o índice original
            const startCol = Math.max(processo.chegada, processoTerminou);

            // Expande a grid se necessário
            if (startCol + processo.duracao > numColunas) {
                numColunas = startCol + processo.duracao;
                for (let i = 0; i < NUM_LINHAS; i++) {
                    while (statusGrid[i].length < numColunas) {
                        statusGrid[i].push('white');
                    }
                }
            }

            // Marcar as células do processo que está em execução
            for (let col = startCol; col < startCol + processo.duracao; col++) {
                statusGrid[startRow][col] = 'green'; 
            }

            for (let col = processo.chegada; col < startCol; col++) {
                if (statusGrid[startRow][col] === 'white') {
                    statusGrid[startRow][col] = 'yellow'; 
                }
            }

            processoTerminou = startCol + processo.duracao;
        });

        // Remover colunas brancas no final da grid
        let lastNonWhiteCol = numColunas - 1;
        for (; lastNonWhiteCol >= 0; lastNonWhiteCol--) {
            let allWhite = true;
            for (let row = 0; row < NUM_LINHAS; row++) {
                if (statusGrid[row][lastNonWhiteCol] !== 'white') {
                    allWhite = false;
                    break;
                }
            }
            if (!allWhite) break;
        }
        numColunas = lastNonWhiteCol + 1;

        for (let row = 0; row < NUM_LINHAS; row++) {
            for (let col = 0; col < numColunas; col++) {
                const status = statusGrid[row][col];
                items.push(
                    <div
                        key={`${row}-${col}`}
                        className={`flex items-center justify-center border border-black w-8 h-8 rounded-md ${status === 'green' ? 'bg-green-500' : (status === 'yellow' ? 'bg-yellow-500' : 'bg-white')}`}
                    >
                    </div>
                );
            }
        }

        return { items, numColunas, statusGrid };
    };

    const { items, numColunas, statusGrid } = createGridItems();

    const calculateTurnaroundTime = () => {
        let nonWhiteCells = 0;

        for (let row = 0; row < NUM_LINHAS; row++) {
            for (let col = 0; col < numColunas; col++) {
                if (statusGrid[row][col] !== 'white') {
                    nonWhiteCells++;
                }
            }
        }

        return nonWhiteCells/linhas;
    };

    const turnaroundTime = calculateTurnaroundTime();

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4">
            <div className="mb-4">
                <h3 className="text-lg font-bold">Tabela de Processos Ordenada:</h3>
                <ul>
                    {sortedTabela.map(processo => (
                        <li key={processo.codigo} className="mb-2">
                            <span>{`Código: ${processo.codigo}`}</span>
                            <span>{` Chegada: ${processo.chegada}`}</span>
                            <span>{` Duração: ${processo.duracao}`}</span>
                            <span>{` Deadline: ${processo.deadline ?? 'Não definido'}`}</span>
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
                {items}
            </div>

            <div className="mt-4">
                <h4 className="text-lg font-bold">Turnaround:</h4>
                <p>{turnaroundTime}</p>
            </div>
        </div>
    );
};

export default SJF;

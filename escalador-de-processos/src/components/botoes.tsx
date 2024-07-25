'use client'
import React, { useState } from 'react';

const Botoes = () => {
    const [selecionarEscalonamento, setSelecionarEscalonamento] = useState<string | null>(null);

    const handleEscalonamentoChange = (e: any) => {
        const escalonamento = e.target.value;
        const novoEscalonamento = escalonamento === selecionarEscalonamento ? null : escalonamento;
        console.log(novoEscalonamento)
        setSelecionarEscalonamento(novoEscalonamento);
    }

    return (
        <div className='text-black flex flex-col gap-3 bg-yellow-200 min-w-[150px] px-4'>
            <div className='flex space-x-5 items-center justify-around'>
                <label className='flex items-center space-x-2 rounded-full'>
                    <input
                        value='SFJ'
                        onChange={handleEscalonamentoChange}
                        type='checkbox'
                        className='w-6 h-6 border rounded-[120px] border-gray-500'
                        checked={selecionarEscalonamento === 'SFJ'}
                    />
                    <span className='text-sm'>SJF</span>
                </label>
                <label className='flex items-center space-x-2 rounded-full'>
                    <input
                        value='FIFO'
                        onChange={handleEscalonamentoChange}
                        type='checkbox'
                        className='w-6 h-6 border rounded-[120px] border-gray-500'
                        checked={selecionarEscalonamento === 'FIFO'}
                    />
                    <span className='text-sm'>FIFO</span>
                </label>
            </div>
            <div className='flex space-x-5 items-center'>
                <label className='flex items-center space-x-2 rounded-full'>
                    <input
                        value='EDF'
                        onChange={handleEscalonamentoChange}
                        type='checkbox'
                        className='w-6 h-6 border rounded-[120px] border-gray-500'
                        checked={selecionarEscalonamento === 'EDF'}
                    />
                    <span className='text-sm'>EDF</span>
                </label>
                <label className='flex items-center space-x-2 rounded-full'>
                    <input
                        value='RR'
                        onChange={handleEscalonamentoChange}
                        type='checkbox'
                        className='w-6 h-6 border rounded-[120px] border-gray-500'
                        checked={selecionarEscalonamento === 'RR'}
                    />
                    <span className='text-sm'>RR</span>
                </label>
            </div>
        </div>
    );
};

export default Botoes;

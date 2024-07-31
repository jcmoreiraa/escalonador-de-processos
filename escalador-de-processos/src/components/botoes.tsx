'use client'
import React, { useState } from 'react';

type BotoesProps = {
  selecionarEscalonamento: string | null;
  setSelecionarEscalonamento: (value: string | null) => void;
};

const Botoes: React.FC<BotoesProps> = ({ selecionarEscalonamento, setSelecionarEscalonamento }) => {
  const handleEscalonamentoChange = (e: any) => {
    const escalonamento = e.target.value;
    const novoEscalonamento = escalonamento === selecionarEscalonamento ? null : escalonamento;
    console.log(novoEscalonamento)
    setSelecionarEscalonamento(novoEscalonamento);
  }

  return (
    <div className='text-black justify-center flex flex-col gap-3 min-w-[150px] h-min'>
      <div className='flex space-x-5 items-center justify-around'>
        <label className='flex items-center space-x-2 rounded-full'>
          <input
            value='SJF'
            onChange={handleEscalonamentoChange}
            type='checkbox'
            className='w-6 h-6 border rounded-[120px] border-gray-500'
            checked={selecionarEscalonamento === 'SJF'}
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

import React, { useState } from 'react';

type Props = {
    valorQuantum: (quantum: string) => void;
    valorSobrecarga: (sobrecarga: string) => void;
}

const Quantum = ({ valorQuantum, valorSobrecarga }: Props) => {
    const [quantum, setQuantum] = useState('');
    const [sobrecarga, setSobrecarga] = useState('');

    const handleQuantumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuantum(newValue);
        valorQuantum(newValue); 
    }

    const handleSobrecargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSobrecarga(newValue);
        valorSobrecarga(newValue); 
    }

    return (
        <div className='flex flex-col gap-5 font-bold text-black'>
            <label>
                Quantum:
                <input
                    type='number'
                    min={1}
                    max={99}
                    value={quantum}
                    onChange={handleQuantumChange}
                    className='ml-2 max-w-[40px] pl-1 bg-gray-300 rounded-sm'
                />
            </label>
            <label>
                Sobrecarga:
                <input
                    type='number'
                    min={1}
                    max={99}
                    value={sobrecarga}
                    onChange={handleSobrecargaChange}
                    className='ml-2 max-w-[40px] pl-1 bg-gray-300 rounded-sm'
                />
            </label>
        </div>
    );
}

export default Quantum;

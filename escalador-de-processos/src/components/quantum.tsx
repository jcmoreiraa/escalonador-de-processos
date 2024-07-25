import React, { useState } from 'react';

const Quantum = () => {
    const [quantum, setQuantum] = useState('');
    const [sobrecarga, setSobrecarga] = useState('');

    const handleQuantumChange = (e:any) => {
        setQuantum(e.target.value);
    }

    const handleSobrecargaChange = (e:any) => {
        setSobrecarga(e.target.value);
    }

    return (
        <div className='flex flex-col gap-5 font-bold'>
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
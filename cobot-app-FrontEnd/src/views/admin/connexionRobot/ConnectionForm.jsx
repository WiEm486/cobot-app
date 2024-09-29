import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';

const ConnectionForm = ({ onConnectionSuccess }) => {
    const [ip_address, setIpAddress] = useState('');
    const [port, setPort] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/robot/add', { name, ip_address, port });
            console.log('Created', response.data);
            // Call the success handler
        } catch (error) {
            console.error('Error of Creation', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 w-full">
            <form className="space-y-6 w-full max-w-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Ajouter un Nouveau Robot</h2>
                <div className="flex justify-center mb-4">
                    <FaRobot size={50} className="text-gray-800" />
                </div>
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        className="border border-gray-300 p-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Entrer le Modèle de Robot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-gray-300 p-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Entrer l'adresse IP"
                        value={ip_address}
                        onChange={(e) => setIpAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-gray-300 p-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Entrer le port"
                        value={port}
                        onChange={(e) => setPort(Number(e.target.value))}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 p-3 rounded-full bg-[#02a89a] text-white text-lg font-medium transition duration-200 hover:bg-[#029984] active:bg-[#027b6d] flex items-center justify-center"
                >
                    Ajouter un Robot
                </button>
                <p className="text-center mt-4">
                    <span className="cursor-pointer text-[#02a89a] text-lg flex items-center justify-center" onClick={onConnectionSuccess}>
                        Connecter à un Robot Déjà Existant
                    </span>
                </p>
            </form>
        </div>
    );
};

export default ConnectionForm;

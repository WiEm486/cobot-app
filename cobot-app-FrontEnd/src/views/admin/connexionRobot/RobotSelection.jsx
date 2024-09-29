import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaPlusCircle } from 'react-icons/fa';

const RobotSelection = ({ onConnectionSuccess }) => {
    const [selectedRobot, setSelectedRobot] = useState(null);
    const [robotData, setRobotData] = useState(null);
    const [robotList, setRobotList] = useState([]);
    const [connectedRobots, setConnectedRobots] = useState({});

    useEffect(() => {
        fetchRobotList();
    }, []);

    const fetchRobotList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/robot/all'); // Adjust endpoint based on your NestJS route
            console.log('Robot list:', response.data);
            setRobotList(response.data); // Assuming response.data is an array of robot names
        } catch (error) {
            console.error('Error fetching robot list:', error);
        }
    };

    const handleRobotSelect = (robot) => {
        console.log('Selected robot:', robot);
        setSelectedRobot(robot);
    };

    const handleConnect = async () => {
        if (selectedRobot) {
            try {
                const response = await axios.post('http://localhost:3000/ursim/connect', { robotName: selectedRobot });
                console.log('Robot data:', response.data);
                setRobotData(response.data);
                setConnectedRobots(prevState => ({
                    ...prevState,
                    [selectedRobot]: true
                }));
            } catch (error) {
                console.error('Error connecting to robot:', error);
                setConnectedRobots(prevState => ({
                    ...prevState,
                    [selectedRobot]: false
                }));
            }
        } else {
            console.error('No robot selected');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 w-full max-w-3xl mx-auto">
            <div className="space-y-8 w-full px-4">
                <h2 className="text-center mb-6 text-3xl font-semibold text-gray-800">Sélectionnez un Robot</h2>

                <div className="flex justify-center space-x-4 mb-6">
                    {robotList.map((robot, index) => (
                        <div key={index} className="text-center">
                            <div
                                className={`w-10 h-10 rounded-full mb-2 shadow-lg flex items-center justify-center ${connectedRobots[robot.name] ? 'connected' : 'disconnected'}`}
                                title={robot.name}
                            >
                                <FaRobot className="text-white" />
                            </div>
                            <div className="text-lg font-medium text-gray-700">{robot.name}</div>
                        </div>
                    ))}
                </div>

                <select
                    className="w-full border p-4 rounded-md cursor-pointer text-lg border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#02a89a]"
                    onChange={(e) => handleRobotSelect(e.target.value)}
                    value={selectedRobot}
                >
                    <option value="">Sélectionnez un robot</option>
                    {robotList.map((robot, index) => (
                        <option key={index} value={robot.name}>{robot.name}</option>
                    ))}
                </select>
                <button
                    className="w-full mt-6 p-4 rounded-xl bg-[#02a89a] text-xl font-medium text-white transition duration-200 hover:bg-[#029984] active:bg-[#027b6d] flex items-center justify-center"
                    onClick={handleConnect}
                >
                    <FaRobot className="mr-2" /> Connecter
                </button>
                <p className="text-center mt-6">
                    <span className="cursor-pointer text-[#02a89a] text-lg flex items-center justify-center" onClick={onConnectionSuccess}>
                        <FaPlusCircle className="mr-2" /> Ajouter un nouveau Robot
                    </span>
                </p>
                {robotData && (
                    <div className="mt-6">
                        <h3 className="text-xl text-center text-green-600">Connectée avec Succès</h3>
                    </div>
                )}
            </div>
            <style jsx>{`
                .connected {
                    animation: pulse-green 2s infinite;
                    background-color: #34D399; /* Green */
                }

                .disconnected {
                    animation: pulse-red 2s infinite;
                    background-color: #EF4444; /* Red */
                }

                @keyframes pulse-green {
                    0%, 100% {
                        box-shadow: 0 0 5px #34D399;
                    }
                    50% {
                        box-shadow: 0 0 15px #34D399;
                    }
                }

                @keyframes pulse-red {
                    0%, 100% {
                        box-shadow: 0 0 5px #EF4444;
                    }
                    50% {
                        box-shadow: 0 0 15px #EF4444;
                    }
                }
            `}</style>
        </div>
    );
};

export default RobotSelection;

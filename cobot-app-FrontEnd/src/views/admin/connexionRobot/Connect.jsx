import React, { useState } from 'react';
import Card from 'components/card';
import ConnectionForm from './ConnectionForm'; // Import the ConnectionForm component
import RobotSelection from './RobotSelection'; // Import the RobotSelection component

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectionSuccess = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="p-20  flex items-center justify-center ">
      <div className="container flex items-center justify-center">
        <Card extra={"overflow-auto  p-20 bg-white rounded-lg shadow-lg relative mb-20"}>
          {isConnected ? (
            <RobotSelection onConnectionSuccess={handleConnectionSuccess} />
          ) : (
            <ConnectionForm onConnectionSuccess={handleConnectionSuccess} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Connect;

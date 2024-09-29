import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RobotStatus = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/ursim/status')
            .then(response => {
                setStatus(response.data);
            })
            .catch(error => {
                console.error('Error fetching robot status:', error);
            });
    }, []);

    return (
        <div>
            <h2>État du robot</h2>
            {status ? <pre>{JSON.stringify(status, null, 2)}</pre> : <p>Chargement...</p>}
        </div>
    );
};

export default RobotStatus;

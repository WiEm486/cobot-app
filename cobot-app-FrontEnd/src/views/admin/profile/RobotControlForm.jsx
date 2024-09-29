import React, { useState } from 'react';
import axios from 'axios';

const RobotControlForm = () => {
  const [formData, setFormData] = useState({
    speed: '',
    acceleration: '',
    targetX: '',
    targetY: '',
    targetZ: '',
    targetRX: '',
    targetRY: '',
    targetRZ: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/ursim/send-params', formData);
      setStatus('Command sent successfully!');
    } catch (error) {
      console.error('Error sending command:', error);
      setStatus('Failed to send command');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Speed:</label>
          <input type="number" name="speed" value={formData.speed} onChange={handleChange} />
        </div>
        <div>
          <label>Acceleration:</label>
          <input type="number" name="acceleration" value={formData.acceleration} onChange={handleChange} />
        </div>
        <div>
          <label>Target X:</label>
          <input type="number" name="targetX" value={formData.targetX} onChange={handleChange} />
        </div>
        <div>
          <label>Target Y:</label>
          <input type="number" name="targetY" value={formData.targetY} onChange={handleChange} />
        </div>
        <div>
          <label>Target Z:</label>
          <input type="number" name="targetZ" value={formData.targetZ} onChange={handleChange} />
        </div>
        <div>
          <label>Target RX:</label>
          <input type="number" name="targetRX" value={formData.targetRX} onChange={handleChange} />
        </div>
        <div>
          <label>Target RY:</label>
          <input type="number" name="targetRY" value={formData.targetRY} onChange={handleChange} />
        </div>
        <div>
          <label>Target RZ:</label>
          <input type="number" name="targetRZ" value={formData.targetRZ} onChange={handleChange} />
        </div>
        <button type="submit">Send Command</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default RobotControlForm;

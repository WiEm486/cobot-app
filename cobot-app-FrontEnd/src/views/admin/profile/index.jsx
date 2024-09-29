import React, { useState } from 'react';
import axios from 'axios';
import Card from "components/card";
import robotImg from "../../../assets/img/layout/200w.gif";
import RobotControlForm from './RobotControlForm';

const ProfileOverview = () => {
  const [joints, setJoints] = useState({
    j1: '',
    j2: '',
    j3: '',
    j4: '',
    j5: '',
    j6: ''
  });
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoints(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setJoints({
        j1: '',
        j2: '',
        j3: '',
        j4: '',
        j5: '',
        j6: ''
      });
    }
  };

  const handleIncrement = (joint) => {
    setJoints(prevState => ({
      ...prevState,
      [joint]: (parseFloat(prevState[joint]) || 0) + 0.1,
    }));
  };

  const handleDecrement = (joint) => {
    setJoints(prevState => ({
      ...prevState,
      [joint]: (parseFloat(prevState[joint]) || 0) - 0.1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      const jointValues = [
        parseFloat(joints.j1),
        parseFloat(joints.j2),
        parseFloat(joints.j3),
        parseFloat(joints.j4),
        parseFloat(joints.j5),
        parseFloat(joints.j6)
      ];

      try {
        const response = await axios.post('http://localhost:3000/ursim/send-command', {
          joints: jointValues,
        });
        setStatus('Command sent successfully!');
      } catch (error) {
        console.error('Error sending command:', error);
        setStatus('Failed to send command');
      }
    }

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:3000/ursim/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("success")
        setStatus('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setStatus('Failed to upload file');
      }
    }
  };

  return (
    <div className="p-20 h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center w-full h-full">
        <Card extra={"flex flex-col lg:flex-row items-center justify-between overflow-auto h-auto p-10 bg-white rounded-lg shadow-lg relative mb-20 w-full"}>
          <div className="w-full lg:w-2/3">
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">Configuration par valeurs des joints</h2>
              {['j1', 'j2', 'j3', 'j4', 'j5', 'j6'].map((joint, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="border bg-gray-300 p-2 rounded-full"
                    onClick={() => handleDecrement(joint)}
                    disabled={!!file}
                  >
                    ←
                  </button>
                  <input
                    type="text"
                    name={joint}
                    className="border bg-lightPrimary p-2 rounded-full w-2/3"
                    placeholder={`Entrer la valeur de ${joint.toUpperCase()}`}
                    value={joints[joint]}
                    onChange={handleChange}
                    disabled={!!file}
                  />
                  <button
                    type="button"
                    className="border bg-gray-300 p-2 rounded-full"
                    onClick={() => handleIncrement(joint)}
                    disabled={!!file}
                  >
                    →
                  </button>
                </div>
              ))}

              <h2 className="text-xl font-bold mt-8 mb-4">Configuration par importation de fichier .urp</h2>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-green-800
                  hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
              <button
                type="submit"
                className="linear mt-8 w-1/4 rounded-xl bg-customGreen py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Valider
              </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
          </div>

          <div className="w-full lg:w-1/3 flex items-center justify-center mt-10 lg:mt-0">
            <img
              src={robotImg}
              alt="Robot"
              className="w-full h-auto max-w-sm"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverview;

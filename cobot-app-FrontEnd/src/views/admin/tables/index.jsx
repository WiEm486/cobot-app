import React, { useEffect, useState } from 'react';
import KPICard from './components/KPICard';
import { FaClock, FaBolt, FaCogs, FaHourglassHalf } from 'react-icons/fa';

const Tables = () => {
  const [kpiData, setKpiData] = useState({
    total_pieces: 0,
    total_time: 0,
    piece_time: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/kpi');  // Assurez-vous que l'URL et le port sont corrects
      const data = await response.json();
      if (data.length > 0) {
        const latestData = data[data.length - 1];  // Récupérer les dernières données
        setKpiData({
          total_pieces: latestData.total_pieces,
          total_time: latestData.total_time,
          piece_time: latestData.piece_time,
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);  // Requêtes toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes} min ${seconds} s`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <KPICard
          title='Temps d Exécution Total'
          value={kpiData.total_time}
          icon={<FaClock className="text-blue-500 text-5xl" />}
        />
        <KPICard
          title='Consommation d Énergie'
          value='150 kWh'  // Vous pouvez mettre à jour cette valeur selon les données disponibles
          icon={<FaBolt className="text-yellow-500 text-5xl" />}
        />
        <KPICard
          title='Nombre de Pièces'
          value={`${kpiData.total_pieces} pièces`}
          icon={<FaCogs className="text-green-500 text-5xl" />}
        />
        <KPICard
          title='Temps par Pièce'
          value={kpiData.piece_time}
          icon={<FaHourglassHalf className="text-red-500 text-5xl" />}
        />
      </div>
    </div>
  );
};

export default Tables;

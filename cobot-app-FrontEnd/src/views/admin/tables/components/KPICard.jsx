// KPICard.jsx
import React from 'react';

const KPICard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-12 shadow-lg rounded-lg flex flex-col items-center space-y-5">
      <div className="text-5xl">{icon}</div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-xl">{value}</p>
    </div>
  );
};

export default KPICard;

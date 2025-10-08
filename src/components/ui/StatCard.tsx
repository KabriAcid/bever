import React from "react";

const StatCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100">
      <div className="text-sm text-primary-600">{title}</div>
      <div className="text-2xl font-bold text-primary-950">{value}</div>
    </div>
  );
};

export default StatCard;

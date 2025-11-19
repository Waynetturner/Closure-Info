import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
        <span className="text-sm font-medium text-stone-500">{percentage}%</span>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-teal-600 h-2.5 rounded-full progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
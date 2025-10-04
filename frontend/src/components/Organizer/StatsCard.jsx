import React from 'react';

export default function StatsCard({ title, value, icon, color, change }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-text">{value}</div>
          <div className="text-sm text-muted">{title}</div>
        </div>
      </div>
      
      {change && (
        <div className="text-sm text-primary font-semibold">
          {change}
        </div>
      )}
    </div>
  );
}

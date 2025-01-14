import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EngagementSection = () => {
  const [engagementData, setEngagementData] = useState({
    labels: ['India'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [100], // Placeholder data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  });

  return (
    <section className="w-full md:w-1/2 p-4 flex justify-between">
      <h2 className="text-lg font-semibold mb-4">Engagement Traffic Sources</h2>
      <div className="w-full h-80">
        <Pie
          data={engagementData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>
    </section>
  );
};

export default EngagementSection;

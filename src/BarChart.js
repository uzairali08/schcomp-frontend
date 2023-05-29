import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend );

function BarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/totalCountByYear");
      const data = await response.json();

      const years = Object.keys(data);
      const scholarsData = years.map((year) => data[year].scholarCount);
      const coursesData = years.map((year) => data[year].subjectCount);
      const learnersData = years.map((year) => data[year].learnerCount);

      const chartData = {
        labels: years,
        datasets: [
          {
            label: "Total Scholars",
            data: scholarsData,
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1.5,
          },
          {
            label: "Total Courses",
            data: coursesData,
            backgroundColor: "rgba(153, 102, 255, 0.3)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1.5,
          },
          {
            label: "Total Learners",
            data: learnersData,
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1.5,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
    <div>
      {chartData ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default BarChart;

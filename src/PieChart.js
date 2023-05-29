import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/totalCount");
      const data = await response.json();

      const { scholarCount, learnerCount, subjectCount } = data;

      const chartData = {
        labels: ["Scholars", "Courses", "Learners"],
        datasets: [
          {
            label: "Total Numbers",
            data: [scholarCount, subjectCount, learnerCount],
            backgroundColor: [
              "rgba(54, 162, 235, 0.3)",
              "rgba(255, 99, 132, 0.3)",
              "rgba(153, 102, 255, 0.3)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(153, 102, 255, 1)",
            ],
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
    <div style={{ height: "400px" }}>
      {chartData ? <Pie data={chartData} /> : <p>Loading...</p>}
    </div>
  );
}

export default PieChart;

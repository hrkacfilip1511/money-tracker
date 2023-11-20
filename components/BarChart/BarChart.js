import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import useStore from "../../store/useStore";
const BarChart = ({ chartData }) => {
  const isMobile = useStore((state) => state.isMobile);
  return (
    <Bar
      width={isMobile ? 320 : 500}
      height={isMobile ? 170 : 300}
      data={chartData}
    />
  );
};

export default BarChart;

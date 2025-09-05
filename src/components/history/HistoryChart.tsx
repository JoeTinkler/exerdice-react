import { HistoryDataContext } from "@providers/history";
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";

const ChartCanvas = styled(Line)`
  width: 100%;
  min-height: 200px;
  height: 30vh;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  padding: 5px;
`;

type ChartColours = {
  background: React.CSSProperties['background'];
  axis: React.CSSProperties['color'];
  data: React.CSSProperties['color'][];
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const HistoryChart: React.FC = () => {
  const { chartData } = useContext(HistoryDataContext);
  const theme = useTheme();

  const colours: ChartColours = {
    background: theme.background,
    axis: theme.colour,
    data: [
      '#ff6a52',
      '#2ec4d4',
      theme.highlightColour
    ]
  };

  const labels = chartData.map((d, i) => d.date.substring(5).replace('-', '/'));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'chartArea',
        labels: {
          usePointStyle: true,
          boxWidth: 5,
          boxHeight: 5
        }
      },
    },
    background: colours.background,
    elements: {
      line: {
        tension: 0.4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        }
      },
      x: {
        grid: {
          tickLength: 4,
          tickColor: colours.axis,
          drawOnChartArea: false,
        },
        border: {
          display: true,
          color: colours.axis,
        },
        ticks: {
          maxTicksLimit: 6
        },
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Minutes',
        data: chartData.map((d) => d.totalMinutes),
        backgroundColor: colours.data[1],
        borderColor: colours.data[1],
      },
      {
        label: 'Total Roll',
        data: chartData.map((d) => d.totalRoll),
        backgroundColor: colours.data[0],
        borderColor: colours.data[0],
      }
    ],
  };

  return (
    <>
      <ChartCanvas options={options as any} data={data} />
    </>
  )
}
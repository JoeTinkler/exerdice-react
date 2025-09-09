import { HistoryDataContext } from "@providers/history";
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip, BarElement } from "chart.js";
import { CSSProperties, useContext, useEffect } from "react";
import { Line, Bar,  } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";

const LineChart = styled(Line)`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  padding: 5px;
`;

const BarChart = styled(Bar)`
  width: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  padding: 5px;
`;

const Legend = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LegendItem = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.secondaryColour}
`;

const LegendDot = styled.div<{ $colour: CSSProperties['background'] }>`
  background-color: ${({ $colour }) => $colour};
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 2px;
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
  BarElement,
  Title,
  Tooltip
)

export const HistoryChart: React.FC = () => {
  const { chartData, chartOptions } = useContext(HistoryDataContext);
  const theme = useTheme();

  const colours: ChartColours = {
    background: theme.background,
    axis: theme.colour,
    data: [
      '#FB2C36',
      '#3BB8DB',
      '#31C950',
      '#AD46FF'
    ]
  };

  const labels = chartData.map((d, i) => d.date.substring(5).replace('-', '/'));

  const options = {
    responsive: true,
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
          tickLength: 0
        },
        border: {
          width: 0,
        },
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

  const datasets = [];
  if (chartOptions.columns.minutes) {
    datasets.push({
      label: 'Total Minutes',
      data: chartData.map((d) => d.totalMinutes),
      backgroundColor: colours.data[1],
      borderColor: colours.data[1],
    });
  }

  if (chartOptions.columns.rolls) {
    datasets.push({
      label: 'Total Roll',
      data: chartData.map((d) => d.totalRoll),
      backgroundColor: colours.data[0],
      borderColor: colours.data[0],
    });
  }

  if (chartOptions.columns.distance) {
    datasets.push({
      label: 'Total Distance',
      data: chartData.map((d) => d.totalDistance),
      backgroundColor: colours.data[2],
      borderColor: colours.data[2],
    });
  }

  if (chartOptions.columns.calories) {
    datasets.push({
      label: 'Total Calories',
      data: chartData.map((d) => d.totalCalories),
      backgroundColor: colours.data[3],
      borderColor: colours.data[3],
    });
  }

  return (
    <>
      {chartOptions.type === 'line' && <LineChart options={options as any} data={{ labels, datasets }} />}
      {chartOptions.type === 'bar' && <BarChart options={options as any} data={{ labels, datasets }} />}
      <Legend>
        {datasets.map((d) => (
          <LegendItem key={d.label}><LegendDot $colour={d.backgroundColor}></LegendDot>{d.label}</LegendItem>
        ))}
      </Legend>
    </>
  )
}
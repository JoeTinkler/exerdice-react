import { SummaryMetricsContainer } from "@components/ui/routes/History";
import { HistoryDataContext } from "@providers/history"
import { useContext } from "react"

export const AdvancedMetrics: React.FC = () => {
  const { averageStats } = useContext(HistoryDataContext);

  return (
    <SummaryMetricsContainer>
      <div>
        <span>{Math.round(averageStats.averageRoll)}</span>
        Average Daily Roll
      </div>
      <div>
        <span>{Math.round(averageStats.averageOvertime)}</span>
        Average Daily Overtime
      </div>
      <div>
        <span>{Math.round(averageStats.averageMinutes)}</span>
        Average Daily Minutes
      </div>
    </SummaryMetricsContainer>
  )
}